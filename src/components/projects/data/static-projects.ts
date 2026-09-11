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
		name: 'BlastRadius',
		description:
			'Dart and Flutter CLI that traces the blast radius of a change: callers, repositories, state managers, screens, and suggested tests.',
		additionalDescription:
			'Static analysis over the Dart analyzer. Trace a method, file, class, or git diff. Console, JSON, Markdown, and a local graph dashboard.',
		type: 'cli',
		status: 'beta',
		github: 'https://github.com/pratik97179/blastradius',
		tech: ['Dart', 'Analyzer', 'Flutter', 'React'],
		preview: { type: 'none' }
	},
	{
		name: 'Mac Observer',
		description:
			'Local macOS observability app that answers one question first: is my Mac okay?',
		additionalDescription:
			'Live Overview, Performance, Network, Processes, Storage, and Power. SQLite history stays on device, with an event timeline and explanation cards after memory, thermal, or CPU pressure.',
		type: 'desktop',
		status: 'wip',
		github: 'https://github.com/pratik97179/mac-observer',
		tech: ['Swift', 'SwiftUI', 'SQLite'],
		preview: { type: 'none' },
		platforms: ['macos']
	},
	{
		name: 'Packetworld',
		description:
			'Browser puzzle game about repairing imperfect networks. Place servers and cables, then watch packets find a path.',
		additionalDescription:
			'Handcrafted districts. Build the cheapest infrastructure that still meets the scenario. Networking as a mechanic, not a lecture.',
		type: 'game',
		status: 'wip',
		github: 'https://github.com/pratik97179/packetworld',
		tech: ['TypeScript', 'PixiJS', 'Vite'],
		preview: { type: 'none' }
	},
	{
		name: 'Airjam',
		description:
			'Live chord pad in the browser. Your hands pick the chord, voice the tones, and shape volume and brightness.',
		additionalDescription:
			'MediaPipe Hands and Tone.js. Palm in the center is rest; petals around it are chords. Nothing generates music for you.',
		type: 'ui',
		status: 'wip',
		github: 'https://github.com/pratik97179/airjam',
		tech: ['React', 'TypeScript', 'MediaPipe', 'Tone.js'],
		preview: { type: 'none' }
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
		name: 'Runtime',
		description:
			'First-person puzzle game where you write JavaScript at in-world terminals to rewire a facility.',
		additionalDescription:
			'Custom interpreter, carry and interact loop, physical power and door puzzles, and a generated industrial kit.',
		type: 'game',
		status: 'wip',
		tech: ['Unity', 'C#', 'JavaScript'],
		preview: { type: 'none' }
	}
]
