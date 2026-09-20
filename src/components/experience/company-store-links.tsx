'use client'

import type { ReactNode } from 'react'
import { SiAndroid, SiApple } from 'react-icons/si'
import { cn } from '@/shared/lib/cn'

export type StoreLinks = {
	apple?: string
	android?: string
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function StoreBadge({
	href,
	label,
	children
}: {
	href: string
	label: string
	children: ReactNode
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			title={label}
			onClick={event => event.stopPropagation()}
			className={cn(
				'inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card text-muted-foreground',
				'transition-[background-color,border-color,color,transform] duration-300',
				'hover:border-brand-500 hover:bg-brand-500 hover:text-background',
				'active:scale-95',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
			)}
			style={{ transitionTimingFunction: EASE }}
		>
			{children}
		</a>
	)
}

export function CompanyStoreLinks({ links }: { links?: StoreLinks }) {
	if (!links?.apple && !links?.android) return null

	return (
		<span className="ml-2 inline-flex items-center gap-1.5">
			{links.apple ? (
				<StoreBadge href={links.apple} label="Open on the App Store">
					<SiApple className="size-4" aria-hidden />
				</StoreBadge>
			) : null}
			{links.android ? (
				<StoreBadge href={links.android} label="Open on Google Play">
					<SiAndroid className="size-4" aria-hidden />
				</StoreBadge>
			) : null}
		</span>
	)
}
