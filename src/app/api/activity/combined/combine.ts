import {
	getCachedGitHubActivity,
	getCachedGitHubContributions
} from '@/server/github'
import { getSpotifyTracks } from '@/server/spotify'
import { getYTMusicTracks, hasYTMusicCredentials } from '@/server/ytmusic'
import type { CombinedActivityResponse } from './types'

const MUSIC_FETCH_BUDGET_MS = 400

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

async function getMusicTracks(tracksLimit: number) {
	const spotifyTracks = await getSpotifyTracks(tracksLimit)
	if (spotifyTracks.length > 0) return spotifyTracks

	if (!hasYTMusicCredentials()) return []

	return getYTMusicTracks(tracksLimit)
}

export async function getCombinedActivity(
	activityLimit: number,
	tracksLimit: number
): Promise<CombinedActivityResponse> {
	const currentYear = new Date().getFullYear()
	const previousYear = currentYear - 1

	const [
		currentYearContributions,
		previousYearContributions,
		recentActivity,
		tracks
	] = await Promise.all([
		getCachedGitHubContributions(currentYear),
		getCachedGitHubContributions(previousYear),
		getCachedGitHubActivity(activityLimit),
		withTimeout(getMusicTracks(tracksLimit), MUSIC_FETCH_BUDGET_MS, [])
	])

	const contributionsMap: Record<
		string,
		{ date: string; contributionCount: number }
	> = {}

	for (const year of [previousYearContributions, currentYearContributions]) {
		if (!year?.weeks) continue

		for (const week of year.weeks) {
			for (const day of week.contributionDays || []) {
				contributionsMap[day.date] = {
					date: day.date,
					contributionCount: day.contributionCount
				}
			}
		}
	}

	return {
		contributions: Object.values(contributionsMap),
		totalContributions:
			(currentYearContributions?.totalContributions || 0) +
			(previousYearContributions?.totalContributions || 0),
		recentActivity,
		spotifyTracks: tracks,
		fetchedAt: Date.now()
	}
}
