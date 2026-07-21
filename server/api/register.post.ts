import { emailCopy } from '#shared/emailCopy'
import { registrationSchema } from '#shared/registration'
import { site } from '../../app/data/site'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string) {
	const now = Date.now()
	const entry = hits.get(ip)
	if (!entry || entry.resetAt < now) {
		hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
		return true
	}
	if (entry.count >= RATE_LIMIT_MAX) return false
	entry.count += 1
	return true
}

export default defineEventHandler(async event => {
	const body = await readBody(event)
	const parsed = registrationSchema.safeParse(body)

	if (!parsed.success) {
		throw createError({ statusCode: 400, statusMessage: 'validation_failed', data: parsed.error.flatten() })
	}

	const data = parsed.data

	if (data.website) {
		throw createError({ statusCode: 422, statusMessage: 'invalid_submission' })
	}

	const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
	if (!checkRateLimit(ip)) {
		throw createError({ statusCode: 429, statusMessage: 'too_many_requests' })
	}

	const { sendEmail } = useEmail()

	const adminResult = await sendEmail({
		to: site.email,
		subject: `New pre-registration: ${data.fullName}`,
		template: 'registration-notification',
		props: {
			fullName: data.fullName,
			phone: data.phone,
			email: data.email,
			courseName: emailCopy.en.courseName,
			locale: data.locale,
		},
	})

	if (!adminResult.success) {
		throw createError({ statusCode: 502, statusMessage: 'notification_failed' })
	}

	const copy = emailCopy[data.locale]
	const confirmResult = await sendEmail({
		to: data.email,
		subject: copy.subject,
		template: 'registration-confirmation',
		props: {
			fullName: data.fullName,
			preheader: copy.preheader,
			heading: copy.heading,
			greeting: copy.greeting,
			intro: copy.intro,
			courseLabel: copy.courseLabel,
			courseName: copy.courseName,
			nextStepsHeading: copy.nextStepsHeading,
			nextSteps: copy.nextSteps,
			contactLine: copy.contactLine,
			footer: copy.footer,
		},
		replyTo: site.email,
	})

	if (!confirmResult.success) {
		console.error('registration confirmation email failed', confirmResult.error)
	}

	return { success: true }
})
