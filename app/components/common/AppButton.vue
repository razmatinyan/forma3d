<script setup lang="ts">
withDefaults(
	defineProps<{
		href?: string
		variant?: 'solid' | 'ghost'
		size?: 'sm' | 'lg' | 'xl'
		icon?: string
		type?: 'button' | 'submit'
		disabled?: boolean
	}>(),
	{ variant: 'ghost', size: 'sm' },
)

const sizes = {
	sm: { box: 'h-10 rounded-lg px-4 text-xs', icon: 'text-base' },
	lg: { box: 'h-12 rounded-xl px-5 text-xs', icon: 'text-lg' },
	xl: { box: 'h-14 rounded-xl px-7 text-sm', icon: 'text-xl' },
} as const
</script>

<template>
	<component
		:is="href ? 'a' : 'button'"
		:href="href"
		:type="href ? undefined : (type ?? 'button')"
		:disabled="href ? undefined : disabled"
		:class="[
			'inline-flex items-center justify-center gap-2 border font-medium tracking-widest',
			'outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
			'disabled:cursor-not-allowed disabled:opacity-60',
			sizes[size].box,
			variant === 'solid'
				? 'btn-solid border-white/20 text-black'
				: 'btn-ghost border-white/10 text-zinc-300 transition hover:border-white/25 hover:text-white',
		]"
	>
		<slot />
		<Icon v-if="icon" :name="icon" :class="sizes[size].icon" />
	</component>
</template>
