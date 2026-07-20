<script setup lang="ts">
import { signalsMetrics } from '~/data/sections'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="signals" class="mt-6">
		<div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading
					:eyebrow="t('signals.eyebrow')"
					:title="t('signals.title')"
					:description="t('signals.description')"
				/>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-3">
				<MetricCard
					v-for="(metric, i) in signalsMetrics"
					:key="metric.key"
					:metric-key="metric.key"
					:icon="metric.icon"
					:last="i === signalsMetrics.length - 1"
				/>
			</div>
		</div>
	</FrameSection>
</template>
