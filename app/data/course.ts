import { site } from './site'

export interface HeroFeatureItem {
	key: 'groups' | 'portfolio'
}

export const heroFeatures: HeroFeatureItem[] = [{ key: 'groups' }, { key: 'portfolio' }]

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

export const heroCourseLoadRows: { key: 'modeling' | 'materials' | 'post'; width: string; tone: string }[] = [
	{ key: 'modeling', width: 'w-9/12', tone: 'bg-zinc-200' },
	{ key: 'materials', width: 'w-6/12', tone: 'bg-zinc-400' },
	{ key: 'post', width: 'w-7/12', tone: 'bg-zinc-300' },
]

export const heroStats: { key: 'duration' | 'format' | 'groupSize' | 'certificate' }[] = [
	{ key: 'duration' },
	{ key: 'format' },
	{ key: 'groupSize' },
	{ key: 'certificate' },
]

export interface CourseModuleItem {
	key: 'modeling' | 'materials' | 'rendering' | 'post'
	icon: string
	colSpan: 5 | 7
	border: string
}

export const courseModules: CourseModuleItem[] = [
	{ key: 'modeling', icon: 'solar:cube-linear', colSpan: 5, border: 'border-b border-white/10 md:border-r' },
	{ key: 'materials', icon: 'solar:lightbulb-linear', colSpan: 7, border: 'border-b border-white/10' },
	{
		key: 'rendering',
		icon: 'solar:camera-linear',
		colSpan: 7,
		border: 'border-b border-white/10 md:border-b-0 md:border-r',
	},
	{ key: 'post', icon: 'solar:magic-stick-3-linear', colSpan: 5, border: '' },
]

export const courseFacts: { key: 'groupSize' | 'duration' | 'certificate'; icon: string }[] = [
	{ key: 'groupSize', icon: 'solar:users-group-rounded-linear' },
	{ key: 'duration', icon: 'solar:clock-circle-linear' },
	{ key: 'certificate', icon: 'solar:diploma-linear' },
]

export const enrollmentSteps: { key: 'apply' | 'call' | 'confirm' | 'start' }[] = [
	{ key: 'apply' },
	{ key: 'call' },
	{ key: 'confirm' },
	{ key: 'start' },
]

export const faqItems: { key: string }[] = [
	{ key: 'experience' },
	{ key: 'software' },
	{ key: 'schedule' },
	{ key: 'groupSize' },
	{ key: 'certificate' },
	{ key: 'payment' },
]

export interface CourseOption {
	value: string
	key: string
}

export const courseOptions: CourseOption[] = [{ value: '3ds-max-photoshop', key: 'threeDsMaxPhotoshop' }]

export const contactRows: { key: 'phone' | 'email' | 'instagram' | 'address'; icon: string; href: string; value?: string }[] = [
	{ key: 'phone', icon: 'solar:phone-linear', href: site.phoneHref, value: site.phone },
	{ key: 'email', icon: 'solar:letter-linear', href: `mailto:${site.email}`, value: site.email },
	{ key: 'instagram', icon: 'solar:hashtag-linear', href: site.instagramUrl, value: site.instagramHandle },
	{ key: 'address', icon: 'solar:map-point-linear', href: site.mapUrl },
]

export const footerContactLinks: { key: 'phone' | 'email' | 'instagram'; href: string; icon: string }[] = [
	{ key: 'phone', href: site.phoneHref, icon: 'solar:phone-linear' },
	{ key: 'email', href: `mailto:${site.email}`, icon: 'solar:letter-linear' },
	{ key: 'instagram', href: site.instagramUrl, icon: 'solar:hashtag-linear' },
]
