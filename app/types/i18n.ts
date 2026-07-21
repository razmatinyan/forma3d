import nuxtConfig from '~~/nuxt.config'

type I18nLocales = typeof nuxtConfig.i18n.locales
export type LocaleCode = I18nLocales[number]['code']
