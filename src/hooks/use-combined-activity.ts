'use client'

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { SpotifyTrack } from '@/features/spotify/client'
import type { GitHubEventDetail } from './use-github'

export const COMBINED_ACTIVITY_LIMIT = 20
export const COMBINED_TRACKS_LIMIT = 10

export interface CombinedActivityData {
	contributions: Array<{ date: string; contributionCount: number }>
	totalContributions: number
	recentActivity: GitHubEventDetail[]
	spotifyTracks: SpotifyTrack[]
	fetchedAt: number
}

export function useCombinedActivity(activityLimit = 5, tracksLimit = 10) {
	const resolvedActivityLimit = Math.max(
		activityLimit,
		COMBINED_ACTIVITY_LIMIT
	)
	const resolvedTracksLimit = Math.max(tracksLimit, COMBINED_TRACKS_LIMIT)

	return useQuery({
		queryKey: [
			'combined-activity',
			resolvedActivityLimit,
			resolvedTracksLimit
		],
		queryFn: async (): Promise<CombinedActivityData> => {
			const response = await fetch(
				`/api/activity/combined?activityLimit=${resolvedActivityLimit}&tracksLimit=${resolvedTracksLimit}`
			)
			if (!response.ok) {
				throw new Error('Failed to fetch combined activity')
			}
			return response.json()
		},
		staleTime: 60 * 1000,
		gcTime: 5 * 60 * 1000,
		retry: 2,
		retryDelay: 1000,
		placeholderData: keepPreviousData
	})
}

export function useContributionsFromCombined(
	activityLimit = 5,
	tracksLimit = 10
) {
	const query = useCombinedActivity(activityLimit, tracksLimit)

	const contributionsMap = new Map<
		string,
		{ date: string; contributionCount: number }
	>()
	if (query.data?.contributions) {
		for (const item of query.data.contributions) {
			contributionsMap.set(item.date, item)
		}
	}

	return {
		...query,
		data: contributionsMap,
		totalContributions: query.data?.totalContributions || 0
	}
}
