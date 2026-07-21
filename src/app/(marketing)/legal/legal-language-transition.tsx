'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { LegalLanguage } from './legal-language'

const EASE = [0.23, 1, 0.32, 1] as const

export function LegalLanguageTransition({
	language,
	children
}: {
	language: LegalLanguage
	children: ReactNode
}) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={language}
				initial={
					shouldReduceMotion
						? { opacity: 0 }
						: { opacity: 0, y: 10 }
				}
				animate={
					shouldReduceMotion
						? { opacity: 1 }
						: { opacity: 1, y: 0 }
				}
				exit={
					shouldReduceMotion
						? { opacity: 0 }
						: { opacity: 0, y: -10 }
				}
				transition={{ duration: 0.35, ease: EASE }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
