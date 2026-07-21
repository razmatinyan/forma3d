<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<SelectItem
		data-slot="select-item"
		v-bind="forwarded"
		:class="
			cn(
				'relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-zinc-300 outline-none transition',
				'data-highlighted:bg-white/5 data-highlighted:text-white',
				'data-[state=checked]:text-indigo-300',
				props.class,
			)
		"
	>
		<SelectItemText>
			<slot />
		</SelectItemText>
		<SelectItemIndicator>
			<Icon name="lucide:check" class="size-4 text-indigo-400" />
		</SelectItemIndicator>
	</SelectItem>
</template>
