<script setup lang="ts">
import { courses } from '~/data/course'

const { t } = useI18n()

const featured = computed(() => courses.find(c => c.featured))
const upcoming = computed(() => courses.filter(c => !c.featured))
</script>

<template>
	<FrameSection id="courses" overflow class="mt-6 scroll-mt-24">
		<div class="border-b border-white/10 p-5 sm:p-8">
			<FrameHeading
				:eyebrow="t('courses.eyebrow')"
				:title="t('courses.title')"
				:description="t('courses.description')"
			/>
		</div>

		<CourseCard v-if="featured" :course="featured" class="border-b border-white/10" />

		<div class="grid grid-cols-1 md:grid-cols-2">
			<CourseCard
				v-for="(course, i) in upcoming"
				:key="course.key"
				:course="course"
				:class="i === 0 ? 'border-b border-white/10 md:border-b-0 md:border-r' : ''"
			/>
		</div>
	</FrameSection>
</template>
