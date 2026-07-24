import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Core() {
  const group = useRef<THREE.Group>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      // 鼠标视差跟随
      group.current.rotation.y += (state.pointer.x * 0.5 - group.current.rotation.y) * 0.04
      group.current.rotation.x += (-state.pointer.y * 0.35 - group.current.rotation.x) * 0.04
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.35
    if (ring2.current) ring2.current.rotation.z -= delta * 0.22
    if (wire.current) {
      wire.current.rotation.y += delta * 0.12
      const s = 1 + Math.sin(t * 1.4) * 0.02
      wire.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        {/* 能量内核 */}
        <mesh>
          <sphereGeometry args={[0.85, 48, 48]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.16} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
        </mesh>
        {/* 线框外壳 */}
        <mesh ref={wire}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.18} />
        </mesh>
      </Float>

      {/* 轨道环 */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.15, 0.008, 12, 128]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[2.55, 0.006, 12, 128]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.45} />
      </mesh>

      <Sparkles count={90} scale={5.5} size={2.2} speed={0.35} color="#7dd3fc" opacity={0.7} />
    </group>
  )
}

/** Hero 区全息 AI 核心球体 */
export default function HoloSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label="可交互的三维全息 AI 核心"
    >
      <ambientLight intensity={0.5} />
      <Core />
    </Canvas>
  )
}
