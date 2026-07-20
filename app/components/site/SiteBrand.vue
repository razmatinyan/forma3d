<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'header' | 'footer' }>(), { variant: 'header' })
</script>

<template>
	<NuxtLink
		to="#"
		:aria-label="$t('common.brandHomeLabel')"
		:class="[
			'group relative items-center gap-3',
			variant === 'header'
				? 'flex min-h-20 border-x border-white/10 px-4 sm:px-6'
				: 'inline-flex',
		]"
	>
		<template v-if="variant === 'header'">
			<span class="absolute -left-1 top-4 h-2 w-2 bg-zinc-500" aria-hidden="true" />
			<span class="absolute -right-1 bottom-4 h-2 w-2 bg-zinc-500" aria-hidden="true" />
		</template>
		<span
			class="bezel-strong flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-sm font-medium text-white"
		>
			VL
		</span>
		<span :class="['leading-none', variant === 'header' ? 'hidden sm:block' : 'block']">
			<span class="block text-sm font-medium tracking-tight text-white">
				{{ $t('common.brandName') }}
			</span>
			<span class="mt-1 block text-xs font-normal uppercase tracking-widest text-zinc-500">
				{{ $t('common.brandTagline') }}
			</span>
		</span>
	</NuxtLink>
</template>
