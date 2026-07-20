<script setup lang="ts">
import { protocolSteps } from '~/data/sections'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="protocol" overflow class="mt-6">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading
					:eyebrow="t('protocol.eyebrow')"
					:title="t('protocol.title')"
					:description="t('protocol.description')"
				/>
			</div>
			<div class="divide-y divide-white/10">
				<ProtocolRow
					v-for="(step, i) in protocolSteps"
					:key="step.key"
					:step-key="step.key"
					:index="i + 1"
				/>
			</div>
		</div>
	</FrameSection>
</template>
