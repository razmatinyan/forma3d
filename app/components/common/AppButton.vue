<script setup lang="ts">
withDefaults(
	defineProps<{
		href?: string
		variant?: 'solid' | 'ghost'
		size?: 'sm' | 'lg'
		icon?: string
	}>(),
	{ href: '#', variant: 'ghost', size: 'sm' },
)
</script>

<template>
	<a
		:href="href"
		:class="[
			'inline-flex items-center justify-center gap-2 border text-xs font-medium uppercase tracking-widest',
			size === 'lg' ? 'h-12 rounded-xl px-5' : 'h-10 rounded-lg px-4',
			variant === 'solid'
				? 'btn-solid border-white/20 text-black'
				: 'btn-ghost border-white/10 text-zinc-300 transition hover:border-white/25 hover:text-white',
		]"
	>
		<slot />
		<Icon v-if="icon" :name="icon" :class="size === 'lg' ? 'text-lg' : 'text-base'" />
	</a>
</template>
