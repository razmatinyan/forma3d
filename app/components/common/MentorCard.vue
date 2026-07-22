<script setup lang="ts">
import type { MentorItem } from '~/data/course'

const props = defineProps<{ mentor: MentorItem }>()

const { t } = useI18n()

const photoFailed = ref(false)

const initials = computed(() =>
	t(`mentors.${props.mentor.key}.name`)
		.split(' ')
		.map(part => part.charAt(0))
		.slice(0, 2)
		.join(''),
)
</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
		<div class="border-b border-white/10 p-5 sm:border-b-0 sm:border-r sm:p-8">
			<div class="bezel flex size-28 items-center justify-center overflow-hidden rounded-xl border border-white/10 sm:size-36">
				<img
					v-if="!photoFailed"
					:src="mentor.photo"
					:alt="$t(`mentors.${mentor.key}.name`)"
					width="144"
					height="144"
					loading="lazy"
					decoding="async"
					class="size-full object-cover grayscale"
					@error="photoFailed = true"
				>
				<span v-else class="text-3xl font-normal tracking-tight text-zinc-600">{{ initials }}</span>
			</div>
		</div>

		<div data-reveal class="p-5 sm:p-8">
			<p class="text-xs font-medium tracking-widest text-zinc-500">
				{{ $t('courseDetail.mentorLabel') }}
			</p>
			<h3 class="mt-3 text-2xl font-normal tracking-tight text-white">
				{{ $t(`mentors.${mentor.key}.name`) }}
			</h3>
			<p class="mt-1 text-sm text-indigo-300">
				{{ $t(`mentors.${mentor.key}.role`) }}
			</p>
			<p class="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
				{{ $t(`mentors.${mentor.key}.bio`) }}
			</p>
			<p class="mt-4 text-xs tracking-widest text-zinc-600">
				{{ $t('courseDetail.mentorYears', { years: mentor.years }) }}
			</p>
		</div>
	</div>
</template>
