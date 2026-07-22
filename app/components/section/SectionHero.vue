<script setup lang="ts">
import { courses } from '~/data/course'

const { t } = useI18n()
const localePath = useLocalePath()

const { gsap, motion, revealTo } = useGSAP()

motion({ reduced: '(prefers-reduced-motion: reduce)' }, context => {
	if (context.conditions.reduced) return
	gsap.from('.hero-line', {
		yPercent: 115,
		opacity: 0,
		filter: 'blur(14px)',
		duration: 1.3,
		stagger: 0.11,
		ease: 'expo.out',
		clearProps: 'filter',
	})
	gsap.from('.reveal-block > *:not(.hero-title)', {
		y: 26,
		opacity: 0,
		filter: 'blur(10px)',
		duration: 1,
		stagger: 0.07,
		delay: 0.25,
		ease: 'expo.out',
		clearProps: 'filter',
	})
	gsap.from('.label-pill', {
		y: 20,
		opacity: 0,
		filter: 'blur(10px)',
		duration: 1,
		stagger: 0.12,
		delay: 0.45,
		ease: revealTo.ease,
		clearProps: 'filter',
	})
})
</script>

<template>
	<FrameSection id="hero" variant="hero" overflow :entrance="false" class="scroll-mt-24">
		<div
			class="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]"
		>
			<aside
				class="relative border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r"
			>
				<div class="reveal-block max-w-xl">
					<StatusPill :label="t('hero.eyebrow')" class="mb-8" />

					<h1
						class="hero-title max-w-2xl text-5xl font-normal leading-[1.2] tracking-tighter text-white sm:text-6xl lg:text-7xl"
					>
						<span class="inline-block overflow-hidden pb-[0.15em] align-bottom">
							<span class="hero-line inline-block">{{
								t('hero.titleLine1')
							}}</span>
						</span>
						<span class="inline-block overflow-hidden pb-[0.15em] align-bottom">
							<span
								class="hero-line text-gradient-accent inline-block font-normal tracking-tighter"
							>
								{{ t('hero.titleHighlight') }}
							</span>
						</span>
						<span class="inline-block overflow-hidden pb-[0.15em] align-bottom">
							<span class="hero-line inline-block">{{
								t('hero.titleLine3')
							}}</span>
						</span>
					</h1>
					<p
						class="mt-6 max-w-lg text-sm leading-6 text-neutral-400 sm:text-base"
					>
						{{ t('hero.description') }}
					</p>

					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<AppButton
							:href="localePath('/#courses')"
							variant="solid"
							size="xl"
							icon="solar:arrow-right-linear"
						>
							{{ t('hero.ctaPrimary') }}
						</AppButton>
					</div>
				</div>
			</aside>

			<div class="relative flex flex-col justify-center overflow-hidden p-5 sm:p-8">
				<div
					class="grid-overlay pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay [background-size:4rem_4rem]"
				/>

				<div class="label-pill surface-deep relative rounded-xl border border-white/10">
					<div class="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
						<p class="text-sm font-medium tracking-widest text-zinc-200">
							{{ t('hero.coursesLabel') }}
						</p>
						<NuxtLink
							:to="localePath('/#courses')"
							class="text-xs text-zinc-500 outline-none transition hover:text-white focus-visible:text-white"
						>
							{{ t('hero.coursesLink') }}
						</NuxtLink>
					</div>

					<ul>
						<li v-for="course in courses" :key="course.key" class="border-b border-white/10 last:border-b-0">
							<NuxtLink
								:to="localePath(`/courses/${course.slug}`)"
								class="group flex items-center gap-4 px-5 py-5 outline-none transition hover:bg-white/[0.03] focus-visible:bg-white/[0.03] sm:gap-5 sm:px-6 sm:py-6"
							>
								<span
									:class="[
										'bezel flex size-12 shrink-0 items-center justify-center rounded-xl border sm:size-14',
										course.status === 'open'
											? 'border-indigo-400/30 text-indigo-300'
											: 'border-white/10 text-zinc-600',
									]"
								>
									<Icon :name="course.icon" class="text-xl sm:text-2xl" />
								</span>

								<span class="min-w-0 flex-1">
									<span
										:class="[
											'block text-base font-medium transition sm:text-lg',
											course.status === 'open' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200',
										]"
									>
										{{ t(`courses.items.${course.key}.title`) }}
									</span>
									<span class="mt-1.5 flex items-center gap-2">
										<span
											v-if="course.status === 'open'"
											class="size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0.75rem_rgba(52,211,153,0.8)]"
										/>
										<span
											:class="[
												'text-xs tracking-widest',
												course.status === 'open' ? 'text-emerald-300' : 'text-zinc-600',
											]"
										>
											{{ t(`courses.status.${course.status}`) }}
										</span>
									</span>
								</span>

								<Icon
									name="solar:arrow-right-linear"
									class="shrink-0 text-lg text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-white"
								/>
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</FrameSection>
</template>
