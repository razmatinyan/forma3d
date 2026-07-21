<script setup lang="ts">
const i18nHead = useLocaleHead()

useHead(() => ({
	htmlAttrs: i18nHead.value.htmlAttrs,
	link: i18nHead.value.link,
	meta: i18nHead.value.meta,
}))

const { gsap, ScrollTrigger, revealFrom, revealTo } = useGSAP()

onMounted(() => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	gsap.set('[data-reveal]', { ...revealFrom, willChange: 'transform, filter, opacity' })
	ScrollTrigger.batch('[data-reveal]', {
		start: 'top 92%',
		once: true,
		onEnter: batch => gsap.to(batch, {
			...revealTo,
			stagger: 0.08,
			clearProps: 'willChange,filter',
		}),
	})
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
