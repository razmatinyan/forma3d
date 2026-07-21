<script setup lang="ts">
import { faqItems } from '~/data/course'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="faq" class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading :title="t('faq.title')" :description="t('faq.description')" />
			</div>
			<div class="p-5 sm:p-8">
				<Accordion type="single" collapsible default-value="item-0">
					<FaqItem v-for="(item, i) in faqItems" :key="item.key" :item-key="item.key" :value="`item-${i}`" />
				</Accordion>
			</div>
		</div>
	</FrameSection>
</template>
