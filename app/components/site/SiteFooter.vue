<script setup lang="ts">
import { footerContactLinks } from '~/data/course'
import { navLinks } from '~/data/nav'

const localePath = useLocalePath()
</script>

<template>
	<footer class="relative z-10 mx-auto max-w-[90rem] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
		<FrameSection as="div" variant="soft" overflow class="mb-6 p-8 sm:p-12">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
				<div class="md:col-span-2">
					<SiteBrand variant="footer" />
					<p class="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400">
						{{ $t('footer.blurb') }}
					</p>
				</div>
				<div>
					<h3 class="mb-5 text-xs font-medium tracking-widest text-zinc-300">
						{{ $t('footer.platformHeading') }}
					</h3>
					<ul class="space-y-3">
						<li v-for="link in navLinks" :key="link.key">
							<NuxtLink :to="localePath(link.href)" class="text-sm text-zinc-500 outline-none transition hover:text-white focus-visible:text-white focus-visible:underline">
								{{ $t(`nav.${link.key}`) }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink :to="localePath('/privacy')" class="text-sm text-zinc-500 outline-none transition hover:text-white focus-visible:text-white focus-visible:underline">
								{{ $t('footer.privacy') }}
							</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-5 text-xs font-medium tracking-widest text-zinc-300">
						{{ $t('footer.contactHeading') }}
					</h3>
					<ul class="space-y-3">
						<li v-for="link in footerContactLinks" :key="link.key">
							<a :href="link.href" class="flex items-center gap-2 text-sm text-zinc-500 outline-none transition hover:text-white focus-visible:text-white focus-visible:underline">
								<Icon :name="link.icon" class="text-base" />
								{{ link.value }}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</FrameSection>

		<div
			class="bezel flex flex-col gap-4 border border-white/10 px-5 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex flex-col gap-1">
				<p class="flex items-center gap-1.5">
					<Icon name="solar:copyright-linear" class="text-sm" />
					{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
				</p>
				<p>
					<i18n-t keypath="footer.developedBy" tag="span" scope="global">
						<template #author>
							<a
								href="https://razo.codes"
								target="_blank"
								rel="noopener noreferrer"
								class="text-zinc-400 underline underline-offset-2 outline-none transition hover:text-white focus-visible:text-white"
							>Razmik Matinyan</a>
						</template>
					</i18n-t>
				</p>
			</div>

			<SiteLangSwitcher />
		</div>
	</footer>
</template>
