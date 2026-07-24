import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/** 缓慢旋转 + 响应鼠标的粒子星空 */
function StarField({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += delta * 0.006
    // 鼠标轻微响应
    const { x, y } = state.pointer
    ref.current.rotation.y += (x * 0.12 - ref.current.rotation.y % 0.001) * 0.002
    state.camera.position.x += (x * 0.6 - state.camera.position.x) * 0.02
    state.camera.position.y += (-y * 0.4 - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7dd3fc"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  )
}

function NebulaGlow() {
  const { scene } = useThree()
  useMemo(() => {
    scene.fog = new THREE.FogExp2('#02010a', 0.045)
  }, [scene])
  return null
}

/** 全站背景三维粒子星空（懒加载挂载） */
export default function BackgroundScene() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <NebulaGlow />
        <StarField />
      </Canvas>
      {/* 深空渐变底色 + 顶部光晕 */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#131044_0%,#050218_45%,#02010a_100%)]" />
    </div>
  )
}
