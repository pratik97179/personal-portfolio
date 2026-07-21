import { baseUrl } from '@/core/config/site'
import { profile } from '@/core/config/profile'

type BlogPostStructuredDataProps = {
	title: string
	description: string
	publishedAt: string
	updatedAt?: string
	author: string
	image?: string
	url: string
	keywords?: string[]
}

export function BlogPostStructuredData({
	title,
	description,
	publishedAt,
	updatedAt,
	author,
	image,
	url,
	keywords = []
}: BlogPostStructuredDataProps) {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: description,
		image: image || `${baseUrl}/og?title=${encodeURIComponent(title)}`,
		author: {
			'@type': 'Person',
			'@id': `${baseUrl}/#person`,
			name: author,
			url: baseUrl
		},
		publisher: {
			'@type': 'Person',
			'@id': `${baseUrl}/#person`,
			name: profile.name,
			logo: {
				'@type': 'ImageObject',
				url: `${baseUrl}/favicon.svg`
			}
		},
		datePublished: publishedAt,
		dateModified: updatedAt || publishedAt,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		},
		keywords: [
			'software engineering',
			'Flutter',
			'React',
			'TypeScript',
			'Next.js',
			...keywords
		]
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}

export const PERSON_ID = `${baseUrl}/#person`
export const WEBSITE_ID = `${baseUrl}/#website`

export function WebsiteStructuredData() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: `${profile.name} - ${profile.title}`,
		alternateName: [profile.name, profile.github.username],
		url: baseUrl,
		inLanguage: 'en',
		publisher: { '@id': PERSON_ID },
		about: { '@id': PERSON_ID },
		potentialAction: {
			'@type': 'SearchAction',
			target: `${baseUrl}/blog?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}

export function PersonStructuredData() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': PERSON_ID,
		name: profile.name,
		alternateName: profile.github.username,
		url: baseUrl,
		mainEntityOfPage: baseUrl,
		image: profile.avatarUrl,
		sameAs: [
			profile.github.url,
			profile.linkedin.url,
			profile.medium.url
		],
		jobTitle: profile.title,
		worksFor: {
			'@type': 'Organization',
			name: 'First Demat'
		},
		knowsAbout: [
			'Software Engineering',
			'Flutter',
			'React',
			'Next.js',
			'TypeScript',
			'WebSockets',
			'Mobile Development',
			'Fintech'
		],
		nationality: {
			'@type': 'Country',
			name: profile.location
		},
		description: profile.bio
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}

type BreadcrumbItem = {
	name: string
	url: string
}

type BreadcrumbStructuredDataProps = {
	items: BreadcrumbItem[]
}

export function BreadcrumbStructuredData({
	items
}: BreadcrumbStructuredDataProps) {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url.startsWith('http')
				? item.url
				: `${baseUrl}${item.url}`
		}))
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	)
}
