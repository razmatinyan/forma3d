export interface NavLink {
	key: 'model' | 'signals' | 'assets' | 'protocol'
	href: string
	icon: string
}

export const navLinks: NavLink[] = [
	{ key: 'model', href: '#model', icon: 'solar:box-minimalistic-linear' },
	{ key: 'signals', href: '#signals', icon: 'solar:chart-square-linear' },
	{ key: 'assets', href: '#assets', icon: 'solar:gallery-wide-linear' },
	{ key: 'protocol', href: '#protocol', icon: 'solar:code-square-linear' },
]
