import type { Metadata } from 'next'
import { experienceMetadata } from '@/core/metadata/experience'
import { ExperienceView } from '@/views/marketing/experience'

export const metadata: Metadata = experienceMetadata

export default function ExperiencePage() {
	return <ExperienceView />
}
