<script setup lang="ts">
withDefaults(
	defineProps<{
		as?: string
		variant?: 'hero' | 'panel' | 'soft'
		overflow?: boolean
	}>(),
	{ as: 'section', variant: 'panel', overflow: false },
)

const { gsap, motion } = useGSAP()
const root = ref<HTMLElement | null>(null)

motion({ reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
	if (context.conditions.reduced || !root.value) return
	gsap.from(root.value, {
		y: 28,
		opacity: 0,
		duration: 0.9,
		ease: 'power3.out',
		scrollTrigger: { trigger: root.value, start: 'top 85%' },
	})
})
</script>

<template>
	<component
		:is="as"
		ref="root"
		:class="[
			'frame-section relative border border-white/10',
			overflow ? 'overflow-hidden' : '',
			variant === 'hero' ? 'surface-hero' : variant === 'soft' ? 'surface-soft' : 'surface-panel',
		]"
	>
		<template v-if="variant === 'hero'">
			<span
				class="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l border-t border-indigo-500/40"
			/>
			<span
				class="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r border-t border-indigo-500/40"
			/>
			<span
				class="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b border-l border-indigo-500/40"
			/>
			<span
				class="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b border-r border-indigo-500/40"
			/>
			<div class="absolute left-4 top-4 h-2 w-2 bg-indigo-500/50" />
			<div class="absolute right-4 top-4 h-2 w-2 bg-indigo-500/50" />
			<div class="absolute bottom-4 left-4 h-2 w-2 bg-indigo-500/50" />
			<div class="absolute bottom-4 right-4 h-2 w-2 bg-indigo-500/50" />
		</template>
		<template v-else>
			<span class="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-zinc-300/40" />
			<span class="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r border-t border-zinc-300/40" />
			<span
				class="pointer-events-none absolute bottom-0 left-0 h-8 w-8 border-b border-l border-zinc-300/40"
			/>
			<span
				class="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-zinc-300/40"
			/>
		</template>
		<slot />
	</component>
</template>
