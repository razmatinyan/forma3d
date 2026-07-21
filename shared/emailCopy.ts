import { site } from '../app/data/site'
import type { LocaleCode } from './registration'

export interface EmailCopy {
	subject: string
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
}

export const emailCopy: Record<LocaleCode, EmailCopy> = {
	en: {
		subject: 'Your Forma 3D pre-registration is confirmed',
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
		contactLine: `Questions before then? Call ${site.phone} or write to ${site.email}.`,
		footer: 'Forma 3D, offline 3D modeling school in Yerevan.',
	},
	ru: {
		subject: 'Ваша предварительная запись в Forma 3D подтверждена',
		preheader: 'Мы получили вашу заявку на курс 3ds Max и Photoshop.',
		heading: 'Заявка получена',
		greeting: 'Здравствуйте',
		intro:
			'Спасибо за интерес к курсу 3ds Max и Adobe Photoshop в Forma 3D. Мы получили ваши данные.',
		courseLabel: 'Курс',
		courseName: '3ds Max и Adobe Photoshop',
		nextStepsHeading: 'Что дальше',
		nextSteps: [
			'Мы рассматриваем вашу заявку.',
			'Мы позвоним вам, чтобы согласовать группу и расписание.',
			'Вы подтверждаете место и получаете дату первого занятия.',
		],
		contactLine: `Есть вопросы? Звоните ${site.phone} или пишите на ${site.email}.`,
		footer: 'Forma 3D, офлайн школа 3D моделирования в Ереване.',
	},
	hy: {
		subject: 'Ձեր նախնական գրանցումը Forma 3D-ում հաստատված է',
		preheader: 'Մենք ստացել ենք ձեր հայտը 3ds Max և Photoshop դասընթացի համար։',
		heading: 'Հայտը ստացվել է',
		greeting: 'Բարև Ձեզ',
		intro:
			'Շնորհակալություն Forma 3D-ի 3ds Max և Adobe Photoshop դասընթացի հանդեպ հետաքրքրության համար։ Մենք ստացել ենք ձեր տվյալները։',
		courseLabel: 'Դասընթաց',
		courseName: '3ds Max և Adobe Photoshop',
		nextStepsHeading: 'Հաջորդ քայլերը',
		nextSteps: [
			'Մենք ուսումնասիրում ենք ձեր հայտը։',
			'Զանգահարում ենք՝ խումբը և ժամանակացույցը հաստատելու համար։',
			'Դուք հաստատում եք ձեր տեղը և ստանում առաջին պարապմունքի ամսաթիվը։',
		],
		contactLine: `Հարցեր ունե՞ք։ Զանգահարեք ${site.phone} կամ գրեք ${site.email}-ին։`,
		footer: 'Forma 3D, 3D մոդելավորման դպրոց Երևանում։',
	},
}
