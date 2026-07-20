<script setup lang="ts">
import { architectureCards } from '~/data/sections'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="core-architecture" class="mt-6">
		<div class="border-b border-white/10 p-5 sm:p-8">
			<FrameHeading
				eyebrow-style="pill"
				:eyebrow="t('architecture.eyebrow')"
				:title="t('architecture.title')"
				:description="t('architecture.description')"
			/>
		</div>

		<div class="grid auto-rows-fr grid-cols-1 md:grid-cols-12">
			<ArchitectureCard
				v-for="card in architectureCards"
				:key="card.key"
				:card-key="card.key"
				:icon="card.icon"
				:col-span="card.colSpan"
				:border="card.border"
			/>
		</div>
	</FrameSection>
</template>
