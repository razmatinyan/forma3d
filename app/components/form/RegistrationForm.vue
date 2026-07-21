<script setup lang="ts">
import { registrationSchema } from '#shared/registration'
import { courseOptions } from '~/data/course'

const { t, locale } = useI18n()

const form = reactive({
	course: courseOptions[0]?.value ?? '',
	fullName: '',
	phone: '',
	email: '',
	consent: false,
	website: '',
})

const selectedCourse = computed(() => courseOptions.find(o => o.value === form.course))

const errors = ref<Record<string, string>>({})
const status = ref<'idle' | 'submitting' | 'success'>('idle')
const submitError = ref('')

const ids = {
	course: 'register-course',
	fullName: 'register-fullName',
	phone: 'register-phone',
	email: 'register-email',
	consent: 'register-consent',
}

function clearError(field: string) {
	if (errors.value[field]) {
		const next = { ...errors.value }
		delete next[field]
		errors.value = next
	}
}

async function onSubmit() {
	submitError.value = ''

	const result = registrationSchema.safeParse({ ...form, locale: locale.value })
	if (!result.success) {
		const next: Record<string, string> = {}
		for (const issue of result.error.issues) {
			const key = String(issue.path[0])
			if (!next[key]) next[key] = t(`register.form.errors.${key}`)
		}
		errors.value = next
		return
	}

	errors.value = {}
	status.value = 'submitting'
	try {
		await $fetch('/api/register', { method: 'POST', body: result.data })
		status.value = 'success'
	}
	catch {
		status.value = 'idle'
		submitError.value = t('register.form.errors.generic')
	}
}
</script>

<template>
	<div>
		<form v-if="status !== 'success'" novalidate class="space-y-5" @submit.prevent="onSubmit">
			<div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
				<label :for="`${ids.fullName}-website`">Website</label>
				<input :id="`${ids.fullName}-website`" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
			</div>

			<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<Label :for="ids.course" class="mb-2 block">{{ t('register.form.course.label') }}</Label>
					<Select v-model="form.course" @update:model-value="clearError('course')">
						<SelectTrigger
							:id="ids.course"
							:aria-invalid="!!errors.course"
							:aria-describedby="errors.course ? `${ids.course}-error` : undefined"
						>
							<span class="flex items-center gap-2.5">
								<Icon
									v-if="selectedCourse"
									:name="selectedCourse.icon"
									class="size-4 shrink-0 text-zinc-400"
								/>
								<SelectValue :placeholder="t('register.form.course.placeholder')" />
							</span>
						</SelectTrigger>
						<SelectContent>
							<SelectItem v-for="option in courseOptions" :key="option.value" :value="option.value">
								<span class="flex items-center gap-2.5">
									<Icon :name="option.icon" class="size-4 shrink-0" />
									{{ t(`register.form.course.options.${option.key}`) }}
								</span>
							</SelectItem>
						</SelectContent>
					</Select>
					<p v-if="errors.course" :id="`${ids.course}-error`" class="mt-2 text-xs text-red-400">
						{{ errors.course }}
					</p>
				</div>

				<div>
					<Label :for="ids.fullName" class="mb-2 block">{{ t('register.form.fields.fullName.label') }}</Label>
					<Input
						:id="ids.fullName"
						v-model="form.fullName"
						type="text"
						:placeholder="t('register.form.fields.fullName.placeholder')"
						:aria-invalid="!!errors.fullName"
						:aria-describedby="errors.fullName ? `${ids.fullName}-error` : undefined"
						class="h-12 rounded-xl border-white/10 bg-black/40 px-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400/50"
						style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.9)"
						@input="clearError('fullName')"
					/>
					<p v-if="errors.fullName" :id="`${ids.fullName}-error`" class="mt-2 text-xs text-red-400">
						{{ errors.fullName }}
					</p>
				</div>

				<div>
					<Label :for="ids.phone" class="mb-2 block">{{ t('register.form.fields.phone.label') }}</Label>
					<Input
						:id="ids.phone"
						v-model="form.phone"
						type="tel"
						:placeholder="t('register.form.fields.phone.placeholder')"
						:aria-invalid="!!errors.phone"
						:aria-describedby="errors.phone ? `${ids.phone}-error` : undefined"
						class="h-12 rounded-xl border-white/10 bg-black/40 px-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400/50"
						style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.9)"
						@input="clearError('phone')"
					/>
					<p v-if="errors.phone" :id="`${ids.phone}-error`" class="mt-2 text-xs text-red-400">
						{{ errors.phone }}
					</p>
				</div>

				<div class="sm:col-span-2">
					<Label :for="ids.email" class="mb-2 block">{{ t('register.form.fields.email.label') }}</Label>
					<Input
						:id="ids.email"
						v-model="form.email"
						type="email"
						:placeholder="t('register.form.fields.email.placeholder')"
						:aria-invalid="!!errors.email"
						:aria-describedby="errors.email ? `${ids.email}-error` : undefined"
						class="h-12 rounded-xl border-white/10 bg-black/40 px-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus-visible:border-white/25 focus-visible:ring-2 focus-visible:ring-indigo-400/50"
						style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.9)"
						@input="clearError('email')"
					/>
					<p v-if="errors.email" :id="`${ids.email}-error`" class="mt-2 text-xs text-red-400">
						{{ errors.email }}
					</p>
				</div>
			</div>

			<div class="flex items-start gap-3">
				<Checkbox
					:id="ids.consent"
					v-model="form.consent"
					class="mt-0.5"
					:aria-invalid="!!errors.consent"
					:aria-describedby="errors.consent ? `${ids.consent}-error` : undefined"
					@update:model-value="clearError('consent')"
				/>
				<div>
					<Label :for="ids.consent" class="text-sm font-normal tracking-normal text-zinc-400">
						<i18n-t keypath="register.form.consent.label" tag="span" scope="global">
							<template #link>
								<NuxtLink to="/privacy" class="text-indigo-300 underline underline-offset-2 hover:text-indigo-200">
									{{ t('register.form.consent.linkText') }}
								</NuxtLink>
							</template>
						</i18n-t>
					</Label>
					<p v-if="errors.consent" :id="`${ids.consent}-error`" class="mt-2 text-xs text-red-400">
						{{ errors.consent }}
					</p>
				</div>
			</div>

			<p v-if="submitError" role="alert" class="text-xs text-red-400">{{ submitError }}</p>

			<AppButton type="submit" variant="solid" size="lg" :disabled="status === 'submitting'" class="w-full sm:w-auto">
				{{ status === 'submitting' ? t('register.form.submitting') : t('register.form.submit') }}
			</AppButton>
		</form>

		<div
			v-else
			class="surface-panel rounded-xl border border-white/10 p-6 sm:p-8"
			role="status"
		>
			<Icon name="solar:check-circle-linear" class="text-3xl text-emerald-400" />
			<h3 class="mt-4 text-lg font-medium text-white">{{ t('register.success.title') }}</h3>
			<p class="mt-2 max-w-md text-sm leading-6 text-zinc-400">{{ t('register.success.description') }}</p>
		</div>
	</div>
</template>
