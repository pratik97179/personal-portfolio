import { Suspense } from 'react'
import { BlogArchive } from '@/components/blog/blog-archive'
import { BreadcrumbStructuredData } from '@/components/seo/structured-data'
import { Section } from '@/components/ui/section'
import { getVisibleBlogPosts } from '@/features/blog'

function ArchiveSkeleton() {
	return (
		<div aria-busy="true" aria-label="Loading posts">
			<div className="space-y-3 border-b border-border/50 px-4 py-3 md:px-5">
				<div className="flex justify-between">
					<div className="h-3 w-24 animate-pulse rounded-sm bg-muted/30" />
					<div className="h-3 w-20 animate-pulse rounded-sm bg-muted/20" />
				</div>
				<div className="flex gap-1.5">
					<div className="h-6 w-10 animate-pulse rounded-sm bg-muted/25" />
					<div className="h-6 w-20 animate-pulse rounded-sm bg-muted/20" />
					<div className="h-6 w-16 animate-pulse rounded-sm bg-muted/20" />
				</div>
			</div>
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-b border-border/50 px-4 py-4 md:px-5"
				>
					<div className="space-y-1">
						<div className="h-2.5 w-8 animate-pulse rounded-sm bg-muted/20" />
						<div className="h-2.5 w-5 animate-pulse rounded-sm bg-muted/25" />
					</div>
					<div className="space-y-2">
						<div className="h-3.5 w-48 animate-pulse rounded-sm bg-muted/30" />
						<div className="h-3 w-full max-w-sm animate-pulse rounded-sm bg-muted/15" />
					</div>
				</div>
			))}
		</div>
	)
}

async function BlogArchiveAsync() {
	const posts = await getVisibleBlogPosts(false)
	return <BlogArchive posts={posts} />
}

export function BlogView() {
	return (
		<>
			<BreadcrumbStructuredData
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' }
				]}
			/>

			<div className="space-y-4">
				<Section
					animatedStripes
					title="Posts"
					noHeaderMargin
					className="!mb-0"
				>
					<div className="space-y-3 px-4 pt-4 pb-5 md:px-5">
						<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/80 font-mono tracking-tight text-pretty">
							Field notes from building software: architecture
							detours, Flutter mechanics, and the occasional
							overcooked opinion written down so it stays useful.
						</p>
						<p className="text-xs leading-relaxed text-muted-foreground/65">
							Logbook layout by year. Filter by tag, or open the
							topic index when you want a broader cut.
						</p>
					</div>
				</Section>

				<Section
					animatedStripes
					title="Archive"
					noPadding
					contentPadding={false}
					noHeaderMargin
					className="!mb-0"
				>
					<Suspense fallback={<ArchiveSkeleton />}>
						<BlogArchiveAsync />
					</Suspense>
				</Section>
			</div>
		</>
	)
}
