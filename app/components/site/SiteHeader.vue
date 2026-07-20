<script setup lang="ts">
import { navLinks } from '~/data/nav'
</script>

<template>
	<header class="relative z-20 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-7xl items-stretch justify-between px-4 sm:px-6 lg:px-8">
			<SiteBrand variant="header" />

			<nav :aria-label="$t('common.primaryNav')" class="hidden items-stretch lg:flex">
				<a
					v-for="link in navLinks"
					:key="link.key"
					:href="link.href"
					class="flex items-center gap-2 border-r border-white/10 px-5 text-xs font-medium uppercase tracking-widest text-zinc-400 transition hover:text-white"
				>
					<Icon :name="link.icon" class="text-lg" />
					{{ $t(`nav.${link.key}`) }}
				</a>
			</nav>

			<div class="hidden items-center gap-3 py-4 lg:flex">
				<AppButton variant="ghost" size="sm">{{ $t('common.logIn') }}</AppButton>
				<AppButton variant="solid" size="sm" icon="solar:arrow-right-linear">
					{{ $t('common.openConsole') }}
				</AppButton>
			</div>

			<SiteMobileNav />
		</div>
	</header>
</template>
