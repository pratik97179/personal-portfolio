import type { GitHubEventDetail } from './types'

function isGenericPushDescription(description: string) {
	return (
		description === 'Pushed commits' ||
		description === 'Commit' ||
		description.startsWith('Updates on ')
	)
}

function getCommitHeadSha(
	activity: Pick<GitHubEventDetail, 'payload' | 'url'>
): string | null {
	const payload = activity.payload as { head?: string } | null | undefined
	if (typeof payload?.head === 'string' && payload.head) {
		return payload.head
	}

	const match = activity.url?.match(/\/commit\/([a-f0-9]+)$/i)
	return match?.[1] || null
}

export function getActivityBranchName(
	activity: Pick<GitHubEventDetail, 'type' | 'title' | 'payload'>
): string | null {
	if (activity.type !== 'commit') return null

	const payload = activity.payload as { ref?: string } | null | undefined
	const fromPayload = payload?.ref?.replace(/^refs\/heads\//, '').trim()
	if (fromPayload) return fromPayload

	const match = activity.title.match(/\bto\s+(.+)$/i)
	return match?.[1]?.trim() || null
}

/** Compact label for the feed overview badge. */
export function getActivityOverviewLabel(
	activity: Pick<
		GitHubEventDetail,
		'type' | 'title' | 'description' | 'payload'
	>
): string {
	if (activity.type === 'commit') {
		return getActivityBranchName(activity) || activity.title
	}
	return activity.title
}

/** Full commit/event message for detail views (hover, day dialog). */
export function getActivityDisplayMessage(
	activity: Pick<
		GitHubEventDetail,
		'type' | 'title' | 'description' | 'payload' | 'url'
	>
): string {
	if (activity.type === 'commit') {
		const message = activity.description?.trim()
		if (message && !isGenericPushDescription(message)) {
			return message
		}

		const payload = activity.payload as
			| { commits?: Array<{ message?: string }> }
			| null
			| undefined
		const fromPayload = payload?.commits?.[0]?.message
			?.split('\n')[0]
			?.trim()
		if (fromPayload && !isGenericPushDescription(fromPayload)) {
			return fromPayload
		}

		const sha = getCommitHeadSha(activity)
		if (sha) return `Commit ${sha.slice(0, 7)}`
		return 'Commit'
	}
	return activity.title
}
