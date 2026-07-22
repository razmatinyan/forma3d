<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		eyebrow?: string
		eyebrowStyle?: 'pill' | 'plain'
		title: string
		description?: string
		center?: boolean
	}>(),
	{ eyebrowStyle: 'plain', center: false },
)

const { gsap, SplitText } = useGSAP()
const heading = ref<HTMLHeadingElement | null>(null)
let split: InstanceType<typeof SplitText> | null = null
let tween: gsap.core.Tween | null = null

function reveal() {
	if (!heading.value) return
	tween?.scrollTrigger?.kill()
	split?.revert()

	split = new SplitText(heading.value, { type: 'words', mask: 'words' })
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

	tween = gsap.from(split.words, {
		yPercent: 110,
		opacity: 0,
		filter: 'blur(10px)',
		duration: 1.1,
		stagger: 0.055,
		ease: 'expo.out',
		clearProps: 'filter',
		scrollTrigger: { trigger: heading.value, start: 'top 90%' },
	})
}

onMounted(reveal)
watch(() => props.title, () => nextTick(reveal))

onBeforeUnmount(() => {
	tween?.scrollTrigger?.kill()
	split?.revert()
	split = null
})
</script>

<template>
	<div :class="center ? 'flex flex-col items-center text-center' : ''">
		<StatusPill v-if="eyebrow && eyebrowStyle === 'pill'" :label="eyebrow" pulse class="mb-6" />
		<p v-else-if="eyebrow" class="text-xs font-medium tracking-[0.32em] text-zinc-500">
			{{ eyebrow }}
		</p>
		<h2
			ref="heading"
			:class="[
				'font-normal text-3xl leading-[1.25] tracking-tighter text-white sm:text-4xl',
				eyebrow && eyebrowStyle === 'plain' ? 'mt-3' : '',
			]"
		>
			{{ title }}
		</h2>
		<p v-if="description" class="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
			{{ description }}
		</p>
	</div>
</template>
