// PLACEHOLDER DATA. Replace every value below before deploying to production.
// Nothing here is real: phone, email, Instagram, address, map, price, schedule,
// and start date are all invented for development. og-image.jpg must also be
// supplied at public/og-image.jpg (1200x630) before launch.
export const site = {
	phone: '+374 55 123 456',
	phoneHref: 'tel:+37455123456',
	email: 'info@forma3d.am',
	instagramHandle: '@forma3d.am',
	instagramUrl: 'https://instagram.com/forma3d.am',
	addressGeo: { lat: 40.1872, lng: 44.5152 },
	mapEmbedUrl:
		'https://www.google.com/maps?q=40.1872,44.5152&hl=en&z=16&output=embed',
	mapUrl: 'https://maps.google.com/?q=40.1872,44.5152',
	ogImage: '/og-image.jpg',
	siteUrl: 'https://forma3d.am',
	course: {
		priceAmd: 180000,
		durationMonths: 4,
		sessionsPerWeek: 2,
		sessionHours: 3,
		groupSizeMax: 8,
		nextStartDate: '2026-09-15',
	},
} as const
