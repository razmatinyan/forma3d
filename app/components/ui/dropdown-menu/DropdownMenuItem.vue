<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
	<DropdownMenuItem
		data-slot="dropdown-menu-item"
		v-bind="delegatedProps"
		:class="
			cn(
				'flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium uppercase tracking-widest text-zinc-400 outline-none transition',
				'data-highlighted:bg-white/5 data-highlighted:text-white',
				'data-[state=checked]:text-indigo-300',
				props.class,
			)
		"
	>
		<slot />
	</DropdownMenuItem>
</template>
