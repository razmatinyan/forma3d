export interface NavLink {
	key: 'courses' | 'how' | 'faq' | 'contact'
	href: string
	icon: string
}

export const navLinks: NavLink[] = [
	{ key: 'courses', href: '#courses', icon: 'solar:box-minimalistic-linear' },
	{ key: 'how', href: '#how', icon: 'solar:route-linear' },
	{ key: 'faq', href: '#faq', icon: 'solar:question-circle-linear' },
	{ key: 'contact', href: '#contact', icon: 'solar:map-point-linear' },
]
