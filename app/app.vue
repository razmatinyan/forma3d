<script setup lang="ts">
const { locale } = useI18n()

useHead({
	htmlAttrs: { lang: locale },
})

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
