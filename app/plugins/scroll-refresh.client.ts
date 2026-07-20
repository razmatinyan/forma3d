export default defineNuxtPlugin(() => {
	const { ScrollTrigger } = useGSAP()
	document.fonts.ready.then(() => ScrollTrigger.refresh())
})
