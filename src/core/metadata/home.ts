import { createPageMetadata } from './base'

import { profile } from '@/core/config/profile'

export const homeMetadata = createPageMetadata({
	title: `${profile.name} - ${profile.title}`,
	description: profile.bio,
	keywords: [
		'personal blog',
		'portfolio',
		'software engineering',
		'Flutter',
		'React',
		'Next.js',
		'TypeScript',
		'fintech',
		'mobile development'
	],
	canonical: '/'
})
