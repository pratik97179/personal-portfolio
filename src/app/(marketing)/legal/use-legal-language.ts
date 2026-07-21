'use client'

import { useCallback, useEffect, useState } from 'react'
import { LegalLanguage } from './legal-language'
import {
	readLanguage,
	readStoredLanguage,
	storeLanguage
} from './language-utils'

function languageFromWindow(): LegalLanguage | null {
	if (typeof window === 'undefined') return null
	return readLanguage(new URLSearchParams(window.location.search))
}

function writeLanguageToUrl(language: LegalLanguage) {
	if (typeof window === 'undefined') return
	const url = new URL(window.location.href)
	if (language === 'en') {
		url.searchParams.delete('lang')
	} else {
		url.searchParams.set('lang', language)
	}
	const next = `${url.pathname}${url.search}${url.hash}`
	window.history.replaceState(window.history.state, '', next)
}

export function useLegalLanguage() {
	const [language, setLanguageState] = useState<LegalLanguage>('en')

	useEffect(() => {
		const fromUrl = languageFromWindow()
		const initial = fromUrl ?? readStoredLanguage() ?? 'en'
		setLanguageState(initial)
		storeLanguage(initial)
		if (!fromUrl && initial !== 'en') {
			writeLanguageToUrl(initial)
		}

		function onPopState() {
			const next = languageFromWindow() ?? 'en'
			setLanguageState(next)
			storeLanguage(next)
		}

		window.addEventListener('popstate', onPopState)
		return () => window.removeEventListener('popstate', onPopState)
	}, [])

	const setLanguage = useCallback((next: LegalLanguage) => {
		setLanguageState(prev => (prev === next ? prev : next))
		storeLanguage(next)
		writeLanguageToUrl(next)
	}, [])

	return { language, setLanguage }
}
