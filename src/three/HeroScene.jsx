import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// ── Per-theme config ──────────────────────────────────────────
const T = {
  dark: {
    clear:      '#040D1E',
    fog:        '#040D1E',
    fogDensity: 0.030,
    ambient:    { color:'#0D1E3C', intensity:0.10 },
    key:        { color:'#1A5090', pos:[-5, 8, 3], intensity:0.7 },
    fill:       { color:'#0A2060', pos:[ 8, 3, 5], intensity:0.3 },
    box:        { color:'#0D1E38', emissive:'#1A6FD4', emissiveInt:0.14 },
    ray:        { color:'#1A6FD4', opacity:0.028 },
    particle:   { colors:['#1A6FD4','#4A90E2','#C0C0C0'], opacity:0.55 },
    stars:      1400,
  },
  black: {
    clear:      '#000000',
    fog:        '#000000',
    fogDensity: 0.035,
    ambient:    { color:'#080820', intensity:0.07 },
    key:        { color:'#1A3878', pos:[-5, 8, 3], intensity:0.9 },
    fill:       { color:'#0A1848', pos:[ 8, 3, 5], intensity:0.4 },
    box:        { color:'#0A0A1A', emissive:'#1A6FD4', emissiveInt:0.22 },
    ray:        { color:'#1A6FD4', opacity:0.038 },
    particle:   { colors:['#1A6FD4','#2A70C4','#707090'], opacity:0.65 },
    stars:      900,
  },
}

// ── Sets gl clear colour whenever theme changes ───────────────
function ClearColorSetter({ cfg }) {
  const { gl } = useThree()
  useEffect(() => { gl.setClearColor(cfg.clear, 1) }, [gl, cfg])
  return null
}

function SceneFog({ cfg }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(cfg.fog, cfg.fogDensity)
  }, [scene, cfg])
  return null
}

// ── Animated truck across lower viewport ─────────────────────
function Truck() {
  const grp    = useRef()
  const xPos   = useRef(16)
  const light1 = useRef()
  const light2 = useRef()

  useFrame((state, delta) => {
    if (!grp.current) return
    xPos.current -= delta * 2.8
    if (xPos.current < -18) xPos.current = 18
    grp.current.position.x = xPos.current
    const t = state.clock.elapsedTime
    const f = 0.92 + Math.sin(t * 60) * 0.08
    if (light1.current) light1.current.intensity = 3 * f
    if (light2.current) light2.current.intensity = 3 * f
  })

  const darkMetal = { color:'#08132A', metalness:0.95, roughness:0.15, emissive:'#030810', emissiveIntensity:0.3 }
  const cabMat    = { color:'#101E3C', metalness:0.9,  roughness:0.2,  emissive:'#0A1630', emissiveIntensity:0.4 }
  const glassMat  = { color:'#4A90E2', metalness:0.2,  roughness:0, transparent:true, opacity:0.55, emissive:'#1A6FD4', emissiveIntensity:0.5 }

  return (
    <group ref={grp} position={[16, -2.2, 0]}>
      {/* Trailer */}
      <mesh position={[-1.5, 0.65, 0]}>
        <boxGeometry args={[3.2, 1.3, 1.4]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Cab */}
      <mesh position={[0.8, 0.7, 0]}>
        <boxGeometry args={[0.95, 1.4, 1.4]} />
        <meshStandardMaterial {...cabMat} />
      </mesh>
      {/* Windscreen */}
      <mesh position={[1.29, 0.9, 0]}>
        <planeGeometry args={[0.01, 0.75]} />
        <meshStandardMaterial {...glassMat} side={THREE.DoubleSide} />
      </mesh>
      {/* Side window */}
      <mesh position={[0.82, 1.05, 0.71]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[0.55, 0.45]} />
        <meshStandardMaterial {...glassMat} side={THREE.DoubleSide} />
      </mesh>
      {/* RL logo panel */}
      <mesh position={[-1.5, 1.2, 0.71]}>
        <planeGeometry args={[1.2, 0.5]} />
        <meshStandardMaterial color="#1A6FD4" emissive="#1A6FD4" emissiveIntensity={0.5} />
      </mesh>
      {/* Front wheels */}
      {[0.55, -0.55].map((z, i) => (
        <group key={`fw${i}`} position={[0.6, -0.44, z]}>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 16]} />
            <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.24, 10]} />
            <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Rear wheels */}
      {[0.55, -0.55].map((z, i) => (
        <group key={`rw${i}`} position={[-1.6, -0.44, z]}>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 16]} />
            <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.24, 10]} />
            <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Headlights */}
      <pointLight ref={light1} position={[1.45, 0.0, 0.55]} color="#4A90E2" intensity={3} distance={10} />
      <pointLight ref={light2} position={[1.45, 0.0,-0.55]} color="#4A90E2" intensity={3} distance={10} />
      {/* Light cones */}
      <mesh position={[2.8, 0.1, 0.5]} rotation={[0, Math.PI/14, 0]}>
        <coneGeometry args={[0.6, 5, 8, 1, true]} />
        <meshBasicMaterial color="#4A90E2" transparent opacity={0.035} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[2.8, 0.1,-0.5]} rotation={[0,-Math.PI/14, 0]}>
        <coneGeometry args={[0.6, 5, 8, 1, true]} />
        <meshBasicMaterial color="#4A90E2" transparent opacity={0.035} side={THREE.DoubleSide} />
      </mesh>
      {/* Ground glow */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.62, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color="#1A6FD4" transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

// ── 12 cargo boxes spread across the FULL viewport Y range ────
function FloatingCargo({ cfg }) {
  const refs = useRef([])
  const data = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 22,   // X: -11 to +11
        (Math.random() - 0.5) * 11,   // Y:  -5.5 to +5.5
        -3.5 - Math.random() * 7,      // Z:  -3.5 to -10.5
      ],
      speed: 0.08 + Math.random() * 0.15,
      phase: i * 0.55,
      w: 0.18 + Math.random() * 0.30,
      h: 0.18 + Math.random() * 0.30,
      d: 0.18 + Math.random() * 0.30,
    })), [])

  useFrame((state) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = state.clock.elapsedTime
      mesh.position.y = data[i].pos[1] + Math.sin(t * data[i].speed + data[i].phase) * 0.5
      mesh.rotation.x += 0.003
      mesh.rotation.y += 0.005
      mesh.rotation.z += 0.002
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={d.pos}>
          <boxGeometry args={[d.w, d.h, d.d]} />
          <meshStandardMaterial
            color={cfg.box.color}
            metalness={0.88}
            roughness={0.22}
            emissive={cfg.box.emissive}
            emissiveIntensity={cfg.box.emissiveInt}
          />
        </mesh>
      ))}
    </>
  )
}

// ── Sweeping blue light rays from top ────────────────────────
function LightRays({ cfg }) {
  const raysRef = useRef([])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    raysRef.current.forEach((mesh, i) => {
      if (!mesh) return
      const base = cfg.ray.opacity + Math.sin(t * 0.7 + i * 1.2) * 0.01
      mesh.material.opacity = Math.max(0.005, base)
      mesh.rotation.y = Math.sin(t * 0.4 + i * 0.8) * 0.3
    })
  })
  return (
    <>
      {[
        { pos:[-7, 7,-4], rot:[0.12, 0, 0]   },
        { pos:[ 2, 7,-5], rot:[0.06,-0.2,0]  },
        { pos:[ 9, 7,-3], rot:[0.09, 0.15,0] },
        { pos:[-3, 7,-6], rot:[0.08,-0.1, 0] },
      ].map((r, i) => (
        <mesh key={i} ref={el => raysRef.current[i] = el} position={r.pos} rotation={r.rot}>
          <coneGeometry args={[2.5, 20, 6, 1, true]} />
          <meshBasicMaterial
            color={cfg.ray.color}
            transparent
            opacity={cfg.ray.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  )
}

// ── Ambient drift particles across full scene ─────────────────
function DriftParticles({ cfg, count = 600 }) {
  const geoRef = useRef()

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cs  = cfg.particle.colors.map(c => new THREE.Color(c))

    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 28
      pos[i*3+1] = (Math.random() - 0.5) * 14
      pos[i*3+2] = (Math.random() - 0.5) * 12

      vel[i*3]   = (Math.random() - 0.5) * 0.004
      vel[i*3+1] = 0.004 + Math.random() * 0.008
      vel[i*3+2] = 0

      const mix = Math.random()
      const c   = mix < 0.65 ? cs[0] : mix < 0.85 ? cs[1] : cs[2]
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
    }
    return { positions: pos, velocities: vel, colors: col }
  }, [count, cfg])

  useFrame(() => {
    if (!geoRef.current) return
    const pos = geoRef.current.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i*3]   += velocities[i*3]
      pos[i*3+1] += velocities[i*3+1]
      if (pos[i*3+1] >  8) pos[i*3+1] = -7
      if (pos[i*3]   > 14) pos[i*3]   = -14
      if (pos[i*3]   <-14) pos[i*3]   =  14
    }
    geoRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={cfg.particle.opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Export — accepts theme prop so Hero.jsx can control it ────
export default function HeroScene({ theme = 'dark' }) {
  const cfg = T[theme]
  return (
    <Canvas
      camera={{ position:[0, 0, 13], fov:55 }}
      gl={{ alpha:false, antialias:true, powerPreference:'high-performance' }}
      style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%' }}
      dpr={[1, 1.5]}
    >
      <ClearColorSetter cfg={cfg} />
      <SceneFog cfg={cfg} />
      <ambientLight color={cfg.ambient.color} intensity={cfg.ambient.intensity} />
      <pointLight position={cfg.key.pos}  color={cfg.key.color}  intensity={cfg.key.intensity}  distance={20} />
      <pointLight position={cfg.fill.pos} color={cfg.fill.color} intensity={cfg.fill.intensity} distance={20} />
      <Stars radius={80} depth={30} count={cfg.stars} factor={2.5} fade speed={0.15} />
      <Truck />
      <FloatingCargo cfg={cfg} />
      <LightRays cfg={cfg} />
      <DriftParticles cfg={cfg} />
    </Canvas>
  )
}
