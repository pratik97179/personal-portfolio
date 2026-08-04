import { describe, expect, it } from 'vitest'
import { mapPushEventToActivity } from '@/server/github/service'

describe('mapPushEventToActivity', () => {
	it('keeps public PushEvents that omit size and commits', () => {
		const detail = mapPushEventToActivity({
			id: '16732873824',
			created_at: '2026-08-04T21:04:11Z',
			public: true,
			repo: { name: 'pratik97179/blastradius' },
			payload: {
				repository_id: 1323365149,
				push_id: 39046494343,
				ref: 'refs/heads/main',
				head: '291c17812195284b9f5b7d41bba8af032d920adb',
				before: 'b96dd94501e6eb84765d0b870397f0201877e5a5'
			} as any
		})

		expect(detail).toMatchObject({
			id: '16732873824',
			type: 'commit',
			repository: 'pratik97179/blastradius',
			title: 'pushed commits to main',
			description: 'Updates on main',
			url: 'https://github.com/pratik97179/blastradius/commit/291c17812195284b9f5b7d41bba8af032d920adb'
		})
	})

	it('prefers commit count and message when the payload includes them', () => {
		const detail = mapPushEventToActivity({
			id: '1',
			created_at: '2026-08-04T21:04:11Z',
			public: true,
			repo: { name: 'owner/app' },
			payload: {
				size: 2,
				ref: 'refs/heads/main',
				head: 'abc123',
				commits: [
					{ message: 'fix carousel feed\n\nmore detail' },
					{ message: 'chore: ignore' }
				]
			}
		})

		expect(detail).toMatchObject({
			type: 'commit',
			title: 'pushed 2 commits to main',
			description: 'fix carousel feed',
			url: 'https://github.com/owner/app/commit/abc123'
		})
	})

	it('drops empty push payloads with no ref or head', () => {
		expect(
			mapPushEventToActivity({
				id: '1',
				created_at: '2026-08-04T21:04:11Z',
				repo: { name: 'owner/app' },
				payload: {}
			})
		).toBeNull()
	})
})
