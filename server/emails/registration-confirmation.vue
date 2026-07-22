<script setup lang="ts">
defineProps<{
	fullName: string
	preheader: string
	heading: string
	greeting: string
	intro: string
	courseLabel: string
	courseName: string
	nextStepsHeading: string
	nextSteps: string[]
	contactLine: string
	footer: string
}>()
</script>

<script lang="ts">
export const previewProps = {
	fullName: 'Անի Հակոբյան',
	preheader: 'We received your application for the 3ds Max and Photoshop course.',
	heading: 'Pre-registration received',
	greeting: 'Hi',
	intro:
		'Thanks for registering interest in the 3ds Max and Adobe Photoshop course at Forma 3D. We received your details.',
	courseLabel: 'Course',
	courseName: '3ds Max and Adobe Photoshop',
	nextStepsHeading: 'What happens next',
	nextSteps: [
		'Our team reviews your application.',
		'We call you to confirm the group and schedule.',
		'You confirm your seat and get the date of the first session.',
	],
	contactLine: 'Questions before then? Call +374 55 123 456 or write to info@forma3d.am.',
	footer: 'Forma 3D, offline 3D modeling school in Yerevan.',
}
</script>

<template>
	<div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f5; padding: 32px 16px; color: #18181b;">
		<span style="display: none; max-height: 0; overflow: hidden;">{{ preheader }}</span>
		<div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden;">
			<div style="padding: 24px 32px; border-bottom: 1px solid #e4e4e7;">
				<span style="display: inline-block; width: 40px; height: 40px; line-height: 40px; text-align: center; background-color: #18181b; color: #ffffff; font-weight: 600; font-size: 13px; border-radius: 10px;">F3D</span>
				<span style="display: block; margin-top: 12px; font-size: 12px; letter-spacing: 0.08em; color: #71717a;">Forma 3D</span>
			</div>
			<div style="padding: 32px;">
				<h1 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #18181b;">{{ heading }}</h1>
				<p style="margin: 0 0 16px; font-size: 14px; line-height: 22px;">{{ greeting }} {{ fullName }},</p>
				<p style="margin: 0 0 16px; font-size: 14px; line-height: 22px;">{{ intro }}</p>
				<table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
					<tr>
						<td style="padding: 12px 16px 0; background-color: #f4f4f5; border-radius: 10px 10px 0 0; font-size: 12px; letter-spacing: 0.06em; color: #71717a;">{{ courseLabel }}</td>
					</tr>
					<tr>
						<td style="padding: 4px 16px 16px; background-color: #f4f4f5; border-radius: 0 0 10px 10px; font-size: 15px; font-weight: 600; color: #18181b;">{{ courseName }}</td>
					</tr>
				</table>
				<h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #18181b;">{{ nextStepsHeading }}</h2>
				<ol style="margin: 0 0 24px; padding-left: 20px; font-size: 14px; line-height: 22px;">
					<li v-for="(step, i) in nextSteps" :key="i" style="margin-bottom: 8px;">{{ step }}</li>
				</ol>
				<p style="margin: 0; font-size: 13px; line-height: 20px; color: #52525b;">{{ contactLine }}</p>
			</div>
			<div style="padding: 20px 32px; background-color: #fafafa; border-top: 1px solid #e4e4e7;">
				<p style="margin: 0; font-size: 12px; color: #a1a1aa;">{{ footer }}</p>
			</div>
		</div>
	</div>
</template>
