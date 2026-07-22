export interface NavLink {
	key: 'courses' | 'how' | 'faq' | 'contact'
	href: string
}

export const navLinks: NavLink[] = [
	{ key: 'courses', href: '/#courses' },
	{ key: 'how', href: '/#how' },
	{ key: 'faq', href: '/#faq' },
	{ key: 'contact', href: '/#contact' },
]
