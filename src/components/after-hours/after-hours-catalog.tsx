'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { ExternalLink, Github } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { formatDate, formatShortDate } from '@/shared/lib/date'
import { profile } from '@/core/config/profile'
import type { IProject, TStatus, TProject } from '@/components/projects/types'

type Props = {
	projects: IProject[]
}

const TYPE_LABEL: Record<TProject, string> = {
	desktop: 'desktop',
	cli: 'cli',
	ui: 'ui',
	saas: 'saas',
	utility: 'utility',
	game: 'game'
}

function statusClass(status: TStatus) {
	if (status === 'wip') return 'text-amber-500/90'
	if (status === 'beta') return 'text-brand-500/90'
	return 'text-muted-foreground/70'
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

function ActivitySpark({ weeks }: { weeks: number[] }) {
	const max = Math.max(...weeks, 1)
	return (
		<div
			className="flex h-3 items-end gap-px"
			aria-hidden="true"
			title="Recent weekly commit activity"
		>
			{weeks.slice(-12).map((count, index) => (
				<span
					key={index}
					className={cn(
						'w-[3px] rounded-[1px]',
						count === 0
							? 'bg-neutral-200 dark:bg-neutral-900/70'
							: count / max > 0.66
								? 'bg-brand-500'
								: count / max > 0.33
									? 'bg-brand-500/50'
									: 'bg-brand-500/30'
					)}
					style={{ height: `${Math.max(2, (count / max) * 12)}px` }}
				/>
			))}
		</div>
	)
}

function ProjectEntry({
	project,
	index
}: {
	project: IProject
	index: number
}) {
	const externalUrl =
		project.preview?.type === 'iframe' ? project.preview.url : undefined

	return (
		<article
			className="animate-stagger border-b border-border/60 px-4 py-6 md:px-5"
			style={{ animationDelay: `${index * 70}ms` }}
		>
			<header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
				<h2 className="text-base font-semibold tracking-tight text-foreground">
					{project.name}
				</h2>
				<p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground/70">
					<span className={statusClass(project.status)}>
						{project.status}
					</span>
					<span className="mx-1.5 text-muted-foreground/30">·</span>
					<span>{TYPE_LABEL[project.type]}</span>
					{project.platforms?.length ? (
						<>
							<span className="mx-1.5 text-muted-foreground/30">
								·
							</span>
							<span>{project.platforms.join(' / ')}</span>
						</>
					) : null}
				</p>
			</header>

			<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
				{project.description}
			</p>

			{project.additionalDescription && (
				<p className="mt-2 text-sm leading-relaxed text-muted-foreground/75 font-mono tracking-tight">
					{project.additionalDescription}
				</p>
			)}

			<div className="mt-4 flex flex-wrap gap-1.5">
				{project.tech.map(tech => (
					<HatchChip key={tech}>{tech}</HatchChip>
				))}
			</div>

			{(project.git || project.github || externalUrl) && (
				<footer className="mt-5 flex flex-col gap-3 border-t border-border/40 pt-3 sm:flex-row sm:items-center sm:justify-between">
					{project.git ? (
						<div className="flex min-w-0 flex-col gap-1.5 text-[10px] font-mono text-muted-foreground/80">
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
								<span>{project.git.totalCommits} commits</span>
								<span>
									since {formatDate(project.git.firstCommitDate)}
								</span>
								{project.git.lastUpdated && (
									<span>
										updated{' '}
										{formatShortDate(project.git.lastUpdated)}
									</span>
								)}
								{project.git.weeklyActivity?.length > 0 && (
									<ActivitySpark
										weeks={project.git.weeklyActivity}
									/>
								)}
							</div>
							{project.git.lastCommitMessage && (
								<p
									className="truncate text-muted-foreground/60"
									title={project.git.lastCommitMessage}
								>
									“{project.git.lastCommitMessage}”
								</p>
							)}
						</div>
					) : (
						<span className="text-[10px] font-mono text-muted-foreground/50">
							source on github
						</span>
					)}

					<div className="flex items-center gap-1">
						{project.github && (
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-9 items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								<Github className="size-3" />
								<span>repo</span>
							</a>
						)}
						{externalUrl && (
							<a
								href={externalUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-9 items-center gap-1.5 px-2 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
							>
								<ExternalLink className="size-3" />
								<span>open</span>
							</a>
						)}
					</div>
				</footer>
			)}
		</article>
	)
}

export function AfterHoursCatalog({ projects }: Props) {
	const doneCount = projects.filter(
		p => p.status === 'done' || p.status === 'active'
	).length
	const wipCount = projects.filter(p => p.status === 'wip').length

	return (
		<div className="space-y-0">
			<div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 px-4 py-3 md:px-5">
				<p className="text-[10px] font-mono tracking-tight text-muted-foreground/70">
					{projects.length} project{projects.length === 1 ? '' : 's'}
					{doneCount > 0 && (
						<>
							<span className="mx-1.5 text-muted-foreground/30">
								·
							</span>
							{doneCount} shipped
						</>
					)}
					{wipCount > 0 && (
						<>
							<span className="mx-1.5 text-muted-foreground/30">
								·
							</span>
							{wipCount} in progress
						</>
					)}
				</p>
				<Link
					href={profile.github.url as Route}
					target="_blank"
					rel="noopener noreferrer"
					className="text-[10px] font-mono tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
				>
					github.com/{profile.github.username}
				</Link>
			</div>

			<div className="border-t border-border">
				{projects.map((project, index) => (
					<ProjectEntry
						key={project.name}
						project={project}
						index={index}
					/>
				))}
			</div>

			{projects.length === 0 && (
				<p className="px-4 py-10 text-center text-sm text-muted-foreground md:px-5">
					No after-hours projects yet.
				</p>
			)}
		</div>
	)
}
