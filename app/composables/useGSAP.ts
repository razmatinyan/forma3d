import { toValue, type MaybeRefOrGetter } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/all'

if (import.meta.client) {
	gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Draggable)
}

// power2.out decelerates evenly. expo.out covers most of its distance almost
// immediately then crawls, which on a large block reads as a stutter.
const revealFrom = { y: 24, opacity: 0, filter: 'blur(4px)' }
const revealTo = {
	y: 0,
	opacity: 1,
	filter: 'blur(0px)',
	duration: 0.7,
	ease: 'power2.out',
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
		fn: (
			context: gsap.Context & { conditions: gsap.Conditions },
		) => void | (() => void),
		scope?: MaybeRefOrGetter<HTMLElement | null | undefined>,
	) => {
		let mm: gsap.MatchMedia

		onMounted(() => {
			const scopeElement = toValue(scope)
			mm = gsap.matchMedia(scopeElement || undefined)
			// 'all' keeps the callback active when no other query matches
			mm.add({ all: 'all', ...queries }, fn as gsap.ContextFunc)
		})

		onBeforeUnmount(() => {
			mm?.revert()
		})
	}

	return {
		gsap,
		SplitText,
		ScrollTrigger,
		CustomEase,
		Draggable,
		animate,
		motion,
		revealFrom,
		revealTo,
	}
}
