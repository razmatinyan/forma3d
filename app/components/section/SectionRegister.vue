<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
	<FrameSection id="register" class="mt-6 scroll-mt-24">
		<div class="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
				<FrameHeading :title="t('register.title')" :description="t('register.description')" />
			</div>
			<div class="p-5 sm:p-8">
				<FormRegistrationForm />
			</div>
		</div>
	</FrameSection>
</template>
