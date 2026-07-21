<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
	defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
	{ position: 'popper' },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<SelectPortal>
		<SelectContent
			data-slot="select-content"
			v-bind="forwarded"
			:class="
				cn(
					'surface-panel z-50 max-h-72 min-w-[var(--reka-select-trigger-width)] overflow-hidden rounded-xl border border-white/10 p-1',
					'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
					'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
					'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
					'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
					props.class,
				)
			"
			:style="{ boxShadow: 'var(--shadow-panel), 0 1rem 2rem rgba(0,0,0,0.4)' }"
		>
			<SelectViewport class="p-1">
				<slot />
			</SelectViewport>
		</SelectContent>
	</SelectPortal>
</template>
