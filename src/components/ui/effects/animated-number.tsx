'use client'

import React, {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState
} from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useStaggerLayer } from '../stagger-system'

interface AnimatedNumberContextType {
	registerNumber: (id: string, element: HTMLElement) => void
	unregisterNumber: (id: string) => void
	getStaggerDelay: (id: string) => number
}

const AnimatedNumberContext = createContext<AnimatedNumberContextType | null>(
	null
)

export function AnimatedNumberProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [numbers, setNumbers] = useState<
		Map<string, { element: HTMLElement; rect: DOMRect }>
	>(new Map())

	const registerNumber = (id: string, element: HTMLElement) => {
		const rect = element.getBoundingClientRect()
		setNumbers(prev => new Map(prev).set(id, { element, rect }))
	}

	const unregisterNumber = (id: string) => {
		setNumbers(prev => {
			const newMap = new Map(prev)
			newMap.delete(id)
			return newMap
		})
	}

	const getStaggerDelay = (id: string) => {
		const numberData = numbers.get(id)
		if (!numberData) return 0

		const sortedNumbers = Array.from(numbers.entries()).sort(
			([, a], [, b]) => {
				if (Math.abs(a.rect.top - b.rect.top) < 50) {
					return a.rect.left - b.rect.left
				}
				return a.rect.top - b.rect.top
			}
		)

		const index = sortedNumbers.findIndex(([key]) => key === id)
		return index * 100
	}

	return (
		<AnimatedNumberContext.Provider
			value={{ registerNumber, unregisterNumber, getStaggerDelay }}
		>
			{children}
		</AnimatedNumberContext.Provider>
	)
}

function useAnimatedNumberContext() {
	const context = useContext(AnimatedNumberContext)
	if (!context) {
		return {
			registerNumber: () => {},
			unregisterNumber: () => {},
			getStaggerDelay: () => 0
		}
	}
	return context
}

const DIGIT_SETS = 3
const DIGITS_PER_SET = 10
const TOTAL_DIGITS = DIGIT_SETS * DIGITS_PER_SET
const TARGET_SET_INDEX = 2
const STAGGER_DELAY_MS = 40
const GRADIENT_HEIGHT_PERCENT = 20
const INITIAL_BLUR_PX = 0.5

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

const DIGIT_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const DIGITS = Array.from(
	{ length: TOTAL_DIGITS },
	(_, i) => DIGIT_SEQUENCE[i % DIGIT_SEQUENCE.length]
)

type SlotDigitProps = {
	digit: number
	trigger: boolean
	duration: number
	delay?: number
	className?: string

		initialProgress?: number
}

function SlotDigit({
	digit,
	trigger,
	duration,
	delay = 0,
	className,
	initialProgress = 0
}: SlotDigitProps) {
	const targetDigitIndex = DIGIT_SEQUENCE.indexOf(digit)
	const targetOffset =
		(targetDigitIndex >= 0 ? targetDigitIndex : digit) +
		TARGET_SET_INDEX * DIGITS_PER_SET
	const itemHeightPercent = 100 / TOTAL_DIGITS

	const fullScrollDistance = 8
	const effectiveScrollDistance = Math.max(
		1,
		fullScrollDistance * (1 - initialProgress)
	)

	const initialOffset = targetOffset - effectiveScrollDistance

	const transformInitial = `translateY(-${targetOffset * itemHeightPercent}%)`
	const transformAnimating = `translateY(-${initialOffset * itemHeightPercent}%)`
	const transformTarget = `translateY(-${targetOffset * itemHeightPercent}%)`

	const [hasTriggered, setHasTriggered] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		if (trigger && !hasTriggered) {
			setHasTriggered(true)
			setIsAnimating(true)
			requestAnimationFrame(() => {
				setIsAnimating(false)
			})
		}
	}, [trigger, hasTriggered])

	const effectiveDuration = duration * (1 - initialProgress)

	let currentTransform = transformInitial
	if (hasTriggered) {
		currentTransform = isAnimating ? transformAnimating : transformTarget
	}

	return (
		<span
			className={`relative inline-flex justify-center overflow-hidden h-[1em] leading-none ${className || ''}`}
			style={{ width: '0.6em', minWidth: '0.6em' }}
		>
			<span className="invisible pointer-events-none">{digit}</span>

			<span
				className="absolute top-0 left-0 right-0 flex flex-col items-center will-change-transform"
				style={{
					transform: currentTransform,
					filter:
						hasTriggered && !isAnimating
							? 'blur(0px)'
							: `blur(${INITIAL_BLUR_PX}px)`,
					transition:
						hasTriggered && !isAnimating
							? `transform ${effectiveDuration}ms ${EASING} ${delay}ms, filter ${Math.min(effectiveDuration * 0.6, 300)}ms ease-out ${delay}ms`
							: 'none'
				}}
				aria-hidden="true"
			>
				{DIGITS.map((num, i) => (
					<span
						key={i}
						className="flex items-center justify-center mt-[.5px] h-[1em] leading-none select-none"
					>
						{num}
					</span>
				))}
			</span>

			<span
				className="absolute inset-x-0 top-0 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"
				style={{ height: `${GRADIENT_HEIGHT_PERCENT}%` }}
			/>
			<span
				className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"
				style={{ height: `${GRADIENT_HEIGHT_PERCENT}%` }}
			/>
		</span>
	)
}

type Props = {
	value: string | number
	className?: string
	duration?: number
		delay?: number
		immediate?: boolean
		group?: string
		priority?: number
		initialProgress?: number
		animateOnMount?: boolean
}

export function AnimatedNumber({
	value,
	className,
	duration = 600,
	delay: legacyDelay = 0,
	immediate = false,
	group,
	priority,
	initialProgress = 1,
	animateOnMount = false
}: Props) {
	const [isVisible, setIsVisible] = useState(immediate)
	const [isClient, setIsClient] = useState(false)
	const elementRef = useRef<HTMLSpanElement>(null)
	const stringValue = String(value)

	const useNewSystem = group !== undefined

	const stagger = useStaggerLayer<HTMLSpanElement>({
		group: group || 'numbers',
		priority: priority ?? (immediate ? -Infinity : Infinity),
		disabled: !useNewSystem
	})

	const id = `animated-number-${useId()}`
	const { registerNumber, unregisterNumber, getStaggerDelay } =
		useAnimatedNumberContext()

	const isInView = useInView(elementRef, { once: true, margin: '100px' })

	useEffect(() => {
		setIsClient(true)
	}, [])

	useEffect(() => {
		if (isClient && elementRef.current && !useNewSystem) {
			registerNumber(id, elementRef.current)
			return () => unregisterNumber(id)
		}
	}, [isClient, registerNumber, unregisterNumber, id, useNewSystem])

	useEffect(() => {
		if (!useNewSystem && (isInView || animateOnMount) && !immediate) {
			const delay = getStaggerDelay(id)
			setTimeout(() => {
				setIsVisible(true)
			}, delay)
		}
	}, [isInView, immediate, getStaggerDelay, id, useNewSystem])

	useEffect(() => {
		if (useNewSystem && stagger.isReady) {
			setTimeout(() => {
				setIsVisible(true)
			}, stagger.delay)
		}
	}, [useNewSystem, stagger.isReady, stagger.delay])

	const shouldReduceMotion = useReducedMotion()

	if (!isClient) {
		return (
			<span
				ref={elementRef}
				className={`inline-flex items-baseline tabular-nums ${className || ''}`}
				aria-label={stringValue}
				title={stringValue}
			>
				{stringValue}
			</span>
		)
	}

	if (shouldReduceMotion) {
		return (
			<span
				ref={
					useNewSystem
						? (stagger.ref as React.RefObject<HTMLSpanElement>)
						: elementRef
				}
				className={`inline-flex items-baseline tabular-nums ${className || ''}`}
				aria-label={stringValue}
				title={stringValue}
			>
				{stringValue}
			</span>
		)
	}

	const chars = stringValue.split('')
	let digitIndex = 0

	const effectiveDelay = useNewSystem ? 0 : legacyDelay

	return (
		<span
			ref={
				useNewSystem
					? (stagger.ref as React.RefObject<HTMLSpanElement>)
					: elementRef
			}
			className={`inline-flex items-baseline tabular-nums ${className || ''}`}
			aria-label={stringValue}
			title={stringValue}
		>
			<span className="sr-only">{stringValue}</span>

			<span className="inline-flex items-baseline" aria-hidden="true">
				{chars.map((char, i) => {
					if (/\d/.test(char)) {
						const currentDigitDuration = Math.min(
							duration + digitIndex * STAGGER_DELAY_MS,
							4000
						)

						return (
							<SlotDigit
								key={i}
								digit={parseInt(char, 10)}
								trigger={isVisible}
								duration={currentDigitDuration}
								delay={effectiveDelay}
								initialProgress={initialProgress}
							/>
						)
					}
					return <span key={i}>{char}</span>
				})}
			</span>
		</span>
	)
}
