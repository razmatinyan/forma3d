<script setup lang="ts">
withDefaults(defineProps<{ itemKey: string; value: string; params?: Record<string, unknown> }>(), {
	params: () => ({}),
})
</script>

<template>
	<AccordionItem :value="value">
		<AccordionTrigger>{{ $t(`faq.items.${itemKey}.question`) }}</AccordionTrigger>
		<AccordionContent>{{ $t(`faq.items.${itemKey}.answer`, params) }}</AccordionContent>
	</AccordionItem>
</template>
