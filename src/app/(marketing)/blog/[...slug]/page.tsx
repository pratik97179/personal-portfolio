import { Metadata } from 'next'
import { Suspense } from 'react'
import { getResolvedBlogPostBySlug } from '@/features/blog'
import {
	createArticleMetadata,
	extendMetadata,
	baseUrl
} from '@/core/metadata/base'
import { BlogPostView } from '@/views/marketing/blog/post'

export async function generateStaticParams() {
	const { getBlogPosts } = await import('@/features/blog')
	let posts = getBlogPosts()

	return posts
		.filter(post => post && post.slug)
		.map(post => ({
			slug: post.slug.split('/')
		}))
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string | string[] }>
}): Promise<Metadata> {
	const resolvedParams = await params
	let slug = Array.isArray(resolvedParams.slug)
		? resolvedParams.slug.join('/')
		: resolvedParams.slug

	if (!slug) {
		return {}
	}

	let post = await getResolvedBlogPostBySlug(slug, false)
	if (!post) {
		return {}
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		updatedAt,
		canonicalUrl
	} = post.metadata

	const base = createArticleMetadata({
		title,
		description,
		publishedAt: publishedTime,
		updatedAt,
		image,
		canonical: canonicalUrl || `/blog/${post.slug}`,
		keywords: post.metadata.tags
	})

	return extendMetadata(base, {
		openGraph: {
			...base.openGraph,
			url: `${baseUrl}/blog/${post.slug}`
		}
	})
}

function PostSkeleton() {
	return (
		<section className="bg-pattern relative" aria-busy="true" aria-label="Loading post">
			<header>
				<div className="mb-3">
					<div className="h-4 w-14 animate-pulse rounded-sm bg-muted/20" />
				</div>
				<div className="mb-3 space-y-2">
					<div className="h-8 w-full max-w-xl animate-pulse rounded-sm bg-muted/30" />
					<div className="h-8 w-2/3 max-w-md animate-pulse rounded-sm bg-muted/25" />
				</div>
				<div className="mb-4 flex gap-4">
					<div className="h-4 w-28 animate-pulse rounded-sm bg-muted/20" />
					<div className="h-4 w-16 animate-pulse rounded-sm bg-muted/15" />
				</div>
				<div className="flex gap-2">
					<div className="h-8 w-24 animate-pulse rounded-md bg-muted/20" />
					<div className="h-8 w-20 animate-pulse rounded-md bg-muted/15" />
				</div>
			</header>

			<div className="screen-border mb-12" />

			<div className="max-w-3xl space-y-3">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index}
						className="h-3.5 animate-pulse rounded-sm bg-muted/15"
						style={{ width: `${72 + ((index * 13) % 28)}%` }}
					/>
				))}
			</div>
		</section>
	)
}

export default function Page(props: {
	params: Promise<{ slug: string | string[] }>
}) {
	return (
		<Suspense fallback={<PostSkeleton />}>
			<BlogPostView params={props.params} />
		</Suspense>
	)
}
