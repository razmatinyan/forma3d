<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
	<FrameSection id="cta" overflow class="mt-6 scroll-mt-24">
		<div class="relative">
			<div class="grid-overlay pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay [background-size:4rem_4rem]" />

			<div class="relative mx-auto flex max-w-2xl flex-col items-center px-5 py-16 text-center sm:px-8 sm:py-20">
				<FrameHeading center :title="t('cta.title')" :description="t('cta.description')" />

				<div class="mt-10">
					<AppButton :href="localePath('/#courses')" variant="solid" size="xl" icon="solar:arrow-right-linear">
						{{ t('cta.button') }}
					</AppButton>
				</div>
			</div>
		</div>
	</FrameSection>
</template>
