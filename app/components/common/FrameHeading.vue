<script setup lang="ts">
withDefaults(
	defineProps<{
		eyebrow: string
		eyebrowStyle?: 'pill' | 'plain'
		title: string
		description?: string
	}>(),
	{ eyebrowStyle: 'plain' },
)
</script>

<template>
	<div>
		<StatusPill v-if="eyebrowStyle === 'pill'" :label="eyebrow" pulse class="mb-6" />
		<p v-else class="text-xs font-medium uppercase tracking-[0.32em] text-zinc-500">
			{{ eyebrow }}
		</p>
		<h2
			:class="[
				'font-heading font-normal text-3xl tracking-tighter text-white sm:text-4xl',
				eyebrowStyle === 'plain' ? 'mt-3' : '',
			]"
		>
			{{ title }}
		</h2>
		<p v-if="description" class="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
			{{ description }}
		</p>
	</div>
</template>
