<script setup lang="ts">
import {
	heroCanvasLoadRows,
	heroFeatures,
	heroOperators,
	heroStats,
	heroSyncMeshBars,
} from '~/data/sections'

const { t } = useI18n()

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
	<FrameSection id="model" variant="hero" overflow :entrance="false">
		<div
			class="grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]"
		>
			<aside
				class="relative border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r"
			>
				<div class="reveal-block max-w-xl">
					<StatusPill :label="t('hero.eyebrow')" class="mb-8" />

					<h1
						class="hero-title max-w-2xl text-5xl font-normal leading-[1.1] tracking-tighter text-white sm:text-6xl lg:text-7xl"
					>
						<span class="inline-block overflow-hidden align-bottom">
							<span class="hero-line inline-block">{{
								t('hero.titleLine1')
							}}</span>
						</span>
						<span class="inline-block overflow-hidden align-bottom">
							<span
								class="hero-line inline-block font-normal tracking-tighter text-indigo-400"
								style="
									background: linear-gradient(
										to right,
										#818cf8,
										#c7d2fe
									);
									-webkit-background-clip: text;
									-webkit-text-fill-color: transparent;
								"
							>
								{{ t('hero.titleHighlight') }}
							</span>
						</span>
						<span class="inline-block overflow-hidden align-bottom">
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

					<div
						class="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2"
					>
						<HeroFeature
							v-for="feature in heroFeatures"
							:key="feature.key"
							:feature-key="feature.key"
						/>
					</div>

					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<AppButton
							variant="solid"
							size="lg"
							icon="solar:map-arrow-right-linear"
						>
							{{ t('hero.ctaPrimary') }}
						</AppButton>
						<AppButton
							href="#assets"
							variant="ghost"
							size="lg"
							icon="solar:magnifer-linear"
						>
							{{ t('hero.ctaSecondary') }}
						</AppButton>
					</div>
				</div>

				<div
					class="mt-10 rounded-xl border border-white/10 p-4"
					style="
						background: linear-gradient(
							to bottom,
							rgba(255, 255, 255, 0.075),
							rgba(0, 0, 0, 0.2)
						);
						box-shadow:
							inset 0 1px 0 rgba(255, 255, 255, 0.1),
							inset 0 -1px 0 rgba(0, 0, 0, 0.9);
					"
				>
					<div
						class="flex items-center justify-between border-b border-white/10 pb-3"
					>
						<p
							class="text-xs font-medium uppercase tracking-widest text-zinc-400"
						>
							{{ t('hero.operators.label') }}
						</p>
						<span class="text-xs text-zinc-500">{{
							t('hero.operators.onlineCount')
						}}</span>
					</div>
					<AvatarGroup class="mt-4">
						<Avatar
							v-for="operator in heroOperators"
							:key="operator.key"
							class="size-9"
						>
							<AvatarImage
								:src="operator.image"
								:alt="t(`hero.operators.${operator.key}`)"
								class="grayscale"
							/>
							<AvatarFallback>{{
								operator.key.slice(0, 2).toUpperCase()
							}}</AvatarFallback>
						</Avatar>
						<AvatarGroupCount class="size-9 text-xs">
							{{ t('hero.operators.overflow') }}
						</AvatarGroupCount>
					</AvatarGroup>
				</div>
			</aside>

			<div class="relative min-h-[38rem] overflow-hidden">
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

				<div class="absolute left-6 top-6 z-20 flex items-center gap-3">
					<div
						class="h-2 w-2 animate-pulse rounded-full bg-indigo-500 shadow-[0_0_10px_#818cf8]"
					/>
					<span
						class="text-xs font-medium uppercase tracking-widest text-indigo-400/80"
					>
						{{ t('hero.simulation') }}
					</span>
				</div>

				<LabelPill class="right-5 top-12 w-52 sm:right-8">
					<div class="flex items-center justify-between">
						<p
							class="text-xs font-medium uppercase tracking-widest text-zinc-300"
						>
							{{ t('hero.panels.syncMesh.label') }}
						</p>
						<span class="text-xs text-zinc-500">{{
							t('hero.panels.syncMesh.value')
						}}</span>
					</div>
					<div class="mt-3 grid grid-cols-8 gap-1">
						<span
							v-for="(bar, i) in heroSyncMeshBars"
							:key="i"
							:class="['rounded', bar.height, bar.tone]"
						/>
					</div>
				</LabelPill>

				<LabelPill class="bottom-24 left-5 w-52 sm:left-8">
					<p
						class="text-xs font-medium uppercase tracking-widest text-zinc-300"
					>
						{{ t('hero.panels.routeMemory.label') }}
					</p>
					<p class="mt-2 text-2xl font-normal tracking-tight text-white">
						{{ t('hero.panels.routeMemory.value') }}
					</p>
					<p class="mt-1 text-xs text-zinc-500">
						{{ t('hero.panels.routeMemory.caption') }}
					</p>
				</LabelPill>

				<LabelPill class="bottom-16 right-5 w-60 sm:right-8">
					<div class="flex items-center justify-between">
						<p
							class="text-xs font-medium uppercase tracking-widest text-zinc-300"
						>
							{{ t('hero.panels.canvasLoad.label') }}
						</p>
						<Icon name="solar:cpu-linear" class="text-lg text-zinc-400" />
					</div>
					<div class="mt-3 space-y-2">
						<div
							v-for="row in heroCanvasLoadRows"
							:key="row.key"
							class="flex items-center gap-2"
						>
							<span class="w-16 text-xs text-zinc-500">{{
								t(`hero.panels.canvasLoad.${row.key}`)
							}}</span>
							<span class="h-1.5 flex-1 rounded-full bg-black/60">
								<span
									:class="[
										'block h-full rounded-full',
										row.width,
										row.tone,
									]"
								/>
							</span>
						</div>
					</div>
				</LabelPill>

				<div
					class="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/35 px-5 py-4 backdrop-blur-xl sm:px-8"
				>
					<div
						class="grid grid-cols-2 gap-3 text-xs text-zinc-500 sm:grid-cols-4"
					>
						<div v-for="stat in heroStats" :key="stat.key">
							<span class="block uppercase tracking-widest">{{
								t(`hero.stats.${stat.key}.label`)
							}}</span>
							<strong class="mt-1 block font-medium text-zinc-200">{{
								t(`hero.stats.${stat.key}.value`)
							}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	</FrameSection>
</template>
