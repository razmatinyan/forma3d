<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { contactRows } from '~/data/course'
import { site } from '~/data/site'

const { t } = useI18n()

const mapEl = ref<HTMLElement | null>(null)
const mapLoaded = ref(false)

const { stop } = useIntersectionObserver(
	mapEl,
	([entry]) => {
		if (entry?.isIntersecting) {
			mapLoaded.value = true
			stop()
		}
	},
	{ threshold: 0.1 },
)
</script>

<template>
	<FrameSection id="contact" overflow class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="border-b border-white/10 lg:border-b-0 lg:border-r">
				<div class="border-b border-white/10 p-5 sm:p-8">
					<FrameHeading :title="t('contact.title')" :description="t('contact.description')" />
				</div>
				<div>
					<ContactRow
						v-for="row in contactRows"
						:key="row.key"
						:row-key="row.key"
						:icon="row.icon"
						:href="row.href"
						:value="row.value"
					/>
				</div>
			</div>
			<div ref="mapEl" class="relative min-h-[20rem] overflow-hidden">
				<iframe
					v-if="mapLoaded"
					:src="site.mapEmbedUrl"
					class="absolute inset-0 h-full w-full grayscale-[35%]"
					style="border: 0"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					:title="t('contact.mapTitle')"
				/>
				<div v-else class="absolute inset-0 flex items-center justify-center bg-black/40">
					<Icon name="solar:map-linear" class="text-3xl text-zinc-600" />
				</div>
			</div>
		</div>
	</FrameSection>
</template>
