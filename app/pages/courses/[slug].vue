<script setup lang="ts">
import { courseModules, findCourse, findMentor } from '~/data/course'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const course = computed(() => findCourse(String(route.params.slug)))

if (!course.value) {
	throw createError({ statusCode: 404, statusMessage: 'Course not found', fatal: true })
}

const mentor = computed(() => findMentor(course.value!.mentor))
const isOpen = computed(() => course.value!.status === 'open')

const title = computed(() => t(`courses.items.${course.value!.key}.title`))
const description = computed(() => t(`courses.items.${course.value!.key}.description`))

useSeoMeta({
	title: () => t('courseDetail.metaTitle', { course: title.value }),
	description: () => description.value,
	ogTitle: () => title.value,
	ogDescription: () => description.value,
})

useHead(() => ({
	script: [{
		type: 'application/ld+json',
		innerHTML: JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Course',
			'name': title.value,
			'description': description.value,
			'inLanguage': locale.value,
			'provider': { '@type': 'EducationalOrganization', 'name': 'Forma 3D' },
		}),
	}],
}))
</script>

<template>
	<div v-if="course">
		<FrameSection id="overview" variant="hero" overflow :entrance="false">
			<div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
				<div class="reveal-block border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
					<NuxtLink
						:to="localePath('/')"
						class="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-zinc-500 outline-none transition hover:text-white focus-visible:text-white"
					>
						<Icon name="solar:arrow-left-linear" class="text-base" />
						{{ t('courseDetail.back') }}
					</NuxtLink>

					<div class="mt-8 flex items-center gap-3">
						<span
							:class="[
								'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-widest',
								isOpen
									? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
									: 'border-white/10 text-zinc-500',
							]"
						>
							<span
								v-if="isOpen"
								class="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0.75rem_rgba(52,211,153,0.8)]"
							/>
							<Icon v-else name="solar:lock-keyhole-minimalistic-linear" class="text-sm" />
							{{ t(`courses.status.${course.status}`) }}
						</span>
					</div>

					<h1 class="mt-6 max-w-2xl text-4xl font-normal leading-[1.2] tracking-tighter text-white sm:text-5xl lg:text-6xl">
						{{ title }}
					</h1>

					<p class="mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
						{{ description }}
					</p>

					<div v-if="isOpen" class="mt-8">
						<AppButton href="#register" variant="solid" size="xl" icon="solar:arrow-right-linear">
							{{ t('courses.enroll') }}
						</AppButton>
					</div>
					<p v-else class="mt-8 text-xs font-medium tracking-widest text-zinc-600">
						{{ t('courses.notifyHint') }}
					</p>
				</div>

				<div class="relative min-h-[22rem] overflow-hidden">
					<div class="grid-overlay absolute inset-0 opacity-30 mix-blend-overlay [background-size:4rem_4rem]" />
					<div class="absolute inset-0 flex items-center justify-center">
						<Icon :name="course.icon" class="text-[10rem] text-white/5" />
					</div>
				</div>
			</div>
		</FrameSection>

		<FrameSection id="pros" class="mt-6">
			<div class="border-b border-white/10 p-5 sm:p-8">
				<FrameHeading :title="t('courseDetail.prosTitle')" :description="t('courseDetail.prosDescription')" />
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<div
					v-for="(pro, i) in course.pros"
					:key="pro"
					data-reveal
					:class="[
						'p-5 sm:p-6',
						i < course.pros.length - 1 ? 'border-b border-white/10 sm:border-b-0 sm:border-r' : '',
					]"
				>
					<Icon name="solar:check-circle-linear" class="text-2xl text-indigo-300" />
					<h3 class="mt-4 text-sm font-medium text-white">
						{{ t(`courseDetail.pros.${pro}.title`) }}
					</h3>
					<p class="mt-2 text-xs leading-5 text-zinc-500">
						{{ t(`courseDetail.pros.${pro}.description`) }}
					</p>
				</div>
			</div>
		</FrameSection>

		<FrameSection v-if="course.key === 'threeDsMax'" id="program" class="mt-6">
			<div class="border-b border-white/10 p-5 sm:p-8">
				<FrameHeading :title="t('course.title')" :description="t('course.description')" />
			</div>
			<div class="grid grid-cols-1 md:grid-cols-12">
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

		<FrameSection v-if="mentor" id="mentor" class="mt-6">
			<MentorCard :mentor="mentor" />
		</FrameSection>

		<FrameSection v-if="isOpen" id="register" class="mt-6 scroll-mt-24">
			<div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
				<div class="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
					<FrameHeading :title="t('register.title')" :description="t('register.description')" />
				</div>
				<div class="p-5 sm:p-8">
					<FormRegistrationForm />
				</div>
			</div>
		</FrameSection>
	</div>
</template>
