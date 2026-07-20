<script setup lang="ts">
defineProps<{ stepKey: string; index: number }>()
</script>

<template>
	<div class="protocol-row flex items-start gap-4 p-5 sm:p-6">
		<span
			class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-xs font-medium text-zinc-200"
			style="
				background: linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.035));
				box-shadow:
					inset 0 1px 0 rgba(255, 255, 255, 0.16),
					inset 0 -1px 0 rgba(0, 0, 0, 0.88);
			"
		>
			{{ String(index).padStart(2, '0') }}
		</span>
		<div>
			<h3 class="text-sm font-medium text-white">{{ $t(`protocol.steps.${stepKey}.title`) }}</h3>
			<p class="mt-1 text-xs leading-5 text-zinc-500">{{ $t(`protocol.steps.${stepKey}.description`) }}</p>
		</div>
	</div>
</template>
