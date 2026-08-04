import { describe, expect, it } from 'vitest'
import { toActivityDateKey } from '@/shared/lib/date'

describe('toActivityDateKey', () => {
	it('maps early-morning IST timestamps onto the local calendar day', () => {
		// 2026-07-22 02:06 IST == 2026-07-21 20:36 UTC
		expect(toActivityDateKey('2026-07-21T20:36:00.000Z')).toBe('2026-07-22')
	})

	it('keeps afternoon IST timestamps on the same calendar day', () => {
		// 2026-07-22 14:00 IST == 2026-07-22 08:30 UTC
		expect(toActivityDateKey('2026-07-22T08:30:00.000Z')).toBe('2026-07-22')
	})
})
