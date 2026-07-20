import { toValue, type MaybeRefOrGetter } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/all'

if (process.client) {
	gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Draggable)
}

export const useGSAP = () => {
	const animate = (
		fn: (ctx: gsap.Context) => void,
		scope?: MaybeRefOrGetter<HTMLElement | null | undefined>,
	) => {
		const scopeElement = toValue(scope)
		let ctx: gsap.Context

		onMounted(() => {
			ctx = gsap.context(() => {
				fn(ctx)
			}, scopeElement || undefined)
		})

		onUnmounted(() => {
			if (ctx) ctx.revert()
		})
	}

	return { gsap, SplitText, ScrollTrigger, CustomEase, Draggable, animate }
}
