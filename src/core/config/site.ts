import { profile } from './profile'

export const siteName = profile.name

function resolveSiteUrl() {
	const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
	if (configured) {
		return configured
	}

	// Vercel provides these during build/runtime when NEXT_PUBLIC_SITE_URL is unset.
	const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
	if (vercelProductionUrl) {
		return `https://${vercelProductionUrl}`
	}

	const vercelUrl = process.env.VERCEL_URL?.trim()
	if (vercelUrl) {
		return `https://${vercelUrl}`
	}

	return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl().replace(/\/+$/, '')

export const baseUrl = siteUrl

export const githubUsername =
	process.env.ALLOWED_GITHUB_USERNAME?.trim() || profile.github.username
