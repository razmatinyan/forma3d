import type * as THREE from 'three'
import type { SceneFactory } from './types'

export const createHeroWireframe: SceneFactory = (three) => {
	const scene = new three.Scene()
	const camera = new three.PerspectiveCamera(45, 1, 0.1, 100)
	camera.position.set(0, 0.9, 7)

	const group = new three.Group()
	scene.add(group)

	const lineMaterial = new three.LineBasicMaterial({ color: 0xd4d4d8, transparent: true, opacity: 0.72 })
	const faintMaterial = new three.LineBasicMaterial({ color: 0x71717a, transparent: true, opacity: 0.34 })

	function addWireBox(width: number, height: number, depth: number, y: number, material: THREE.LineBasicMaterial) {
		const geometry = new three.BoxGeometry(width, height, depth)
		const edges = new three.EdgesGeometry(geometry)
		const mesh = new three.LineSegments(edges, material)
		mesh.position.y = y
		group.add(mesh)
		return mesh
	}

	function addWireTorus(radius: number, tube: number, y: number, material: THREE.LineBasicMaterial) {
		const geometry = new three.TorusGeometry(radius, tube, 18, 96)
		const wire = new three.WireframeGeometry(geometry)
		const mesh = new three.LineSegments(wire, material)
		mesh.rotation.x = Math.PI / 2
		mesh.position.y = y
		group.add(mesh)
		return mesh
	}

	const top = addWireBox(1.65, 0.24, 1.65, 1.05, faintMaterial)
	const bottom = addWireBox(1.75, 0.2, 1.75, -1.08, faintMaterial)
	addWireBox(2.1, 1.25, 2.1, 0, lineMaterial)
	const ringA = addWireTorus(1.85, 0.018, 0.55, lineMaterial)
	const ringB = addWireTorus(2.35, 0.014, -0.55, faintMaterial)

	const nodeMaterial = new three.LineBasicMaterial({ color: 0xf4f4f5, transparent: true, opacity: 0.55 })
	for (let i = 0; i < 8; i++) {
		const angle = (i / 8) * Math.PI * 2
		const geometry = new three.BoxGeometry(0.24, 0.24, 0.24)
		const edges = new three.EdgesGeometry(geometry)
		const node = new three.LineSegments(edges, nodeMaterial)
		node.position.set(Math.cos(angle) * 2.55, Math.sin(i) * 0.34, Math.sin(angle) * 2.55)
		group.add(node)
	}

	function tick(elapsed: number) {
		group.rotation.y += 0.004
		group.rotation.x = Math.sin(elapsed) * 0.08
		top.position.y = 1.05 + Math.sin(elapsed * 1.2) * 0.06
		bottom.position.y = -1.08 + Math.cos(elapsed * 1.1) * 0.05
		ringA.rotation.z += 0.003
		ringB.rotation.z -= 0.002
	}

	return { scene, camera, tick }
}
