import { WORK_EXPERIENCE } from '@/components/home/data/work-experience'
import { Section } from '@/components/ui/section'
import { WorkExperience } from '@/components/ui/work-experience'

export function WorkExperienceSection() {
	return (
		<Section
			animatedStripes
			title="Professional Experience"
			titleHref="/experience"
		>
			<WorkExperience experiences={WORK_EXPERIENCE} />
		</Section>
	)
}
