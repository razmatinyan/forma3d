<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Label } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
	<Label
		data-slot="label"
		v-bind="props"
		:class="cn('text-xs font-medium uppercase tracking-widest text-zinc-400', props.class)"
	>
		<slot />
	</Label>
</template>
