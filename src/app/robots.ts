import { baseUrl } from '@/core/config/site'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/api/']
		},
		host: baseUrl,
		sitemap: `${baseUrl}/sitemap.xml`
	}
}
