<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<SelectTrigger
		data-slot="select-trigger"
		v-bind="forwarded"
		:class="
			cn(
				'flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-zinc-300 outline-none transition',
				'data-[placeholder]:text-zinc-600',
				'focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400/50',
				'aria-invalid:border-red-400/60',
				props.class,
			)
		"
		style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.9)"
	>
		<slot />
		<SelectIcon as-child>
			<Icon name="lucide:chevron-down" class="size-4 shrink-0 text-zinc-500" />
		</SelectIcon>
	</SelectTrigger>
</template>
