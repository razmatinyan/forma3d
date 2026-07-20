<script setup lang="ts">
defineProps<{ itemKey: string; image: string }>()
</script>

<template>
	<article class="asset-card p-4">
		<img
			:src="image"
			:alt="$t(`assets.items.${itemKey}.alt`)"
			width="640"
			height="256"
			loading="lazy"
			decoding="async"
			class="h-40 w-full rounded-xl object-cover opacity-80 grayscale transition duration-500 hover:grayscale-0"
		>
		<p class="mt-4 text-xs font-medium uppercase tracking-widest text-zinc-300">
			{{ $t(`assets.items.${itemKey}.title`) }}
		</p>
		<p class="mt-2 break-all text-xs leading-5 text-zinc-600">
			{{ $t(`assets.items.${itemKey}.filename`) }}
		</p>
	</article>
</template>
