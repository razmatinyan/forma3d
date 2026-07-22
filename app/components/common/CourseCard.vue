<script setup lang="ts">
import type { CourseItem } from '~/data/course'

const props = defineProps<{ course: CourseItem; class?: string }>()

const localePath = useLocalePath()

const isOpen = computed(() => props.course.status === 'open')
</script>

<template>
	<article
		:class="[
			'course-card group relative flex flex-col p-5 sm:p-8',
			isOpen ? '' : 'opacity-70 transition hover:opacity-100',
			props.class,
		]"
	>
		<div class="flex items-start justify-between gap-4">
			<span
				:class="[
					'bezel flex size-11 shrink-0 items-center justify-center rounded-xl border',
					isOpen ? 'border-indigo-400/30 text-indigo-300' : 'border-white/10 text-zinc-500',
				]"
			>
				<Icon :name="course.icon" class="text-xl" />
			</span>

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
				{{ $t(`courses.status.${course.status}`) }}
			</span>
		</div>

		<h3 :class="['mt-6 font-normal tracking-tight', isOpen ? 'text-2xl text-white sm:text-3xl' : 'text-xl text-zinc-300']">
			{{ $t(`courses.items.${course.key}.title`) }}
		</h3>

		<p :class="['mt-3 max-w-md leading-6 text-zinc-500', isOpen ? 'text-sm sm:text-base' : 'text-sm']">
			{{ $t(`courses.items.${course.key}.description`) }}
		</p>

		<div class="mt-auto flex flex-wrap items-center gap-4 pt-8">
			<AppButton
				:href="localePath(`/courses/${course.slug}`)"
				:variant="isOpen ? 'solid' : 'ghost'"
				size="lg"
				icon="solar:arrow-right-linear"
			>
				{{ $t('courses.details') }}
			</AppButton>
			<p v-if="!isOpen" class="text-xs font-medium tracking-widest text-zinc-600">
				{{ $t('courses.notifyHint') }}
			</p>
		</div>
	</article>
</template>
