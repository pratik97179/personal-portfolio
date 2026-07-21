import { profile } from './profile'

export const siteName = profile.name

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
export const siteUrl = (configuredSiteUrl || 'http://localhost:3000').replace(
	/\/+$/,
	''
)

export const baseUrl = siteUrl

export const githubUsername =
	process.env.ALLOWED_GITHUB_USERNAME?.trim() || profile.github.username
