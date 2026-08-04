'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { getDateParts, readMinutes } from '@/features/blog/lib/format'
import { slugifyTopic } from '@/features/blog/lib/topic-slug'
import type { BlogTopicSummary } from '@/features/blog/lib/types'

type BlogPost = {
	metadata: {
		title: string
		publishedAt: string
		summary: string
		topic?: string
		tags?: string[]
		readTime?: string
		draft?: boolean
	}
	slug: string
}

type Props = {
	posts: BlogPost[]
	topics: BlogTopicSummary[]
}

function groupByYear(posts: BlogPost[]) {
	const groups = new Map<number, BlogPost[]>()
	for (const post of posts) {
		const year = getDateParts(post.metadata.publishedAt).year
		const bucket = groups.get(year) ?? []
		bucket.push(post)
		groups.set(year, bucket)
	}
	return Array.from(groups.entries())
}

export function BlogArchive({ posts, topics }: Props) {
	const [activeTopic, setActiveTopic] = useState<string | 'all'>('all')

	const filtered = useMemo(() => {
		if (activeTopic === 'all') return posts
		return posts.filter(
			post =>
				post.metadata.topic &&
				slugifyTopic(post.metadata.topic) === activeTopic
		)
	}, [posts, activeTopic])

	const yearGroups = useMemo(() => groupByYear(filtered), [filtered])

	return (
		<div>
			<div className="space-y-3 border-b border-border/50 px-4 py-3 md:px-5">
				<div className="flex flex-wrap items-center justify-between gap-2">
					<p className="text-[10px] font-mono tracking-tight text-muted-foreground/70">
						{filtered.length} note
						{filtered.length === 1 ? '' : 's'}
						{activeTopic !== 'all' && (
							<>
								<span className="mx-1.5 text-muted-foreground/30">
									·
								</span>
								filtered
							</>
						)}
					</p>
					<Link
						href="/blog/topics"
						className="text-[10px] font-mono tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
					>
						all topics →
					</Link>
				</div>

				<div
					className="flex flex-wrap gap-1.5"
					role="tablist"
					aria-label="Filter by topic"
				>
					<button
						type="button"
						role="tab"
						aria-selected={activeTopic === 'all'}
						onClick={() => setActiveTopic('all')}
						className={cn(
							'border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
							activeTopic === 'all'
								? 'border-foreground/25 bg-foreground/5 text-foreground'
								: 'border-border/50 text-muted-foreground/70 hover:text-foreground'
						)}
						style={
							activeTopic === 'all'
								? {
										backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 3px)`
									}
								: undefined
						}
					>
						all
					</button>
					{topics.map(topic => (
						<button
							key={topic.slug}
							type="button"
							role="tab"
							aria-selected={activeTopic === topic.slug}
							onClick={() => setActiveTopic(topic.slug)}
							className={cn(
								'border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
								activeTopic === topic.slug
									? 'border-foreground/25 bg-foreground/5 text-foreground'
									: 'border-border/50 text-muted-foreground/70 hover:text-foreground'
							)}
							style={
								activeTopic === topic.slug
									? {
											backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 3px)`
										}
									: undefined
							}
						>
							{topic.name}
							<span className="ml-1 text-muted-foreground/50">
								{topic.count}
							</span>
						</button>
					))}
				</div>
			</div>

			<div className="border-t border-border">
				{yearGroups.map(([year, yearPosts], groupIndex) => (
					<section key={year} aria-labelledby={`year-${year}`}>
						<div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/40 bg-background/95 px-4 py-2 backdrop-blur-sm md:px-5">
							<span
								id={`year-${year}`}
								className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60"
							>
								{year}
							</span>
							<span
								className="h-px grow bg-border/40"
								aria-hidden="true"
							/>
							<span className="font-mono text-[10px] text-muted-foreground/45">
								{yearPosts.length}
							</span>
						</div>

						<ul role="list">
							{yearPosts.map((post, index) => {
								const date = getDateParts(
									post.metadata.publishedAt
								)
								const minutes = readMinutes(
									post.metadata.readTime || ''
								)
								const delay =
									(groupIndex * yearPosts.length + index) * 45

								return (
									<li key={post.slug}>
										<Link
											href={`/blog/${post.slug}` as Route}
											className="group animate-stagger grid grid-cols-[3.5rem_minmax(0,1fr)_auto] gap-3 border-b border-border/50 px-4 py-4 transition-colors hover:bg-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:grid-cols-[4.5rem_minmax(0,1fr)_auto] md:gap-4 md:px-5"
											style={{
												animationDelay: `${delay}ms`
											}}
										>
											<time
												dateTime={
													post.metadata.publishedAt
												}
												className="pt-0.5 font-mono text-[10px] tabular-nums leading-4 text-muted-foreground/60"
											>
												<span className="block">
													{date.month.slice(0, 3)}
												</span>
												<span className="block text-muted-foreground/85">
													{date.day}
												</span>
											</time>

											<div className="min-w-0">
												<p className="text-sm font-medium text-foreground transition-colors group-hover:text-brand-500">
													{post.metadata.title}
												</p>
												{post.metadata.summary && (
													<p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground/75">
														{post.metadata.summary}
													</p>
												)}
												<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-muted-foreground/55">
													{minutes > 0 && (
														<span>
															{minutes} min
														</span>
													)}
													{post.metadata.topic && (
														<>
															<span className="text-muted-foreground/25">
																·
															</span>
															<span>
																{
																	post
																		.metadata
																		.topic
																}
															</span>
														</>
													)}
												</div>
											</div>

											<ArrowUpRight className="mt-1 size-3 shrink-0 text-muted-foreground/25 transition-transform transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transform-none" />
										</Link>
									</li>
								)
							})}
						</ul>
					</section>
				))}

				{filtered.length === 0 && (
					<p className="px-4 py-10 text-center text-sm text-muted-foreground md:px-5">
						No notes in this topic yet.
					</p>
				)}
			</div>
		</div>
	)
}
