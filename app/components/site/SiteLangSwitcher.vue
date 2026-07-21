<script setup lang="ts">
import type { LocaleCode } from '~/types/i18n'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const flags: Record<string, string> = {
	hy: 'circle-flags:am',
	ru: 'circle-flags:ru',
	en: 'circle-flags:uk',
}

const availableLocales = computed(() => {
	const list = locales.value
	return (typeof list[0] === 'string' ? [] : list) as {
		code: LocaleCode
		name?: string
	}[]
})

const currentFlag = computed(() => flags[locale.value] ?? 'solar:global-linear')
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<button
				type="button"
				:aria-label="$t('common.languageLabel')"
				class="btn-ghost inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-xs font-medium uppercase tracking-widest text-zinc-300 outline-none transition hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
			>
				<Icon :name="currentFlag" class="size-4 shrink-0 rounded-full" />
				{{ locale }}
			</button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuItem
				v-for="item in availableLocales"
				:key="item.code"
				as-child
			>
				<NuxtLink
					:to="switchLocalePath(item.code)"
					:class="[
						'flex items-center gap-2.5',
						item.code === locale ? 'text-indigo-300' : '',
					]"
				>
					<Icon
						:name="flags[item.code] ?? 'solar:global-linear'"
						class="size-4 shrink-0 rounded-full"
					/>
					{{ item.name }}
				</NuxtLink>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
