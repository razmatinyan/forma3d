<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
	defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
	{ sideOffset: 8, align: 'end' },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<DropdownMenuPortal>
		<DropdownMenuContent
			data-slot="dropdown-menu-content"
			v-bind="forwarded"
			:class="
				cn(
					'surface-panel z-50 min-w-36 overflow-hidden rounded-xl border border-white/10 p-1',
					'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
					props.class,
				)
			"
			:style="{ boxShadow: 'var(--shadow-panel), 0 1rem 2rem rgba(0,0,0,0.4)' }"
		>
			<slot />
		</DropdownMenuContent>
	</DropdownMenuPortal>
</template>
