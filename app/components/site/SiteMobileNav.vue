<script setup lang="ts">
import { navLinks } from '~/data/nav'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
	const list = locales.value
	return (typeof list[0] === 'string' ? [] : list) as { code: string; name?: string }[]
})

const open = ref(false)

function closeAndNavigate() {
	open.value = false
}
</script>

<template>
	<Sheet v-model:open="open">
		<SheetTrigger as-child>
			<button
				type="button"
				:aria-label="$t('common.openMenu')"
				class="bezel my-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 outline-none lg:hidden focus-visible:ring-2 focus-visible:ring-indigo-400"
			>
				<Icon name="solar:hamburger-menu-linear" class="text-xl" />
			</button>
		</SheetTrigger>
		<SheetContent side="right" class="w-72 border-white/10 bg-neutral-950 sm:max-w-xs">
			<SheetHeader>
				<SheetTitle class="text-white">{{ $t('common.menuTitle') }}</SheetTitle>
				<SheetDescription class="sr-only">
					{{ $t('common.menuDescription') }}
				</SheetDescription>
			</SheetHeader>

			<nav :aria-label="$t('common.primaryNav')" class="flex flex-col px-2">
				<a
					v-for="link in navLinks"
					:key="link.key"
					:href="link.href"
					class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-widest text-zinc-400 outline-none transition hover:bg-white/5 hover:text-white focus-visible:bg-white/5 focus-visible:text-white"
					@click="closeAndNavigate"
				>
					<Icon :name="link.icon" class="text-lg" />
					{{ $t(`nav.${link.key}`) }}
				</a>
			</nav>

			<div class="mt-2 flex flex-wrap gap-2 border-t border-white/10 px-2 pt-4">
				<NuxtLink
					v-for="item in availableLocales"
					:key="item.code"
					:to="switchLocalePath(item.code)"
					:class="[
						'rounded-lg border px-3 py-2 text-xs font-medium uppercase tracking-widest outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400',
						item.code === locale
							? 'border-indigo-400/40 text-indigo-300'
							: 'border-white/10 text-zinc-400 hover:text-white',
					]"
					@click="closeAndNavigate"
				>
					{{ item.name }}
				</NuxtLink>
			</div>

			<SheetFooter class="mt-auto flex-col gap-3">
				<AppButton href="#course" variant="solid" size="sm" icon="solar:arrow-right-linear" @click="closeAndNavigate">
					{{ $t('common.ctaCourse') }}
				</AppButton>
			</SheetFooter>
		</SheetContent>
	</Sheet>
</template>
