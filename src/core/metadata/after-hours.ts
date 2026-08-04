import { createPageMetadata } from './base'
import { profile } from '@/core/config/profile'

export const afterHoursMetadata = createPageMetadata({
	title: 'After Hours',
	description: `Personal and open-source projects ${profile.name} builds outside of work: tools, experiments, and side systems.`,
	keywords: [
		profile.name,
		'After Hours',
		'Open Source',
		'Side Projects',
		'GitHub',
		'Flutter',
		'Python',
		'TypeScript'
	],
	canonical: '/after-hours'
})
