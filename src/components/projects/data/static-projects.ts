import type { IProject } from '../types'

export const STATIC_PROJECTS: IProject[] = [
	{
		name: 'AirCursor',
		description:
			'Hands-free macOS cursor control from a laptop webcam, using MediaPipe hand tracking and OpenCV.',
		additionalDescription:
			'Right hand drives the pointer and scroll; left hand handles click, drag, right-click, and Spaces switching. Built in public with Python and uv.',
		type: 'desktop',
		status: 'wip',
		github: 'https://github.com/pratik97179/aircursor',
		tech: ['Python', 'OpenCV', 'MediaPipe', 'PyObjC'],
		preview: { type: 'none' },
		platforms: ['macos']
	},
	{
		name: 'ws_client',
		description:
			'High-performance Dart WebSocket client for HFT and scalper terminals, with sequencing, batching, and a sync hot path.',
		additionalDescription:
			'Automatic reconnection, pub/sub, RPC with correlation IDs, connection metrics, and native/web transports.',
		type: 'utility',
		status: 'done',
		github: 'https://github.com/pratik97179/ws_client',
		tech: ['Dart', 'WebSocket', 'Flutter'],
		preview: { type: 'none' }
	},
	{
		name: 'dependency_inj',
		description:
			'Flutter/Dart service-locator module that wraps GetIt behind an app-owned IServiceLocator boundary.',
		additionalDescription:
			'Covers singleton/factory/lazy lifetimes, environment-aware config, injectable integration, and test-friendly mocking without leaking GetIt into features.',
		type: 'utility',
		status: 'done',
		github: 'https://github.com/pratik97179/dependency_inj',
		tech: ['Flutter', 'Dart', 'GetIt'],
		preview: { type: 'none' }
	}
]
