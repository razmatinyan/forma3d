// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@razmatinyan/nuxt-email',
		'@nuxtjs/i18n',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxtjs/tailwindcss',
	],
	email: {
		provider: 'console',
		from: 'App <noreply@myapp.com>',
	},
	vite: {
		optimizeDeps: {
			include: ['@vue/devtools-core', '@vue/devtools-kit'],
		},
	},
	i18n: {
		locales: [
			{ code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
			{ code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' },
			{ code: 'hy', iso: 'hy-AM', file: 'hy.json', name: 'Հայերեն' },
		],
		defaultLocale: 'hy',
		strategy: 'prefix_except_default',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},
})
