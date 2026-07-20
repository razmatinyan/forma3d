import type { Ref } from 'vue'
import type { SceneFactory, SceneHandle } from '~/three/types'

export function useThreeScene(target: Ref<HTMLElement | null>, factory: SceneFactory) {
	if (import.meta.server) return

	let THREE: typeof import('three') | null = null
	let renderer: import('three').WebGLRenderer | null = null
	let handle: SceneHandle | null = null
	let canvas: HTMLCanvasElement | null = null
	let intersectionObserver: IntersectionObserver | null = null
	let resizeObserver: ResizeObserver | null = null
	let rafId = 0
	let time = 0
	let started = false
	let visible = false

	function prefersReducedMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches
	}

	function resize() {
		const el = target.value
		if (!renderer || !handle || !el) return
		const { clientWidth: width, clientHeight: height } = el
		if (width === 0 || height === 0) return
		renderer.setSize(width, height, false)
		handle.camera.aspect = width / height
		handle.camera.updateProjectionMatrix()
	}

	function renderFrame() {
		if (!renderer || !handle) return
		renderer.render(handle.scene, handle.camera)
	}

	function loop() {
		if (!renderer || !handle) return
		time += 0.01
		handle.tick(time)
		renderFrame()
		rafId = requestAnimationFrame(loop)
	}

	function play() {
		if (!renderer || !handle || rafId || document.hidden) return
		if (prefersReducedMotion()) {
			renderFrame()
			return
		}
		loop()
	}

	function pause() {
		if (rafId) {
			cancelAnimationFrame(rafId)
			rafId = 0
		}
	}

	function onVisibilityChange() {
		if (document.hidden) pause()
		else if (visible) play()
	}

	async function init() {
		const el = target.value
		if (!el || started) return
		started = true

		THREE = await import('three')
		canvas = document.createElement('canvas')
		canvas.className = 'absolute inset-0 h-full w-full'
		el.appendChild(canvas)

		renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
		renderer.outputColorSpace = THREE.SRGBColorSpace

		handle = factory(THREE)
		resize()

		resizeObserver = new ResizeObserver(() => resize())
		resizeObserver.observe(el)

		if (visible) play()
	}

	function onIntersect(entries: IntersectionObserverEntry[]) {
		visible = !!entries[0]?.isIntersecting
		if (visible) {
			if (!started) void init()
			else play()
		} else {
			pause()
		}
	}

	function teardown() {
		pause()
		intersectionObserver?.disconnect()
		resizeObserver?.disconnect()
		document.removeEventListener('visibilitychange', onVisibilityChange)

		if (handle) {
			handle.scene.traverse((object) => {
				const mesh = object as unknown as { geometry?: { dispose: () => void }, material?: unknown }
				mesh.geometry?.dispose()
				const material = mesh.material as { dispose?: () => void } | { dispose?: () => void }[] | undefined
				if (Array.isArray(material)) material.forEach(m => m.dispose?.())
				else material?.dispose?.()
			})
		}

		renderer?.dispose()
		renderer?.forceContextLoss()
		renderer = null
		handle = null
		canvas?.remove()
		canvas = null
		started = false
	}

	onMounted(() => {
		const el = target.value
		if (!el) return
		document.addEventListener('visibilitychange', onVisibilityChange)
		intersectionObserver = new IntersectionObserver(onIntersect, { threshold: 0.05 })
		intersectionObserver.observe(el)
	})

	onBeforeUnmount(() => {
		teardown()
	})
}
