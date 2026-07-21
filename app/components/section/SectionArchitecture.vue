<script setup lang="ts">
import { courseModules } from '~/data/course'
const { t } = useI18n()
</script>

<template>
	<FrameSection id="course" class="mt-6 scroll-mt-24">
		<div class="border-b border-white/10 p-5 sm:p-8">
			<FrameHeading
				eyebrow-style="pill"
				:eyebrow="t('course.eyebrow')"
				:title="t('course.title')"
				:description="t('course.description')"
			/>
		</div>

		<div class="grid auto-rows-fr grid-cols-1 md:grid-cols-12">
			<CourseModuleCard
				v-for="module_ in courseModules"
				:key="module_.key"
				:module-key="module_.key"
				:icon="module_.icon"
				:col-span="module_.colSpan"
				:border="module_.border"
			/>
		</div>
	</FrameSection>
</template>
