import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@razmatinyan/nuxt-email',
		'@nuxtjs/i18n',
		'@nuxt/fonts',
		'@nuxt/icon',
		'shadcn-nuxt',
	],
	css: ['~/assets/css/tailwind.css'],
	email: {
		provider: 'console',
		from: 'App <noreply@myapp.com>',
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit'],
		},
	},
	fonts: {
		families: [
			{ name: 'Bebas Neue', provider: 'google', weights: [400] },
			{ name: 'Oswald', provider: 'google', weights: [400, 500, 600, 700] },
			{ name: 'Manrope', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
			{ name: 'Noto Sans Armenian', provider: 'google', weights: [400, 500, 600, 700, 800] },
		],
	},
	i18n: {
		locales: [
			{ code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
			{ code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' },
			{ code: 'hy', iso: 'hy-AM', file: 'hy.json', name: 'Հայերեն' },
		],
		defaultLocale: 'en',
		fallbackLocale: 'en',
		strategy: 'prefix_except_default',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},
})
