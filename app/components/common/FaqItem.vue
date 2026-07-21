<script setup lang="ts">
defineProps<{ itemKey: string; value: string }>()
</script>

<template>
	<AccordionItem :value="value">
		<AccordionTrigger>{{ $t(`faq.items.${itemKey}.question`) }}</AccordionTrigger>
		<AccordionContent>{{ $t(`faq.items.${itemKey}.answer`) }}</AccordionContent>
	</AccordionItem>
</template>
