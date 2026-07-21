import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type BackgroundDirection = 'default' | 'horizontal' | 'vertical' | 'diagonal'
type ColorPattern = 'light' | 'dark'

interface HeadingProps {
	title: string
	icon?: LucideIcon
	headerAction?: ReactNode
	className?: string
		noMargin?: boolean
		padding?: string
		backgroundColor?: string
		borderColor?: string
		bgDirection?: BackgroundDirection
		colorPattern?: ColorPattern
		hueOverlay?: boolean
		animateStripes?: boolean
}

export function Heading({
	title,
	icon: Icon,
	headerAction,
	className = '',
	noMargin = false,
	padding,
	backgroundColor,
	borderColor,
	bgDirection = 'default',
	colorPattern = 'light',
	hueOverlay = false,
	animateStripes = false
}: HeadingProps) {
	const bgDirectionClasses = {
		default: '',
		horizontal: 'bg-gradient-to-r',
		vertical: 'bg-gradient-to-b',
		diagonal: 'bg-gradient-to-br'
	}

	const colorPatternClasses = {
		light: {
			from: 'from-background/50',
			via: 'via-background/30',
			to: 'to-background/10'
		},
		dark: {
			from: 'from-background/80',
			via: 'via-background/60',
			to: 'to-background/40'
		}
	}

	const bgClasses = bgDirectionClasses[bgDirection]
	const colorClasses = colorPatternClasses[colorPattern]
	const customBackground = backgroundColor
		? backgroundColor
		: bgDirection !== 'default'
			? `${bgClasses} ${colorClasses.from} ${colorClasses.via} ${colorClasses.to}`
			: ''

	const headerClasses = [
		'w-full',
		'overflow-hidden',
		'full-width-header',
		noMargin && '!mb-0',
		customBackground,
		hueOverlay && 'hue-overlay',
		animateStripes && 'animate-pattern-flow',
		className
	]
		.filter(Boolean)
		.join(' ')

	const containerClasses = [
		'header-content-container',
		'flex',
		'items-center',
		'justify-between',
		'header-content-container--with-padding',
		padding || '',
		'max-w-screen-xl',
		'mx-auto',
		'px-4'
	]
		.filter(Boolean)
		.join(' ')

	const customStyle: CSSProperties = borderColor
		? {
				borderTopColor: borderColor,
				borderBottomColor: borderColor
			}
		: {}

	return (
		<div className={headerClasses} style={customStyle}>
			<div className={containerClasses}>
				<h2 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
					{Icon && <Icon className="size-4" />}
					{title}
				</h2>
				{headerAction && (
					<div className="flex items-center gap-2">
						{headerAction}
					</div>
				)}
			</div>
		</div>
	)
}
