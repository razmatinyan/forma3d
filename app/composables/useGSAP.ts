import { toValue, type MaybeRefOrGetter } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/all'

if (import.meta.client) {
	gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Draggable)
}

export const useGSAP = () => {
	const animate = (
		fn: (ctx: gsap.Context) => void,
		scope?: MaybeRefOrGetter<HTMLElement | null | undefined>,
	) => {
		let ctx: gsap.Context

		onMounted(() => {
			const scopeElement = toValue(scope)
			ctx = gsap.context(() => {
				fn(ctx)
			}, scopeElement || undefined)
		})

		onBeforeUnmount(() => {
			if (ctx) ctx.revert()
		})
	}

	const motion = (
		queries: Record<string, string>,
		fn: (context: gsap.Context & { conditions: Record<string, boolean> }) => void | (() => void),
		scope?: MaybeRefOrGetter<HTMLElement | null | undefined>,
	) => {
		let mm: gsap.MatchMedia

		onMounted(() => {
			const scopeElement = toValue(scope)
			mm = gsap.matchMedia(scopeElement || undefined)
			mm.add(queries, fn)
		})

		onBeforeUnmount(() => {
			mm?.revert()
		})
	}

	return { gsap, SplitText, ScrollTrigger, CustomEase, Draggable, animate, motion }
}
