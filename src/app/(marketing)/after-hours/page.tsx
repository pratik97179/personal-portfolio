import type { Metadata } from 'next'
import { afterHoursMetadata } from '@/core/metadata/after-hours'
import { AfterHoursView } from '@/views/marketing/after-hours'

export const metadata: Metadata = afterHoursMetadata

export default function AfterHoursPage() {
	return <AfterHoursView />
}
