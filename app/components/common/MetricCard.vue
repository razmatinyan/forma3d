<script setup lang="ts">
withDefaults(defineProps<{ metricKey: string; icon: string; last?: boolean }>(), { last: false })
</script>

<template>
	<article
		data-reveal
		:class="['metric-card p-5 sm:p-6', last ? '' : 'border-b border-white/10 sm:border-b-0 sm:border-r']"
	>
		<Icon :name="icon" class="text-2xl text-zinc-300" />
		<p class="mt-5 text-xs uppercase tracking-widest text-zinc-500">
			{{ $t(`signals.metrics.${metricKey}.label`) }}
		</p>
		<p class="mt-2 text-3xl font-normal tracking-tight text-white">
			{{ $t(`signals.metrics.${metricKey}.value`) }}
		</p>
		<p class="mt-2 text-xs leading-5 text-zinc-500">
			{{ $t(`signals.metrics.${metricKey}.caption`) }}
		</p>
	</article>
</template>
