<script setup lang="ts">
const { locale } = useI18n()

useHead({
	htmlAttrs: { lang: locale },
})

const { gsap, ScrollTrigger } = useGSAP()

onMounted(() => {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	gsap.set('[data-reveal]', { opacity: 0, y: 24 })
	ScrollTrigger.batch('[data-reveal]', {
		start: 'top 92%',
		once: true,
		onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }),
	})
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
