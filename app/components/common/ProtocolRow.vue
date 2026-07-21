<script setup lang="ts">
withDefaults(defineProps<{ stepKey: string; index: number; params?: Record<string, unknown> }>(), {
	params: () => ({}),
})
</script>

<template>
	<div data-reveal class="protocol-row flex items-start gap-4 p-5 sm:p-6">
		<span
			class="step-badge flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xs font-medium text-zinc-200"
		>
			{{ String(index).padStart(2, '0') }}
		</span>
		<div>
			<h3 class="text-sm font-medium text-white">{{ $t(`how.steps.${stepKey}.title`) }}</h3>
			<p class="mt-1 text-xs leading-5 text-zinc-500">{{ $t(`how.steps.${stepKey}.description`, params) }}</p>
		</div>
	</div>
</template>
