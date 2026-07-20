<script setup lang="ts">
defineProps<{ featureKey: string }>()
</script>

<template>
	<div class="flex flex-col items-start">
		<div class="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10">
			<div
				class="h-4 w-4 rounded-full bg-indigo-400 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
			/>
		</div>
		<h3 class="mt-2 text-lg font-light tracking-tighter text-neutral-200">
			{{ $t(`hero.features.${featureKey}.title`) }}
		</h3>
		<p class="mt-1 text-sm leading-snug text-neutral-500">
			{{ $t(`hero.features.${featureKey}.description`) }}
		</p>
	</div>
</template>
