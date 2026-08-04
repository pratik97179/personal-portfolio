import { Suspense } from 'react'
import { STATIC_PROJECTS } from '../data/static-projects'
import { getShowcaseProjects } from '../server/showcase-projects'
import { ProjectRowSkeleton } from './project-row-skeleton'
import { ProjectShowcaseClient } from './project-showcase-client'

type Props = {
	visibleRowCount?: number
}

function ShowcaseSkeleton({ rowCount }: { rowCount: number }) {
	return (
		<div className="flex flex-col">
			{Array.from({ length: rowCount }).map((_, i) => (
				<ProjectRowSkeleton key={i} />
			))}
		</div>
	)
}

async function ProjectShowcaseAsync() {
	const projects = await getShowcaseProjects()
	return <ProjectShowcaseClient projects={projects} />
}

export function ProjectShowcase({
	visibleRowCount = STATIC_PROJECTS.length || 3
}: Props) {
	return (
		<Suspense fallback={<ShowcaseSkeleton rowCount={visibleRowCount} />}>
			<ProjectShowcaseAsync />
		</Suspense>
	)
}
