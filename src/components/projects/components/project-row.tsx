'use client'

import { cn } from '@/shared/lib/cn'
import { formatShortDate } from '@/shared/lib/date'
import { ExternalLink, Eye, Github } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lazy, memo, Suspense, useState } from 'react'
import type { IProject } from '../types'
import { GitInfo } from './git-info'

const ProjectPreviewRenderer = lazy(() =>
	import('./project-preview').then(m => ({
		default: m.ProjectPreviewRenderer
	}))
)

type Props = {
	project: IProject
	isDesktop: boolean
	isExpanded: boolean
	onToggle: () => void
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

function getExternalUrl(project: IProject) {
	if (project.preview?.type === 'iframe') return project.preview.url
	return project.github || undefined
}

export const ProjectRow = memo(function ProjectRow({
	project,
	isDesktop,
	isExpanded,
	onToggle
}: Props) {
	const reduceMotion = useReducedMotion()
	const [hovered, setHovered] = useState(false)

	const isOpen = isDesktop ? hovered : isExpanded
	const externalUrl = getExternalUrl(project)
	const hasMediaPreview =
		project.preview?.type && project.preview.type !== 'none'
	const primaryTech = project.tech[0]
	const techSummary = project.tech.join(', ')
	const hasDetails =
		!!project.additionalDescription ||
		!!project.git ||
		hasMediaPreview ||
		project.tech.length > 0

	return (
		<div
			className="flex flex-col border-b border-border bg-card"
			onMouseEnter={() => {
				if (isDesktop) setHovered(true)
			}}
			onMouseLeave={() => {
				if (isDesktop) setHovered(false)
			}}
			onFocusCapture={() => {
				if (isDesktop) setHovered(true)
			}}
			onBlurCapture={event => {
				if (!isDesktop) return
				if (
					!event.currentTarget.contains(event.relatedTarget as Node)
				) {
					setHovered(false)
				}
			}}
		>
			<div
				className={cn(
					'group flex items-center justify-between px-2 sm:px-3 py-2',
					!isDesktop && 'cursor-pointer'
				)}
				onClick={() => {
					if (!isDesktop) onToggle()
				}}
				onKeyDown={event => {
					if (isDesktop) return
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault()
						onToggle()
					}
				}}
				role={!isDesktop ? 'button' : undefined}
				tabIndex={!isDesktop ? 0 : undefined}
				aria-expanded={!isDesktop ? isOpen : undefined}
				aria-label={
					!isDesktop
						? `${isOpen ? 'Collapse' : 'Expand'} ${project.name}`
						: undefined
				}
			>
				<div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 text-left">
					<span className="min-w-0 flex-1 text-sm font-medium text-foreground truncate md:flex-none md:max-w-[40%] md:transition-[max-width] md:duration-500 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:max-w-[55%] lg:max-w-[32%] lg:group-hover:max-w-[45%]">
						{project.name}
					</span>
					{!isOpen && (
						<span className="hidden min-w-0 flex-1 text-sm text-muted-foreground md:inline truncate">
							- {project.description}
						</span>
					)}
				</div>

				<div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-2">
					{project.status && (
						<span
							className={cn(
								'hidden text-[10px] uppercase tracking-wide sm:inline',
								project.status === 'wip'
									? 'text-amber-500/80'
									: 'text-muted-foreground/70'
							)}
						>
							{project.status}
						</span>
					)}
					{project.git?.lastUpdated && (
						<span className="hidden text-xs text-muted-foreground lg:inline">
							{formatShortDate(project.git.lastUpdated)}
						</span>
					)}
					{primaryTech && (
						<div
							className="hidden items-center overflow-hidden md:flex"
							title={techSummary}
						>
							<span
								className="bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground whitespace-nowrap shrink-0"
								aria-label={`Tech stack: ${techSummary}`}
							>
								{primaryTech}
							</span>
						</div>
					)}
					<div className="flex items-center">
						{hasDetails && !isDesktop && (
							<button
								type="button"
								onClick={event => {
									event.stopPropagation()
									onToggle()
								}}
								className={cn(
									'min-h-9 min-w-9 inline-flex items-center justify-center p-2 transition-colors duration-300',
									isOpen
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'
								)}
								style={{
									transitionTimingFunction:
										'cubic-bezier(0.16, 1, 0.3, 1)'
								}}
								aria-label={`Toggle ${project.name} details`}
							>
								<Eye className="h-3 w-3" />
							</button>
						)}
						{hasDetails && isDesktop && (
							<span
								className={cn(
									'min-h-9 min-w-9 inline-flex items-center justify-center p-2 transition-colors duration-300',
									isOpen
										? 'text-foreground'
										: 'text-muted-foreground'
								)}
								aria-hidden
							>
								<Eye className="h-3 w-3" />
							</span>
						)}
						{project.github && (
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="min-h-9 min-w-9 inline-flex items-center justify-center p-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
								style={{
									transitionTimingFunction:
										'cubic-bezier(0.16, 1, 0.3, 1)'
								}}
								aria-label={`View ${project.name} on GitHub`}
								onClick={event => event.stopPropagation()}
							>
								<Github className="h-3 w-3" />
							</a>
						)}
						{externalUrl && (
							<a
								href={externalUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="min-h-9 min-w-9 inline-flex items-center justify-center p-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
								style={{
									transitionTimingFunction:
										'cubic-bezier(0.16, 1, 0.3, 1)'
								}}
								aria-label={
									externalUrl === project.github
										? `Open ${project.name}`
										: `View ${project.name} demo`
								}
								onClick={event => event.stopPropagation()}
							>
								<ExternalLink className="h-3 w-3" />
							</a>
						)}
					</div>
				</div>
			</div>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={
							reduceMotion ? false : { height: 0, opacity: 0 }
						}
						animate={{ height: 'auto', opacity: 1 }}
						exit={
							reduceMotion ? undefined : { height: 0, opacity: 0 }
						}
						transition={{
							height: {
								duration: reduceMotion ? 0 : 0.45,
								ease: EASE_OUT_EXPO
							},
							opacity: {
								duration: reduceMotion ? 0 : 0.3,
								ease: EASE_OUT_EXPO
							}
						}}
						className="overflow-hidden"
					>
						<div className="border-t border-border bg-muted/20">
							{hasMediaPreview && (
								<Suspense
									fallback={
										<div className="h-[150px] flex items-center justify-center text-xs text-muted-foreground">
											Loading…
										</div>
									}
								>
									<ProjectPreviewRenderer
										preview={project.preview}
										name={project.name}
										isVisible={isOpen}
									/>
								</Suspense>
							)}

							<div className="space-y-3 px-2 sm:px-3 py-3">
								<p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
									{project.description}
								</p>

								{project.additionalDescription && (
									<p className="text-xs leading-relaxed text-muted-foreground/80">
										{project.additionalDescription}
									</p>
								)}

								<div className="flex flex-wrap gap-1">
									{project.tech.map(tech => (
										<span
											key={tech}
											className="bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground"
										>
											{tech}
										</span>
									))}
									{project.platforms?.map(platform => (
										<span
											key={platform}
											className="bg-secondary/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
										>
											{platform}
										</span>
									))}
								</div>

								{project.git && (
									<GitInfo git={project.git} expanded />
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
})
