type DateParts = {
	day: number
	month: string
	year: number
}

const FALLBACK_DATE = new Date(0)

function parseDate(input: string): Date {
	const value = input?.trim()
	if (!value) {
		return FALLBACK_DATE
	}

	const directDate = new Date(value)
	if (!Number.isNaN(directDate.getTime())) {
		return directDate
	}

	const cleanValue = value.replace(/\s+/g, '')
	const separator = cleanValue.includes('-')
		? '-'
		: cleanValue.includes('/')
			? '/'
			: null
	if (separator) {
		const parts = cleanValue.split(separator)
		if (parts.length === 3) {
			const [first, second, third] = parts
			const firstNumber = Number(first)
			const secondNumber = Number(second)
			const thirdNumber = Number(third)

			if (
				!Number.isNaN(firstNumber) &&
				!Number.isNaN(secondNumber) &&
				!Number.isNaN(thirdNumber)
			) {
				const hasYearFirst = first.length === 4
				const year = hasYearFirst ? firstNumber : thirdNumber
				const month = secondNumber
				const day = hasYearFirst ? thirdNumber : firstNumber

				return new Date(
					Date.UTC(year, Math.max(0, month - 1), Math.max(1, day))
				)
			}
		}
	}

	return FALLBACK_DATE
}

export function getDateParts(input: string): DateParts {
	const parsedDate = parseDate(input)

	return {
		day: parsedDate.getUTCDate(),
		month: parsedDate.toLocaleString('en-us', {
			month: 'long',
			timeZone: 'UTC'
		}),
		year: parsedDate.getUTCFullYear()
	}
}

export function readMinutes(value: string | number): number {
	if (typeof value === 'number') {
		return Number.isFinite(value) ? value : 0
	}

	const match = value.match(/\d+/)
	if (match) {
		return Number.parseInt(match[0], 10)
	}

	return 0
}

/** Topic + tags, deduped case-insensitively (display order preserved). */
export function getPostLabels(post: {
	metadata: { topic?: string; tags?: string[] }
}): string[] {
	const labels = [
		...(post.metadata.topic ? [post.metadata.topic] : []),
		...(post.metadata.tags || [])
	]

	return labels.filter(
		(label, index, arr) =>
			arr.findIndex(item => item.toLowerCase() === label.toLowerCase()) ===
			index
	)
}

export function postHasLabel(
	post: { metadata: { topic?: string; tags?: string[] } },
	label: string
) {
	const needle = label.toLowerCase()
	return getPostLabels(post).some(item => item.toLowerCase() === needle)
}

export function collectPostLabels(
	posts: Array<{ metadata: { topic?: string; tags?: string[] } }>
) {
	const counts = new Map<string, { name: string; count: number }>()

	for (const post of posts) {
		for (const label of getPostLabels(post)) {
			const key = label.toLowerCase()
			const existing = counts.get(key)
			if (existing) {
				existing.count += 1
			} else {
				counts.set(key, { name: label, count: 1 })
			}
		}
	}

	return Array.from(counts.values()).sort(
		(a, b) => b.count - a.count || a.name.localeCompare(b.name)
	)
}
