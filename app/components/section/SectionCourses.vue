<script setup lang="ts">
import { courses } from '~/data/course'

const { t } = useI18n()

const featured = computed(() => courses.find(c => c.featured))
const upcoming = computed(() => courses.filter(c => !c.featured))

const root = ref<HTMLElement | null>(null)
const { gsap, motion } = useGSAP()

// large surfaces need a shorter throw and far less blur than the shared preset
motion({ reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
	if (context.conditions.reduced || !root.value) return
	gsap.fromTo(
		root.value.querySelectorAll('.course-card'),
		{ y: 24, opacity: 0, filter: 'blur(6px)' },
		{
			y: 0,
			opacity: 1,
			filter: 'blur(0px)',
			duration: 0.6,
			stagger: 0.09,
			ease: 'power3.out',
			clearProps: 'filter',
			scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
		},
	)
})
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

		<div ref="root">
			<CourseCard v-if="featured" :course="featured" class="border-b border-white/10" />

			<div class="grid grid-cols-1 md:grid-cols-2">
				<CourseCard
					v-for="(course, i) in upcoming"
					:key="course.key"
					:course="course"
					:class="i === 0 ? 'border-b border-white/10 md:border-b-0 md:border-r' : ''"
				/>
			</div>
		</div>
	</FrameSection>
</template>
