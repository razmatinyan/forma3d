import { site } from './site'

// no 3ds Max glyph exists in iconify, autodesk is the vendor mark
export const programIcons = {
	threeDsMax: 'simple-icons:autodesk',
	photoshop: 'simple-icons:adobephotoshop',
} as const

export type ProgramKey = keyof typeof programIcons

export type CourseStatus = 'open' | 'soon'

export interface CourseItem {
	key: 'threeDsMax' | 'archviz' | 'gamedev'
	status: CourseStatus
	icon: string
	featured: boolean
}

export const courses: CourseItem[] = [
	{ key: 'threeDsMax', status: 'open', icon: programIcons.threeDsMax, featured: true },
	{ key: 'archviz', status: 'soon', icon: 'solar:buildings-2-linear', featured: false },
	{ key: 'gamedev', status: 'soon', icon: 'solar:gamepad-linear', featured: false },
]

export interface HeroFeatureItem {
	key: 'groups' | 'portfolio'
}

export const heroFeatures: HeroFeatureItem[] = [{ key: 'groups' }, { key: 'portfolio' }]

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
	{ key: 'modeling', icon: programIcons.threeDsMax, colSpan: 5, border: 'border-b border-white/10 md:border-r' },
	{ key: 'materials', icon: 'solar:lightbulb-linear', colSpan: 7, border: 'border-b border-white/10' },
	{
		key: 'rendering',
		icon: 'solar:camera-linear',
		colSpan: 7,
		border: 'border-b border-white/10 md:border-b-0 md:border-r',
	},
	{ key: 'post', icon: programIcons.photoshop, colSpan: 5, border: '' },
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

export function getFaqParams(price: string): Record<string, Record<string, unknown>> {
	return {
		schedule: { sessions: site.course.sessionsPerWeek, hours: site.course.sessionHours },
		groupSize: { max: site.course.groupSizeMax },
		payment: { price },
	}
}

export interface CourseOption {
	value: string
	key: string
	icon: string
}

export const courseOptions: CourseOption[] = [
	{ value: '3ds-max-photoshop', key: 'threeDsMax', icon: programIcons.threeDsMax },
]

export const coursePrograms: { key: ProgramKey; icon: string }[] = [
	{ key: 'threeDsMax', icon: programIcons.threeDsMax },
	{ key: 'photoshop', icon: programIcons.photoshop },
]

export const contactRows: { key: 'phone' | 'email' | 'instagram' | 'address'; icon: string; href: string; value?: string }[] = [
	{ key: 'phone', icon: 'solar:phone-linear', href: site.phoneHref, value: site.phone },
	{ key: 'email', icon: 'solar:letter-linear', href: `mailto:${site.email}`, value: site.email },
	{ key: 'instagram', icon: 'solar:hashtag-linear', href: site.instagramUrl, value: site.instagramHandle },
	{ key: 'address', icon: 'solar:map-point-linear', href: site.mapUrl },
]

export const footerContactLinks: { key: 'phone' | 'email' | 'instagram'; href: string; icon: string; value: string }[] = [
	{ key: 'phone', href: site.phoneHref, icon: 'solar:phone-linear', value: site.phone },
	{ key: 'email', href: `mailto:${site.email}`, icon: 'solar:letter-linear', value: site.email },
	{ key: 'instagram', href: site.instagramUrl, icon: 'solar:hashtag-linear', value: site.instagramHandle },
]
