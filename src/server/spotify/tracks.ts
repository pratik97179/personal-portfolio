import { unstable_cache } from 'next/cache'
import { desc } from 'drizzle-orm'
import { db, schema } from '@/server/db/connection'
import {
	getSpotifyAccessToken,
	hasSpotifyCredentials
} from '@/server/spotify/auth'
import type { SpotifyTrack } from './types'

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const STORED_TRACKS_BUDGET_MS = 150

async function withTimeout<T>(
	promise: Promise<T>,
	ms: number,
	fallback: T
): Promise<T> {
	let timer: ReturnType<typeof setTimeout> | undefined
	try {
		return await Promise.race([
			promise,
			new Promise<T>(resolve => {
				timer = setTimeout(() => resolve(fallback), ms)
			})
		])
	} finally {
		if (timer) clearTimeout(timer)
	}
}

export const getStoredSpotifyTracks = unstable_cache(
	async (limit: number): Promise<SpotifyTrack[]> => {
		try {
			const storedTracks = await db.query.spotifyListens.findMany({
				orderBy: desc(schema.spotifyListens.playedAt),
				limit
			})

			return storedTracks.map(track => ({
				id: track.trackId,
				name: track.trackName,
				artist: track.artistName,
				album: track.albumName || '',
				url: track.trackUrl,
				image: track.albumImage || '',
				played_at: track.playedAt.toISOString()
			}))
		} catch (error) {
			console.error('Error fetching stored Spotify tracks:', error)
			return []
		}
	},
	['spotify-stored-recent'],
	{ revalidate: 300, tags: ['spotify'] }
)

async function getStoredSpotifyTracksNonBlocking(
	limit: number
): Promise<SpotifyTrack[]> {
	return withTimeout(
		getStoredSpotifyTracks(limit),
		STORED_TRACKS_BUDGET_MS,
		[]
	)
}

export const getSpotifyTracks = unstable_cache(
	async (limit: number): Promise<SpotifyTrack[]> => {
		try {
			if (!hasSpotifyCredentials()) {
				return getStoredSpotifyTracksNonBlocking(limit)
			}

			const accessToken = await getSpotifyAccessToken()
			if (!accessToken) return getStoredSpotifyTracksNonBlocking(limit)

			const response = await fetch(
				`${SPOTIFY_API_BASE}/me/player/recently-played?limit=${limit}`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
					signal: AbortSignal.timeout(1200)
				}
			)

			if (!response.ok) return getStoredSpotifyTracksNonBlocking(limit)

			const data = await response.json()
			const recentTracks: SpotifyTrack[] =
				data.items?.map((item: any) => ({
					id: item.track.id,
					name: item.track.name,
					artist: item.track.artists
						.map((a: any) => a.name)
						.join(', '),
					album: item.track.album.name,
					url: item.track.external_urls.spotify,
					image: item.track.album.images[0]?.url || '',
					played_at: item.played_at
				})) || []

			return recentTracks.length > 0
				? recentTracks
				: getStoredSpotifyTracksNonBlocking(limit)
		} catch (error) {
			console.error('Error fetching Spotify tracks:', error)
			return getStoredSpotifyTracksNonBlocking(limit)
		}
	},
	['spotify-recent'],
	{ revalidate: 30, tags: ['spotify'] }
)
