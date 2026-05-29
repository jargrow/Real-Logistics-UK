import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1200 }) {
  const meshRef = useRef()

  const { positions, velocities, colors } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const vel  = new Float32Array(count * 3)
    const col  = new Float32Array(count * 3)
    const blue = new THREE.Color('#1A6FD4')
    const cyan = new THREE.Color('#4A90E2')
    const silv = new THREE.Color('#C0C0C0')

    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 20
      pos[i*3+1] = (Math.random() - 0.5) * 12
      pos[i*3+2] = (Math.random() - 0.5) * 8

      vel[i*3]   = (Math.random() - 0.5) * 0.01
      vel[i*3+1] = (Math.random() - 0.5) * 0.005
      vel[i*3+2] = 0

      const mix = Math.random()
      const c   = mix < 0.6 ? blue : mix < 0.85 ? cyan : silv
      col[i*3]   = c.r
      col[i*3+1] = c.g
      col[i*3+2] = c.b
    }
    return { positions: pos, velocities: vel, colors: col }
  }, [count])

  const geoRef = useRef()

  useFrame(() => {
    if (!geoRef.current) return
    const pos = geoRef.current.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i*3]   += velocities[i*3]
      pos[i*3+1] += velocities[i*3+1]

      if (pos[i*3]   >  10) pos[i*3]   = -10
      if (pos[i*3]   < -10) pos[i*3]   =  10
      if (pos[i*3+1] >   6) pos[i*3+1] =  -6
      if (pos[i*3+1] <  -6) pos[i*3+1] =   6
    }
    geoRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField({ height = '100%', opacity = 1 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent', height, opacity }}
      dpr={[1, 1.5]}
    >
      <Particles />
    </Canvas>
  )
}
