import { z } from 'zod'
import { courseOptions } from '../app/data/course'

export const localeCodes = ['hy', 'ru', 'en'] as const
export type LocaleCode = (typeof localeCodes)[number]

const courseValues = courseOptions.map(option => option.value)

export const registrationSchema = z.object({
	course: z.enum(courseValues),
	fullName: z.string().trim().min(2).max(120),
	phone: z.string().trim().min(6).max(32),
	email: z.string().trim().min(1).email(),
	consent: z.boolean().refine(value => value === true),
	locale: z.enum(localeCodes),
	// intentionally unconstrained: honeypot rejection happens in the handler, not here
	website: z.string().optional().default(''),
})

export type RegistrationInput = z.infer<typeof registrationSchema>
