<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionHeader, AccordionTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
	<AccordionHeader class="flex">
		<AccordionTrigger
			data-slot="accordion-trigger"
			v-bind="forwarded"
			:class="
				cn(
					'group flex flex-1 items-center justify-between gap-4 rounded-lg py-5 text-left text-sm font-medium text-white outline-none transition',
					'focus-visible:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
					props.class,
				)
			"
		>
			<slot />
			<Icon
				name="lucide:plus"
				class="shrink-0 text-lg text-zinc-500 transition duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:text-indigo-400"
			/>
		</AccordionTrigger>
	</AccordionHeader>
</template>
