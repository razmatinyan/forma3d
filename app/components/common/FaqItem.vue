<script setup lang="ts">
import { coursePrograms } from '~/data/course'

withDefaults(defineProps<{ itemKey: string; value: string; params?: Record<string, unknown> }>(), {
	params: () => ({}),
})
</script>

<template>
	<AccordionItem :value="value">
		<AccordionTrigger>
			<span class="flex items-center gap-2.5">
				<span v-if="itemKey === 'software'" class="flex items-center gap-1.5">
					<Icon
						v-for="program in coursePrograms"
						:key="program.key"
						:name="program.icon"
						class="size-4 shrink-0 text-zinc-500"
					/>
				</span>
				{{ $t(`faq.items.${itemKey}.question`) }}
			</span>
		</AccordionTrigger>
		<AccordionContent>{{ $t(`faq.items.${itemKey}.answer`, params) }}</AccordionContent>
	</AccordionItem>
</template>
