<script setup lang="ts">
import { navLinks } from '~/data/nav'

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

			<SheetFooter class="mt-auto flex-col gap-3">
				<AppButton variant="ghost" size="sm">{{ $t('common.logIn') }}</AppButton>
				<AppButton variant="solid" size="sm" icon="solar:arrow-right-linear">
					{{ $t('common.openConsole') }}
				</AppButton>
			</SheetFooter>
		</SheetContent>
	</Sheet>
</template>
