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
	gsap.from('.connector-line', {
		strokeDashoffset: 80,
		opacity: 0,
		duration: 1.2,
		stagger: 0.12,
		delay: 0.6,
		ease: 'power2.out',
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
							:href="localePath('/#register')"
							variant="solid"
							size="xl"
							icon="solar:arrow-right-linear"
						>
							{{ t('hero.ctaPrimary') }}
						</AppButton>
					</div>
				</div>
			</aside>

			<div class="relative min-h-[30rem] overflow-hidden">
				<div
					class="grid-overlay absolute inset-0 opacity-30 mix-blend-overlay [background-size:4rem_4rem]"
				/>

				<ThreeStage />

				<svg
					class="pointer-events-none absolute inset-0 h-full w-full text-zinc-300/50"
					viewBox="0 0 1000 700"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<path
						class="connector-line"
						d="M188 158 H316 V254"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-dasharray="6 8"
					/>
					<path
						class="connector-line"
						d="M816 172 H686 V278"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-dasharray="6 8"
					/>
					<path
						class="connector-line"
						d="M196 526 H356 V426"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-dasharray="6 8"
					/>
					<path
						class="connector-line"
						d="M790 552 H636 V446"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-dasharray="6 8"
					/>
				</svg>

				<div class="absolute inset-x-5 top-6 z-20 sm:inset-x-8 sm:top-8 lg:left-auto lg:right-8 lg:w-96">
					<div class="label-pill surface-deep rounded-xl border border-white/10 px-5 pt-5">
						<div class="flex items-center justify-between border-b border-white/10 pb-4">
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

						<ul class="mt-1">
							<li v-for="course in courses" :key="course.key" class="border-b border-white/5 last:border-b-0">
								<NuxtLink
									:to="localePath(`/courses/${course.slug}`)"
									class="group flex items-center gap-4 rounded-lg py-4 outline-none transition focus-visible:bg-white/5"
								>
									<span
										:class="[
											'bezel flex size-10 shrink-0 items-center justify-center rounded-lg border',
											course.status === 'open' ? 'border-indigo-400/30 text-indigo-300' : 'border-white/10 text-zinc-600',
										]"
									>
										<Icon :name="course.icon" class="text-lg" />
									</span>
									<span class="min-w-0 flex-1">
										<span
											:class="[
												'block truncate text-sm transition',
												course.status === 'open' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200',
											]"
										>
											{{ t(`courses.items.${course.key}.title`) }}
										</span>
										<span class="mt-1 block text-xs tracking-widest text-zinc-600">
											{{ t(`courses.status.${course.status}`) }}
										</span>
									</span>
									<Icon
										name="solar:arrow-right-linear"
										class="shrink-0 text-base text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-white"
									/>
								</NuxtLink>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</div>
	</FrameSection>
</template>
