import { Suspense } from 'react'
import { AfterHoursCatalog } from '@/components/after-hours/after-hours-catalog'
import { getShowcaseProjects } from '@/components/projects/server/showcase-projects'
import { BreadcrumbStructuredData } from '@/components/seo/structured-data'
import { Section } from '@/components/ui/section'

function CatalogSkeleton() {
	return (
		<div className="space-y-0" aria-busy="true" aria-label="Loading projects">
			<div className="flex justify-between border-b border-border/50 px-4 py-3 md:px-5">
				<div className="h-3 w-40 animate-pulse rounded-sm bg-muted/30" />
				<div className="h-3 w-32 animate-pulse rounded-sm bg-muted/20" />
			</div>
			{Array.from({ length: 7 }).map((_, index) => (
				<div
					key={index}
					className="space-y-3 border-b border-border/60 px-4 py-6 md:px-5"
				>
					<div className="h-4 w-36 animate-pulse rounded-sm bg-muted/30" />
					<div className="h-3 w-full animate-pulse rounded-sm bg-muted/20" />
					<div className="h-3 w-full max-w-md animate-pulse rounded-sm bg-muted/15" />
					<div className="flex gap-1.5 pt-1">
						<div className="h-5 w-14 animate-pulse rounded-sm bg-muted/20" />
						<div className="h-5 w-16 animate-pulse rounded-sm bg-muted/20" />
						<div className="h-5 w-12 animate-pulse rounded-sm bg-muted/20" />
					</div>
				</div>
			))}
		</div>
	)
}

async function AfterHoursCatalogAsync() {
	const projects = await getShowcaseProjects()
	return <AfterHoursCatalog projects={projects} />
}

export function AfterHoursView() {
	return (
		<>
			<BreadcrumbStructuredData
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'After Hours', url: '/after-hours' }
				]}
			/>

			<div className="space-y-4">
				<Section
					animatedStripes
					title="After Hours"
					noHeaderMargin
					className="!mb-0"
				>
					<div className="space-y-3 px-4 pt-4 pb-5 md:px-5">
						<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/80 font-mono tracking-tight text-pretty">
							Night-shift engineering. Utilities, experiments, and
							systems that do not wait for a ticket. Built in
							public when the day job ends.
						</p>
						<p className="text-xs leading-relaxed text-muted-foreground/65">
							Each entry is a full write-up: what it does, how it
							is built, and where the source lives. Home keeps the
							dense teaser; this page is for reading.
						</p>
					</div>
				</Section>

				<Section
					animatedStripes
					title="Catalog"
					noPadding
					contentPadding={false}
					noHeaderMargin
					className="!mb-0"
				>
					<Suspense fallback={<CatalogSkeleton />}>
						<AfterHoursCatalogAsync />
					</Suspense>
				</Section>
			</div>
		</>
	)
}
