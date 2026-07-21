<script setup lang="ts">
import { site } from '~/data/site'

const { t, locale } = useI18n()

const nextStartLabel = computed(() =>
	new Intl.DateTimeFormat(locale.value, { day: 'numeric', month: 'long', year: 'numeric' }).format(
		new Date(site.course.nextStartDate),
	),
)
</script>

<template>
	<FrameSection id="cta" overflow class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading :title="t('cta.title')" :description="t('cta.description')" />
			</div>
			<div class="flex min-h-[16rem] flex-col items-start justify-center gap-4 p-5 sm:p-8">
				<p class="text-xs font-medium tracking-widest text-zinc-500">{{ t('cta.nextGroupLabel') }}</p>
				<p class="text-2xl font-normal tracking-tight text-white">{{ nextStartLabel }}</p>
				<AppButton href="#register" variant="solid" size="lg" icon="solar:arrow-right-linear">
					{{ t('cta.button') }}
				</AppButton>
			</div>
		</div>
	</FrameSection>
</template>
