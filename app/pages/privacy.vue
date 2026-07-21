<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
	title: () => t('privacy.meta.title'),
	description: () => t('privacy.meta.description'),
})

const sections = ['dataCollected', 'purpose', 'retention', 'thirdParties', 'rights', 'contact'] as const
</script>

<template>
	<div>
		<FrameSection variant="soft" class="p-6 sm:p-10">
			<p class="text-xs font-medium uppercase tracking-[0.32em] text-zinc-500">{{ t('privacy.eyebrow') }}</p>
			<h1 class="mt-3 text-3xl font-normal tracking-tighter text-white sm:text-4xl">
				{{ t('privacy.title') }}
			</h1>
			<p class="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">{{ t('privacy.intro') }}</p>

			<div class="mt-10 space-y-8 border-t border-white/10 pt-8">
				<section v-for="key in sections" :key="key">
					<h2 class="text-lg font-medium text-white">{{ t(`privacy.sections.${key}.title`) }}</h2>
					<p class="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{{ t(`privacy.sections.${key}.body`) }}</p>
				</section>
			</div>

			<p class="mt-10 text-xs text-zinc-600">{{ t('privacy.lastUpdated') }}</p>
		</FrameSection>
	</div>
</template>
