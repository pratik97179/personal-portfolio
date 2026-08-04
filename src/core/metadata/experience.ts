import { createPageMetadata } from './base'
import { profile } from '@/core/config/profile'

export const experienceMetadata = createPageMetadata({
	title: 'Professional Experience',
	description: `Roles, products, and systems ${profile.name} has shipped across fintech, consumer apps, and product engineering teams.`,
	keywords: [
		profile.name,
		'Professional Experience',
		'Work History',
		'Software Engineer',
		'Flutter',
		'React',
		'Next.js',
		'Fintech'
	],
	canonical: '/experience'
})
