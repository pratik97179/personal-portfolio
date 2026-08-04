import { WORK_EXPERIENCE } from '@/components/home/data/work-experience'
import { ExperienceRoster } from '@/components/experience/experience-roster'
import { BreadcrumbStructuredData } from '@/components/seo/structured-data'
import { Section } from '@/components/ui/section'

export function ExperienceView() {
	return (
		<>
			<BreadcrumbStructuredData
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Experience', url: '/experience' }
				]}
			/>

			<div className="space-y-4">
				<Section
					animatedStripes
					title="Professional Experience"
					noHeaderMargin
					className="!mb-0"
				>
					<div className="space-y-3 px-4 pt-4 pb-5 md:px-5">
						<p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/80 font-mono tracking-tight text-pretty">
							A ledger of roles where the work was shipping
							systems: trading UIs, realtime feeds, Flutter
							rewrites, and the contracts that keep them honest.
						</p>
						<p className="text-xs leading-relaxed text-muted-foreground/65">
							Read top to bottom, or jump via the roster initials.
							Home keeps the accordion; this page keeps every
							dossier open.
						</p>
					</div>
				</Section>

				<Section
					animatedStripes
					title="Roster"
					noPadding
					contentPadding={false}
					noHeaderMargin
					className="!mb-0"
				>
					<ExperienceRoster experiences={WORK_EXPERIENCE} />
				</Section>
			</div>
		</>
	)
}
