const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	timeZone: 'UTC'
})

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
	timeZone: 'UTC'
})

/** Civil calendar for contribution matching (GitHub contribution days use profile TZ). */
export const ACTIVITY_TIMEZONE =
	process.env.NEXT_PUBLIC_ACTIVITY_TIMEZONE?.trim() || 'Asia/Kolkata'

const ACTIVITY_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
	timeZone: ACTIVITY_TIMEZONE,
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
})

export function toActivityDateKey(input: Date | string | number): string {
	const date = input instanceof Date ? input : new Date(input)
	if (Number.isNaN(date.getTime())) return ''
	return ACTIVITY_DATE_FORMATTER.format(date)
}

export function formatShortDate(dateString: string): string {
	return SHORT_DATE_FORMATTER.format(new Date(dateString))
}

export function formatDate(dateString: string): string {
	return LONG_DATE_FORMATTER.format(new Date(dateString))
}
