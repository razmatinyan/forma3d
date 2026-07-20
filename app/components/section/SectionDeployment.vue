<script setup lang="ts">
import { deploymentIcons } from '~/data/sections'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="deployment" overflow class="mt-6">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading
					:eyebrow="t('deployment.eyebrow')"
					:title="t('deployment.title')"
					:description="t('deployment.description')"
				/>
			</div>
			<div class="flex min-h-[16rem] items-center justify-center p-5 sm:p-8">
				<div class="flex flex-col items-center gap-6">
					<div class="flex items-center gap-3">
						<template v-for="(icon, i) in deploymentIcons" :key="icon">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/50 text-2xl text-zinc-300"
								style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05)"
							>
								<Icon :name="icon" />
							</div>
							<div v-if="i < deploymentIcons.length - 1" class="h-px w-8 bg-white/10" />
						</template>
					</div>
					<AppButton variant="ghost" size="sm">{{ t('deployment.cta') }}</AppButton>
				</div>
			</div>
		</div>
	</FrameSection>
</template>
