export interface HeroFeatureItem {
	key: 'latency' | 'topology'
}

export const heroFeatures: HeroFeatureItem[] = [{ key: 'latency' }, { key: 'topology' }]

export interface HeroOperator {
	key: 'maya' | 'theo' | 'ilya'
	image: string
}

export const heroOperators: HeroOperator[] = [
	{ key: 'maya', image: '/operators/maya.png' },
	{ key: 'theo', image: '/operators/theo.png' },
	{ key: 'ilya', image: '/operators/ilya.png' },
]

export const heroSyncMeshBars: { height: string; tone: string }[] = [
	{ height: 'h-8', tone: 'bg-zinc-300/70' },
	{ height: 'h-6 self-end', tone: 'bg-zinc-500/70' },
	{ height: 'h-10 self-end', tone: 'bg-zinc-200/80' },
	{ height: 'h-5 self-end', tone: 'bg-zinc-600/70' },
	{ height: 'h-9 self-end', tone: 'bg-zinc-400/80' },
	{ height: 'h-7 self-end', tone: 'bg-zinc-500/70' },
	{ height: 'h-11 self-end', tone: 'bg-zinc-200/80' },
	{ height: 'h-4 self-end', tone: 'bg-zinc-700' },
]

export const heroCanvasLoadRows: { key: 'notes' | 'media' | 'tasks'; width: string; tone: string }[] = [
	{ key: 'notes', width: 'w-9/12', tone: 'bg-zinc-200' },
	{ key: 'media', width: 'w-6/12', tone: 'bg-zinc-400' },
	{ key: 'tasks', width: 'w-8/12', tone: 'bg-zinc-300' },
]

export const heroStats: { key: 'grid' | 'vectors' | 'assets' | 'revision' }[] = [
	{ key: 'grid' },
	{ key: 'vectors' },
	{ key: 'assets' },
	{ key: 'revision' },
]

export interface ArchitectureCardItem {
	key: 'lattice' | 'consensus' | 'access' | 'audit'
	icon: string
	colSpan: 5 | 7
	border: string
}

export const architectureCards: ArchitectureCardItem[] = [
	{ key: 'lattice', icon: 'lucide:shield', colSpan: 5, border: 'border-b border-white/10 md:border-r' },
	{ key: 'consensus', icon: 'lucide:network', colSpan: 7, border: 'border-b border-white/10' },
	{
		key: 'access',
		icon: 'lucide:users',
		colSpan: 7,
		border: 'border-b border-white/10 md:border-b-0 md:border-r',
	},
	{ key: 'audit', icon: 'lucide:file-text', colSpan: 5, border: '' },
]

export const signalsMetrics: { key: 'collaborators' | 'routes' | 'time'; icon: string }[] = [
	{ key: 'collaborators', icon: 'solar:users-group-rounded-linear' },
	{ key: 'routes', icon: 'solar:branching-paths-up-linear' },
	{ key: 'time', icon: 'solar:clock-circle-linear' },
]

export interface AssetItem {
	key: 'abstractWave' | 'glassHabitat' | 'pyramidStudy' | 'studioSubject' | 'duskWaveform'
	image: string
	tags: string[]
}

export const assetItems: AssetItem[] = [
	{ key: 'abstractWave', image: '/assets/abstract-wave.jpg', tags: ['wave', 'abstract', 'neon', 'light'] },
	{
		key: 'glassHabitat',
		image: '/assets/glass-habitat.png',
		tags: ['villa', 'glass', 'habitat', 'architecture', 'dusk'],
	},
	{ key: 'pyramidStudy', image: '/assets/pyramid-study.png', tags: ['pyramid', 'futuristic', 'grayscale'] },
	{
		key: 'studioSubject',
		image: '/assets/studio-subject.png',
		tags: ['studio', 'portrait', 'headshot', 'subject'],
	},
	{ key: 'duskWaveform', image: '/assets/dusk-waveform.png', tags: ['wave', 'waveform', 'dusk', 'blue'] },
]

export const protocolSteps: { key: 'capture' | 'connect' | 'export' }[] = [
	{ key: 'capture' },
	{ key: 'connect' },
	{ key: 'export' },
]

export const deploymentIcons: string[] = [
	'solar:server-square-update-linear',
	'solar:code-square-linear',
	'solar:cloud-upload-linear',
]

export const footerCompanyLinks: { key: 'about' | 'changelog' | 'careers' | 'contact'; href: string }[] = [
	{ key: 'about', href: '#' },
	{ key: 'changelog', href: '#' },
	{ key: 'careers', href: '#' },
	{ key: 'contact', href: '#' },
]
