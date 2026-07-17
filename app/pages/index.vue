<script setup>
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
	<div class="flex flex-col gap-4">
		<h1 class="text-red-500">{{ $t('welcome') }}</h1>
		<NuxtLink
			v-for="locale in locales"
			:key="locale.code"
			:to="switchLocalePath(locale.code)"
		>
			{{ locale.name }}
		</NuxtLink>
	</div>
</template>
