import { ActivityContributionGraph } from './contribution-graph'
import { Section } from '../../ui/section'
import { Heading } from '../../ui/heading'
import { ActivityFeed } from './activity-feed'
import { CurrentYear } from '@/components/ui/current-year'

export function ActivitySection() {
	return (
		<Section noPadding contentPadding={true} className="mb-0">
			<Heading
				title="Activity & Contributions"
				noMargin
				bgDirection="diagonal"
				colorPattern="dark"
				animateStripes
				headerAction={
					<CurrentYear className="text-xs text-muted-foreground/60 inline-flex items-baseline" />
				}
			/>
			<div className="space-y-4 pt-3">
				<p className="px-4 md:px-5 text-sm text-muted-foreground/80 leading-relaxed font-mono tracking-tight">
					I ship production software across fintech and consumer
					apps: real-time trading UIs, mobile apps with millions of
					downloads, and cross-platform architecture. Recent commits
					and contributions below.
				</p>

				<div>
					<ActivityContributionGraph showLegend={true} />
				</div>

				<ActivityFeed activityCount={5} rotationInterval={6000} />
			</div>
		</Section>
	)
}
