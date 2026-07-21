// Intl output is serialized from the server so hydration cannot disagree
function stable<T>(key: string, compute: () => T) {
	const state = useState<T>(key, compute)
	if (import.meta.client && state.value === undefined) state.value = compute()
	return state
}

export function useLocaleDate(iso: string, options: Intl.DateTimeFormatOptions, id: string) {
	const { locale } = useI18n()
	return computed(() =>
		stable(`d:${id}:${locale.value}`, () =>
			new Intl.DateTimeFormat(locale.value, options).format(new Date(iso)),
		).value,
	)
}

export function useLocaleNumber(value: number, id: string) {
	const { locale } = useI18n()
	return computed(() =>
		stable(`n:${id}:${locale.value}`, () =>
			new Intl.NumberFormat(locale.value).format(value),
		).value,
	)
}
