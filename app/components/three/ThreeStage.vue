<script setup lang="ts">
import { createHeroWireframe } from '~/three/heroWireframe'

const { t } = useI18n()
const container = ref<HTMLElement | null>(null)
useThreeScene(container, createHeroWireframe)
</script>

<template>
	<div ref="container" role="img" :aria-label="t('hero.wireframeAlt')" class="absolute inset-0 h-full w-full" />
</template>
