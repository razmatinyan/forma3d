<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<CheckboxRoot
		data-slot="checkbox"
		v-bind="forwarded"
		:class="
			cn(
				'bezel flex size-5 shrink-0 items-center justify-center rounded-md border border-white/15 outline-none transition',
				'focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
				'data-[state=checked]:border-indigo-400/60 data-[state=checked]:bg-indigo-500/20',
				'aria-invalid:border-red-400/60',
				props.class,
			)
		"
	>
		<CheckboxIndicator data-slot="checkbox-indicator" class="flex items-center justify-center text-indigo-300">
			<Icon name="lucide:check" class="size-3.5" />
		</CheckboxIndicator>
	</CheckboxRoot>
</template>
