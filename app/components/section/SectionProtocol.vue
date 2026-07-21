<script setup lang="ts">
import { enrollmentSteps } from '~/data/course'
import { site } from '~/data/site'

const { t } = useI18n()

const price = useLocaleNumber(site.course.priceAmd, 'price')

const stepParams = computed<Record<string, Record<string, unknown>>>(() => ({
	confirm: { price: price.value },
}))
</script>

<template>
	<FrameSection id="how" overflow class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading
					:eyebrow="t('how.eyebrow')"
					:title="t('how.title')"
					:description="t('how.description')"
				/>
			</div>
			<div class="divide-y divide-white/10">
				<ProtocolRow
					v-for="(step, i) in enrollmentSteps"
					:key="step.key"
					:step-key="step.key"
					:index="i + 1"
					:params="stepParams[step.key]"
				/>
			</div>
		</div>
	</FrameSection>
</template>
