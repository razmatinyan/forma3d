<script setup lang="ts">
defineProps<{
	fullName: string
	phone: string
	email: string
	courseName: string
	locale: string
}>()
</script>

<script lang="ts">
export const previewProps = {
	fullName: 'Անի Հակոբյան',
	phone: '+374 55 123 456',
	email: 'ani@example.com',
	courseName: '3ds Max and Adobe Photoshop',
	locale: 'hy',
}
</script>

<template>
	<div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f5; padding: 32px 16px; color: #18181b;">
		<div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 32px;">
			<h1 style="margin: 0 0 20px; font-size: 18px; font-weight: 600;">New pre-registration</h1>
			<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
				<tr>
					<td style="padding: 8px 0; color: #71717a; width: 120px;">Name</td>
					<td style="padding: 8px 0; font-weight: 600;">{{ fullName }}</td>
				</tr>
				<tr>
					<td style="padding: 8px 0; color: #71717a;">Phone</td>
					<td style="padding: 8px 0;">{{ phone }}</td>
				</tr>
				<tr>
					<td style="padding: 8px 0; color: #71717a;">Email</td>
					<td style="padding: 8px 0;">{{ email }}</td>
				</tr>
				<tr>
					<td style="padding: 8px 0; color: #71717a;">Course</td>
					<td style="padding: 8px 0;">{{ courseName }}</td>
				</tr>
				<tr>
					<td style="padding: 8px 0; color: #71717a;">Submitted in</td>
					<td style="padding: 8px 0;">{{ locale }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
