<script setup lang="ts">
import { site } from '~/data/site'

const { t } = useI18n()
const { courseSchema, organizationSchema, faqSchema } = useJsonLd()

useHead(() => ({
	script: [
		{ type: 'application/ld+json', innerHTML: JSON.stringify(courseSchema()) },
		{ type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema()) },
		{ type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema()) },
	],
}))

useSeoMeta({
	title: () => t('meta.title'),
	description: () => t('meta.description'),
	ogTitle: () => t('meta.title'),
	ogDescription: () => t('meta.description'),
	ogType: 'website',
	ogImage: `${site.siteUrl}${site.ogImage}`,
	twitterCard: 'summary_large_image',
	twitterTitle: () => t('meta.title'),
	twitterDescription: () => t('meta.description'),
	twitterImage: `${site.siteUrl}${site.ogImage}`,
})
</script>

<template>
	<div>
		<SectionHero />
		<SectionArchitecture />
		<SectionSignals />
		<SectionProtocol />
		<SectionFaq />
		<SectionCta />
		<SectionContact />
		<SectionRegister />
	</div>
</template>
