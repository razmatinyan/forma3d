<script setup lang="ts">
import { assetItems } from '~/data/sections'

const { t } = useI18n()
const query = ref('')

const filtered = computed(() => {
	const q = query.value.trim().toLowerCase()
	if (!q) return assetItems
	return assetItems.filter((item) => {
		const title = t(`assets.items.${item.key}.title`).toLowerCase()
		return title.includes(q) || item.tags.some(tag => tag.toLowerCase().includes(q))
	})
})
</script>

<template>
	<FrameSection id="assets" class="mt-6">
		<div class="border-b border-white/10 p-5 sm:p-8">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p class="text-xs font-medium uppercase tracking-[0.32em] text-zinc-500">
						{{ t('assets.eyebrow') }}
					</p>
					<h2 class="mt-3 text-3xl font-normal tracking-tighter text-white sm:text-4xl">
						{{ t('assets.title') }}
					</h2>
				</div>
				<div class="relative max-w-md">
					<label for="asset-search" class="sr-only">{{ t('assets.searchLabel') }}</label>
					<Icon
						name="solar:magnifer-linear"
						class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-500"
					/>
					<Input
						id="asset-search"
						v-model="query"
						type="search"
						:placeholder="t('assets.searchPlaceholder')"
						:aria-label="t('assets.searchAriaLabel')"
						class="h-12 rounded-xl border-white/10 bg-black/40 pl-11 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400/50"
						style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.9)"
					/>
				</div>
			</div>
		</div>

		<div
			v-if="filtered.length"
			class="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-5 md:divide-x md:divide-y-0"
		>
			<AssetCard v-for="item in filtered" :key="item.key" :item-key="item.key" :image="item.image" />
		</div>
		<p v-else class="p-10 text-center text-sm text-zinc-500">{{ t('assets.emptyState') }}</p>
	</FrameSection>
</template>
