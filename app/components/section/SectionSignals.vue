<script setup lang="ts">
import { courseFacts } from '~/data/course'
import { site } from '~/data/site'

const { t } = useI18n()

const factParams: Record<string, Record<string, unknown>> = {
	groupSize: { max: site.course.groupSizeMax },
	duration: { months: site.course.durationMonths, sessions: site.course.sessionsPerWeek },
	certificate: {},
}
</script>

<template>
	<FrameSection id="facts" class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading
					:eyebrow="t('facts.eyebrow')"
					:title="t('facts.title')"
					:description="t('facts.description')"
				/>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-3">
				<MetricCard
					v-for="(fact, i) in courseFacts"
					:key="fact.key"
					:metric-key="fact.key"
					:icon="fact.icon"
					:params="factParams[fact.key]"
					:last="i === courseFacts.length - 1"
				/>
			</div>
		</div>
	</FrameSection>
</template>
