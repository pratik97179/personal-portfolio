'use client'

import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/shared/lib/cn'
import type {
	ExperienceItemType,
	ExperiencePositionItemType
} from '@/components/ui/work-experience'
import { CompanyStoreLinks } from '@/components/experience/company-store-links'

type Props = {
	experiences: ExperienceItemType[]
}

function HatchChip({ children }: { children: ReactNode }) {
	return (
		<span
			className="inline-flex items-center border border-foreground/10 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
			style={{
				backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 2px, hsl(var(--foreground) / 0.05) 2px, hsl(var(--foreground) / 0.05) 3px)`
			}}
		>
			{children}
		</span>
	)
}

function periodAnchor(period: string) {
	const match = period.match(/(\d{4}|\w{3}\s+\d{4}|present)/i)
	return match?.[1] ?? period.slice(0, 8)
}

function PositionBlock({ position }: { position: ExperiencePositionItemType }) {
	return (
		<div className="space-y-3 border-l border-border/50 pl-4">
			<div>
				<h3 className="text-sm font-semibold text-foreground">
					{position.title}
				</h3>
				<p className="mt-0.5 font-mono text-[10px] tracking-tight text-muted-foreground/75">
					{[position.employmentType, position.employmentPeriod, position.location]
						.filter(Boolean)
						.join(' · ')}
				</p>
			</div>

			{position.description && (
				<div
					className={cn(
						'prose prose-sm max-w-none text-muted-foreground prose-zinc dark:prose-invert',
						'prose-p:leading-6 prose-p:my-1.5',
						'prose-ul:m-0 prose-ul:p-0 prose-ul:list-none',
						"prose-li:relative prose-li:pl-4 prose-li:my-0 prose-li:leading-6 prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[9px] prose-li:before:text-[9px] prose-li:before:leading-none prose-li:before:font-mono prose-li:before:text-muted-foreground/40 prose-li:before:content-['+']"
					)}
				>
					<ReactMarkdown
						components={{
							strong: ({ children }) => (
								<strong className="text-foreground font-semibold">
									{children}
								</strong>
							),
							em: ({ children }) => (
								<em className="text-foreground">{children}</em>
							)
						}}
					>
						{position.description}
					</ReactMarkdown>
				</div>
			)}

			{position.skills && position.skills.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{position.skills.map(skill => (
						<HatchChip key={skill}>{skill}</HatchChip>
					))}
				</div>
			)}
		</div>
	)
}

function CompanyDossier({
	experience,
	index
}: {
	experience: ExperienceItemType
	index: number
}) {
	const initial = experience.companyName.charAt(0).toUpperCase()
	const primaryPeriod = experience.positions[0]?.employmentPeriod ?? ''
	const yearLabel = periodAnchor(primaryPeriod)

	return (
		<article
			id={experience.id}
			className="animate-stagger scroll-mt-6 border-b border-border/60"
			style={{ animationDelay: `${index * 80}ms` }}
		>
			<div className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 px-4 py-6 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-5 md:px-5">
				<div className="flex flex-col items-center gap-2 pt-0.5">
					<span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/55">
						{yearLabel}
					</span>
					<span
						className={cn(
							'relative flex size-9 items-center justify-center border border-border bg-card text-sm font-semibold text-muted-foreground',
							experience.isCurrentEmployer &&
								'border-brand-500/40 text-foreground'
						)}
					>
						{initial}
						{experience.isCurrentEmployer && (
							<span className="absolute -right-1 -top-1 size-2 rounded-full bg-brand-500 ring-2 ring-background" />
						)}
					</span>
					<span
						className="mt-1 w-px grow bg-border/50"
						aria-hidden="true"
					/>
				</div>

				<div className="min-w-0 space-y-4 pb-1">
					<header className="space-y-1.5">
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="text-base font-semibold tracking-tight text-brand-500">
								{experience.companyName}
							</h2>
							<CompanyStoreLinks links={experience.storeLinks} />
							{experience.isCurrentEmployer && (
								<span className="inline-flex items-center border border-brand-500/30 bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-500">
									Current
								</span>
							)}
						</div>
						{experience.companyMeta && (
							<p className="font-mono text-[10px] tracking-tight text-muted-foreground/70">
								{experience.companyMeta}
							</p>
						)}
						{experience.companyDescription && (
							<p className="text-sm leading-relaxed text-muted-foreground/80">
								{experience.companyDescription}
							</p>
						)}
					</header>

					<div className="space-y-5">
						{experience.positions.map(position => (
							<PositionBlock
								key={position.id}
								position={position}
							/>
						))}
					</div>
				</div>
			</div>
		</article>
	)
}

export function ExperienceRoster({ experiences }: Props) {
	const work = experiences.filter(exp => exp.id !== 'education')
	const education = experiences.find(exp => exp.id === 'education')
	const ordered = education ? [...work, education] : work

	const companyCount = work.length
	const current = work.find(exp => exp.isCurrentEmployer)

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 px-4 py-3 md:px-5">
				<p className="text-[10px] font-mono tracking-tight text-muted-foreground/70">
					{companyCount} companies
					{current && (
						<>
							<span className="mx-1.5 text-muted-foreground/30">
								·
							</span>
							now {current.companyName}
						</>
					)}
					{education && (
						<>
							<span className="mx-1.5 text-muted-foreground/30">
								·
							</span>
							+ education
						</>
					)}
				</p>
				<nav
					aria-label="Jump to company"
					className="flex flex-wrap gap-1"
				>
					{ordered.map(exp => (
						<a
							key={exp.id}
							href={`#${exp.id}`}
							className="flex size-6 items-center justify-center border border-border/50 bg-secondary/20 font-mono text-[10px] text-muted-foreground/70 transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
							title={exp.companyName}
						>
							{exp.companyName.charAt(0).toUpperCase()}
						</a>
					))}
				</nav>
			</div>

			<div className="border-t border-border">
				{ordered.map((experience, index) => (
					<CompanyDossier
						key={experience.id}
						experience={experience}
						index={index}
					/>
				))}
			</div>
		</div>
	)
}
