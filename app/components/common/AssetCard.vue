<script setup lang="ts">
defineProps<{ itemKey: string; image: string }>()

const { gsap, motion } = useGSAP()
const imageEl = ref<HTMLImageElement | null>(null)

motion({ reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
	if (context.conditions.reduced || !imageEl.value) return
	gsap.fromTo(
		imageEl.value,
		{ yPercent: -12 },
		{
			yPercent: 12,
			ease: 'none',
			scrollTrigger: {
				trigger: imageEl.value.parentElement,
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		},
	)
})
</script>

<template>
	<article class="asset-card p-4">
		<div class="h-40 w-full overflow-hidden rounded-xl">
			<img
				ref="imageEl"
				:src="image"
				:alt="$t(`assets.items.${itemKey}.alt`)"
				width="640"
				height="256"
				loading="lazy"
				decoding="async"
				class="h-40 w-full scale-125 object-cover opacity-80 grayscale transition duration-500 hover:grayscale-0"
			>
		</div>
		<p data-reveal class="mt-4 text-xs font-medium uppercase tracking-widest text-zinc-300">
			{{ $t(`assets.items.${itemKey}.title`) }}
		</p>
		<p class="mt-2 break-all text-xs leading-5 text-zinc-600">
			{{ $t(`assets.items.${itemKey}.filename`) }}
		</p>
	</article>
</template>
