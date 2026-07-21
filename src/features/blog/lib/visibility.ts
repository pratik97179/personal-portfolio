import { getAllBlogPosts } from './posts'
import { getTopicBySlug, slugifyTopic } from './topic-slug'
import type { BlogTopicSummary, ResolvedBlogPost } from './types'
import { cacheLife, cacheTag } from 'next/cache'

async function getResolvedBlogPosts() {
	'use cache'
	cacheTag('blog-posts')
	cacheLife('hours')
	const filePosts = getAllBlogPosts()

	return filePosts.map(post => ({
		...post,
		metadata: {
			...post.metadata,
			draft: post.metadata.draft || false
		},
		views: 0,
		uniqueViews: 0
	})) satisfies ResolvedBlogPost[]
}

function sortBlogPosts(posts: ResolvedBlogPost[]) {
	return [...posts].sort((a, b) => {
		if (a.metadata.draft && !b.metadata.draft) return -1
		if (!a.metadata.draft && b.metadata.draft) return 1

		return new Date(a.metadata.publishedAt) >
			new Date(b.metadata.publishedAt)
			? -1
			: 1
	})
}

export async function getVisibleBlogPosts(includeDrafts = false) {
	const posts = await getResolvedBlogPosts()

	const visiblePosts = includeDrafts
		? posts
		: posts.filter(post => !post.metadata.draft)

	return sortBlogPosts(visiblePosts)
}

export async function getResolvedBlogPostBySlug(
	slug: string,
	includeDrafts = false
) {
	const posts = await getResolvedBlogPosts()

	return (
		posts.find(
			post =>
				post.slug === slug && (includeDrafts || !post.metadata.draft)
		) || null
	)
}

export async function getTopicArchive(
	topic: string,
	includeDrafts = false
): Promise<{ topic: string; posts: ResolvedBlogPost[] } | null> {
	const canonicalTopic = getTopicBySlug(topic)
	if (!canonicalTopic) return null

	const posts = (await getVisibleBlogPosts(includeDrafts)).filter(
		post =>
			slugifyTopic(post.metadata.topic || '') ===
			slugifyTopic(canonicalTopic)
	)

	if (posts.length === 0) return null

	return {
		topic: canonicalTopic,
		posts
	}
}

export async function getAdjacentBlogPosts(
	slug: string,
	includeDrafts = false
): Promise<{
	prevPost: ResolvedBlogPost | null
	nextPost: ResolvedBlogPost | null
}> {
	const posts = await getVisibleBlogPosts(includeDrafts)
	const currentIndex = posts.findIndex(post => post.slug === slug)

	if (currentIndex === -1) {
		return {
			prevPost: null,
			nextPost: null
		}
	}

	return {
		prevPost:
			currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
		nextPost: currentIndex > 0 ? posts[currentIndex - 1] : null
	}
}

export async function getVisibleTopics(includeDrafts = false) {
	const posts = await getVisibleBlogPosts(includeDrafts)
	const topicCounts = new Map<string, number>()

	posts.forEach(post => {
		const topic = post.metadata.topic
		if (!topic) return
		topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
	})

	return Array.from(topicCounts.entries())
		.map(([name, count]) => ({
			name,
			slug: slugifyTopic(name),
			count
		}))
		.sort(
			(a, b) => b.count - a.count || a.name.localeCompare(b.name)
		) as BlogTopicSummary[]
}
