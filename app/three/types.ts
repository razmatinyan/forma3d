import type * as THREE from 'three'

export interface SceneHandle {
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera
	tick: (elapsed: number) => void
}

export type SceneFactory = (three: typeof THREE) => SceneHandle
