import { ProjectShowcase } from '@/components/projects'
import { Section } from '@/components/ui/section'
import { STATIC_PROJECTS } from '@/components/projects/data/static-projects'

type Props = {
	visibleRowCount?: number
}

export function ProjectsView({
	visibleRowCount = STATIC_PROJECTS.length || 3
}: Props) {
	return (
		<Section
			animatedStripes
			title="After Hours"
			titleHref="/after-hours"
			noPadding
			contentPadding={false}
			noHeaderMargin
			className="!mb-0"
		>
			<ProjectShowcase visibleRowCount={visibleRowCount} />
		</Section>
	)
}
