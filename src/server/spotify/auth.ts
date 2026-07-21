
const SPOTIFY_ACCOUNTS_BASE = 'https://accounts.spotify.com'
const TOKEN_BUFFER_MS = 5 * 60 * 1000

interface CachedToken {
	accessToken: string
	expiresAt: number
}

let tokenCache: CachedToken | null = null

export async function getSpotifyAccessToken(): Promise<string | null> {
	if (tokenCache && Date.now() < tokenCache.expiresAt) {
		return tokenCache.accessToken
	}

	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
	const clientId = process.env.SPOTIFY_CLIENT_ID
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

	if (
		!refreshToken ||
		refreshToken === 'your_refresh_token_here' ||
		refreshToken.startsWith('#')
	) {
		return null
	}

	if (!clientId || !clientSecret) {
		console.error('[Spotify Auth] Missing client credentials')
		return null
	}

	try {
		const authString = `${clientId}:${clientSecret}`
		const base64Auth = Buffer.from(authString).toString('base64')

		const response = await fetch(`${SPOTIFY_ACCOUNTS_BASE}/api/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${base64Auth}`
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		})

		if (!response.ok) {
			console.error(
				`[Spotify Auth] Token refresh failed: ${response.status}`
			)
			return null
		}

		const data = await response.json()

		if (data.error) {
			console.error('[Spotify Auth] Token error:', data.error)
			return null
		}

		const expiresInMs = (data.expires_in || 3600) * 1000
		tokenCache = {
			accessToken: data.access_token,
			expiresAt: Date.now() + expiresInMs - TOKEN_BUFFER_MS
		}

		return tokenCache.accessToken
	} catch (error) {
		console.error('[Spotify Auth] Failed to refresh token:', error)
		return null
	}
}

export function invalidateSpotifyTokenCache(): void {
	tokenCache = null
}

export function hasSpotifyCredentials(): boolean {
	const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
	return !!(
		refreshToken &&
		refreshToken !== 'your_refresh_token_here' &&
		!refreshToken.startsWith('#') &&
		process.env.SPOTIFY_CLIENT_ID &&
		process.env.SPOTIFY_CLIENT_SECRET
	)
}
