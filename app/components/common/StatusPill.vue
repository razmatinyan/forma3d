<script setup lang="ts">
withDefaults(defineProps<{ label: string; pulse?: boolean }>(), { pulse: false })
</script>

<template>
	<div
		class="bezel inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium uppercase tracking-widest text-zinc-400"
	>
		<span
			:class="[
				'h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_1rem_rgba(129,140,248,0.65)]',
				pulse ? 'animate-pulse' : '',
			]"
		/>
		{{ label }}
	</div>
</template>
