import { faqItems, getFaqParams } from '~/data/course'
import { site } from '~/data/site'

export function useJsonLd() {
	const { t, locale } = useI18n()

	function courseSchema() {
		return {
			'@context': 'https://schema.org',
			'@type': 'Course',
			name: t('course.title'),
			description: t('course.description'),
			provider: {
				'@type': 'EducationalOrganization',
				name: t('common.brandName'),
				sameAs: [site.instagramUrl],
			},
			hasCourseInstance: {
				'@type': 'CourseInstance',
				courseMode: 'Onsite',
				courseWorkload: `PT${site.course.sessionHours}H`,
				startDate: site.course.nextStartDate,
				location: {
					'@type': 'Place',
					name: t('common.brandName'),
					address: t('contact.rows.address.value'),
				},
			},
		}
	}

	function organizationSchema() {
		return {
			'@context': 'https://schema.org',
			'@type': 'EducationalOrganization',
			name: t('common.brandName'),
			url: site.siteUrl,
			telephone: site.phone,
			email: site.email,
			sameAs: [site.instagramUrl],
			address: {
				'@type': 'PostalAddress',
				streetAddress: t('contact.rows.address.value'),
				addressLocality: 'Yerevan',
				addressCountry: 'AM',
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: site.addressGeo.lat,
				longitude: site.addressGeo.lng,
			},
		}
	}

	function faqSchema() {
		const params = getFaqParams(locale.value)
		return {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqItems.map(item => ({
				'@type': 'Question',
				name: t(`faq.items.${item.key}.question`),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t(`faq.items.${item.key}.answer`, params[item.key] ?? {}),
				},
			})),
		}
	}

	return { courseSchema, organizationSchema, faqSchema }
}
