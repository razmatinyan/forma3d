<script setup lang="ts">
const props = defineProps<{ rowKey: string; icon: string; href: string; value?: string }>()

const isExternal = computed(() => props.href.startsWith('http'))
</script>

<template>
	<a
		:href="href"
		:target="isExternal ? '_blank' : undefined"
		:rel="isExternal ? 'noopener noreferrer' : undefined"
		class="contact-row group flex items-center gap-4 border-b border-white/10 p-5 outline-none transition last:border-b-0 hover:bg-white/[0.03] focus-visible:bg-white/[0.03] sm:p-6"
	>
		<span
			class="bezel flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition group-hover:text-indigo-300"
		>
			<Icon :name="icon" class="text-lg" />
		</span>
		<div>
			<p class="text-xs font-medium tracking-widest text-zinc-500">
				{{ $t(`contact.rows.${rowKey}.label`) }}
			</p>
			<p class="mt-1 text-sm text-zinc-200 transition group-hover:text-white">
				{{ value ?? $t(`contact.rows.${rowKey}.value`) }}
			</p>
		</div>
	</a>
</template>
