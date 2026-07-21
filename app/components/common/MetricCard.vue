<script setup lang="ts">
withDefaults(
	defineProps<{ metricKey: string; icon: string; last?: boolean; params?: Record<string, unknown> }>(),
	{ last: false, params: () => ({}) },
)
</script>

<template>
	<article
		data-reveal
		:class="['metric-card p-5 sm:p-6', last ? '' : 'border-b border-white/10 sm:border-b-0 sm:border-r']"
	>
		<Icon :name="icon" class="text-2xl text-zinc-300" />
		<p class="mt-5 text-xs tracking-widest text-zinc-500">
			{{ $t(`facts.metrics.${metricKey}.label`) }}
		</p>
		<p class="mt-2 text-3xl font-normal tracking-tight text-white">
			{{ $t(`facts.metrics.${metricKey}.value`, params) }}
		</p>
		<p class="mt-2 text-xs leading-5 text-zinc-500">
			{{ $t(`facts.metrics.${metricKey}.caption`, params) }}
		</p>
	</article>
</template>
