import { createPageMetadata } from '@/core/metadata/base'
import { PrivacyView } from '@/views/marketing/privacy'

export const metadata = createPageMetadata({
	title: 'Privacy Policy',
	description:
		'Privacy policy for this portfolio: how contact and technical data are handled.',
	canonical: '/privacy'
})

export default function Page() {
	return <PrivacyView />
}
