<script setup lang="ts">
import { navLinks } from '~/data/nav'

const localePath = useLocalePath()
</script>

<template>
	<header class="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-[90rem] items-stretch justify-between px-4 sm:px-6 lg:px-8">
			<SiteBrand variant="header" />

			<nav :aria-label="$t('common.primaryNav')" class="hidden items-stretch lg:flex">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.key"
					:to="localePath(link.href)"
					class="flex items-center border-r border-white/10 px-5 text-xs font-medium tracking-widest text-zinc-400 outline-none transition hover:text-white focus-visible:bg-white/5 focus-visible:text-white"
				>
					{{ $t(`nav.${link.key}`) }}
				</NuxtLink>
			</nav>

			<div class="hidden items-center gap-3 py-4 lg:flex">
				<SiteLangSwitcher />
				<AppButton :href="localePath('/#courses')" variant="solid" size="sm" icon="solar:arrow-right-linear">
					{{ $t('common.ctaCourse') }}
				</AppButton>
			</div>

			<SiteMobileNav />
		</div>
	</header>
</template>
