import Image from 'next/image'
import type { Route } from 'next'
import Link from 'next/link'
import { Section } from '@/components/ui/section'
import {
	BreadcrumbStructuredData,
	PersonStructuredData
} from '@/components/seo/structured-data'
import { profile } from '@/core/config/profile'
import {
	GithubIcon,
	LinkedinIcon,
	MailIcon,
	MapPinIcon,
	BriefcaseIcon,
	GraduationCapIcon,
	CodeIcon
} from 'lucide-react'

const skills = [
	'Dart',
	'TypeScript',
	'JavaScript',
	'Kotlin',
	'Swift',
	'Flutter',
	'React',
	'Next.js',
	'React Native',
	'WebSockets',
	'Offline-first',
	'TDD',
	'Firebase',
	'Docker',
	'Web3Auth'
]

const socialLinks = [
	{
		name: 'GitHub',
		href: profile.github.url,
		icon: GithubIcon
	},
	{
		name: 'LinkedIn',
		href: profile.linkedin.url,
		icon: LinkedinIcon
	},
	{ name: 'Email', href: `mailto:${profile.email}`, icon: MailIcon }
]

export function AboutView() {
	return (
		<>
			<BreadcrumbStructuredData
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'About', url: '/about' }
				]}
			/>
			<PersonStructuredData />

			<div className="space-y-6">
				<header className="px-4 md:px-5">
					<div className="flex items-start gap-4 mb-6">
						<Image
							src={profile.avatarUrl}
							alt={`${profile.name} - ${profile.title}`}
							width={224}
							height={224}
							sizes="80px"
							priority
							className="w-20 h-20 rounded-full border-2 border-border/50 shadow-sm shrink-0"
						/>
						<div className="min-w-0">
							<h1 className="text-2xl font-semibold tracking-tight text-foreground">
								{profile.name}
							</h1>
							<p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
								<BriefcaseIcon className="size-3.5" />
								{profile.title}
							</p>
							<p className="text-sm text-muted-foreground/70 mt-0.5 flex items-center gap-1.5">
								<MapPinIcon className="size-3.5" />
								{profile.location}
							</p>
						</div>
					</div>

					<div className="flex gap-3 mb-6">
						{socialLinks.map(link => (
							<Link
								key={link.name}
								href={link.href as Route}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-none hover:bg-muted/50 transition-colors"
							>
								<link.icon className="size-3.5" />
								{link.name}
							</Link>
						))}
					</div>
				</header>

				<Section title="About Me" noHeaderMargin>
					<div className="px-4 pt-4 pb-6 space-y-4">
						<p className="text-sm text-muted-foreground/90 leading-relaxed">
							I'm{' '}
							<strong className="text-foreground">
								{profile.name}
							</strong>
							, a {profile.title.toLowerCase()} focused on
							real-time fintech and consumer products. With{' '}
							<strong className="text-foreground">
								{profile.yearsExperience} years
							</strong>{' '}
							of experience, I've shipped trading platforms,
							mobile apps with millions of downloads, and
							cross-platform systems across Flutter, React, and
							Next.js.
						</p>
						<p className="text-sm text-muted-foreground/90 leading-relaxed">
							{profile.extendedBio}
						</p>
						<p className="text-sm text-muted-foreground/90 leading-relaxed">
							Currently leading frontend at{' '}
							<strong className="text-foreground">
								First Demat
							</strong>
							, building real-time trading interfaces with custom
							WebSocket clients, binary packet decoding, and
							offline-first synchronization workflows.
						</p>
					</div>
				</Section>

				<Section title="Education" noHeaderMargin>
					<div className="px-4 pt-4 pb-6">
						<div className="flex items-start gap-3">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary border border-primary/20 mt-0.5">
								<GraduationCapIcon className="size-4" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-foreground">
									B.Tech in Information Technology
								</h3>
								<p className="text-xs text-muted-foreground/70 mt-0.5">
									Maharaja Agrasen Institute of Technology,
									GGSIPU
								</p>
								<p className="text-xs text-muted-foreground/50 mt-0.5">
									2017 — 2021
								</p>
							</div>
						</div>
					</div>
				</Section>

				<Section title="Skills & Technologies" noHeaderMargin>
					<div className="px-4 pt-4 pb-6">
						<div className="flex flex-wrap gap-2">
							{skills.map(skill => (
								<span
									key={skill}
									className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-muted-foreground bg-secondary/30 border border-transparent hover:border-border/50 rounded-md transition-colors"
								>
									<CodeIcon className="size-3" />
									{skill}
								</span>
							))}
						</div>
					</div>
				</Section>

				<Section title="Get In Touch" noHeaderMargin>
					<div className="px-4 pt-4 pb-6 space-y-3">
						<p className="text-sm text-muted-foreground/90 leading-relaxed">
							Interested in working together or just want to say
							hi? Feel free to reach out through any of the
							channels above, or check out my work on{' '}
							<Link
								href={profile.github.url as Route}
								className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
							>
								GitHub
							</Link>
							.
						</p>
						<p className="text-sm text-muted-foreground/90 leading-relaxed">
							You can also explore my{' '}
							<Link
								href="/blog"
								className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
							>
								blog
							</Link>{' '}
							where I write about engineering, mobile
							development, and building production systems.
						</p>
					</div>
				</Section>
			</div>
		</>
	)
}
