export interface NavLink {
	key: 'course' | 'how' | 'faq' | 'contact'
	href: string
	icon: string
}

export const navLinks: NavLink[] = [
	{ key: 'course', href: '#course', icon: 'solar:box-minimalistic-linear' },
	{ key: 'how', href: '#how', icon: 'solar:route-linear' },
	{ key: 'faq', href: '#faq', icon: 'solar:question-circle-linear' },
	{ key: 'contact', href: '#contact', icon: 'solar:map-point-linear' },
]
