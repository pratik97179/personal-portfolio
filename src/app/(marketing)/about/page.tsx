import { Metadata } from 'next'
import { createPageMetadata } from '@/core/metadata/base'
import { profile } from '@/core/config/profile'
import { AboutView } from '@/views/marketing/about'

export const metadata: Metadata = createPageMetadata({
	title: `About ${profile.name}`,
	description: profile.extendedBio,
	keywords: [
		profile.name,
		'About',
		'Software Engineer',
		'Flutter',
		'React',
		'Next.js',
		'TypeScript',
		'India'
	],
	canonical: '/about'
})

export default function Page() {
	return <AboutView />
}
