<script setup lang="ts">
defineProps<{ moduleKey: string; icon: string; colSpan: 5 | 7; border: string }>()
</script>

<template>
	<article
		:class="[
			'group relative flex flex-col',
			border,
			colSpan === 5 ? 'md:col-span-5' : 'md:col-span-7',
		]"
	>
		<div
			class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
		/>

		<div class="surface-panel relative flex h-[240px] w-full items-center justify-center overflow-hidden">
			<div class="grid-overlay-sm pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" />
			<div
				class="pointer-events-none absolute inset-0"
				style="background: radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.18), transparent 65%)"
			/>
			<div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
				<div
					class="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-black/60 shadow-[0_0_20px_rgba(129,140,248,0.15)] backdrop-blur-md"
				>
					<Icon :name="icon" class="text-xl text-indigo-400" />
				</div>
			</div>
		</div>

		<div data-reveal class="relative z-10 mt-auto border-t border-white/5 bg-black/20 p-5 pt-4 sm:p-8 sm:pt-4">
			<h3 class="text-lg font-light tracking-tighter text-neutral-200">
				{{ $t(`course.modules.${moduleKey}.title`) }}
			</h3>
			<p :class="['mt-1 text-sm leading-snug text-neutral-500', colSpan === 7 ? 'pr-8' : '']">
				{{ $t(`course.modules.${moduleKey}.description`) }}
			</p>
		</div>
	</article>
</template>
