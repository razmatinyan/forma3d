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

	// the marked element is the trigger, its children are what actually move.
	// animating the card itself shifts its borders and breaks the grid lines.
	gsap.set('[data-reveal] > *', { ...revealFrom, willChange: 'transform, filter, opacity' })
	ScrollTrigger.batch('[data-reveal]', {
		start: 'top 92%',
		once: true,
		onEnter: batch => batch.forEach((el, i) => gsap.to(el.children, {
			...revealTo,
			stagger: 0.05,
			delay: i * 0.04,
			clearProps: 'willChange,filter',
		})),
	})
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
