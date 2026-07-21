import { profile } from '@/core/config/profile'
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${profile.name} - ${profile.title}`,
		short_name: profile.name,
		description: profile.bio,
		start_url: '/',
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon'
			},
			{
				src: '/favicon.svg',
				sizes: 'any',
				type: 'image/svg+xml'
			},
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png'
			},
			{
				src: '/icon-512-maskable.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable'
			}
		]
	}
}
