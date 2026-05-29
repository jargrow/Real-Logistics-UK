import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

// UK city lat/lon → 3D sphere coords
function latLonToVec3(lat, lon, r = 1.55) {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

const CITIES = [
  { name: 'London',     lat:  51.5, lon: -0.12 },
  { name: 'Manchester', lat:  53.5, lon: -2.24 },
  { name: 'Birmingham', lat:  52.5, lon: -1.9  },
  { name: 'Edinburgh',  lat:  55.95,lon: -3.19 },
  { name: 'Cardiff',    lat:  51.48,lon: -3.18 },
  { name: 'Belfast',    lat:  54.6, lon: -5.93 },
]

const ROUTES = [
  [0,1],[0,2],[0,3],[1,2],[1,3],[2,4],[0,5],[3,5],[1,4],
]

function Globe() {
  const meshRef = useRef()
  const atmoRef = useRef()

  useFrame((_, d) => {
    if (meshRef.current) meshRef.current.rotation.y += d * 0.08
    if (atmoRef.current) atmoRef.current.rotation.y += d * 0.06
  })

  // Procedural globe texture using canvas
  const texture = useMemo(() => {
    const size = 512
    const c    = document.createElement('canvas')
    c.width    = size
    c.height   = size
    const ctx  = c.getContext('2d')

    // Ocean
    const grad = ctx.createLinearGradient(0, 0, 0, size)
    grad.addColorStop(0,   '#061428')
    grad.addColorStop(0.5, '#0A2040')
    grad.addColorStop(1,   '#061428')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)

    // Random "continent" patches
    ctx.fillStyle = 'rgba(26,60,100,0.6)'
    const rand = (seed) => {
      let s = seed; s = Math.sin(s) * 43758.5453123; return s - Math.floor(s)
    }
    for (let i = 0; i < 60; i++) {
      const x = rand(i * 7.3)  * size
      const y = rand(i * 3.7)  * size
      const w = rand(i * 2.1)  * 60 + 20
      const h = rand(i * 5.9)  * 40 + 10
      ctx.beginPath()
      ctx.ellipse(x, y, w, h, rand(i) * Math.PI, 0, Math.PI * 2)
      ctx.fill()
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(26,111,212,0.15)'
    ctx.lineWidth = 0.5
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = ((lat + 90) / 180) * size
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke()
    }
    for (let lon = 0; lon <= 360; lon += 20) {
      const x = (lon / 360) * size
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke()
    }

    return new THREE.CanvasTexture(c)
  }, [])

  // City positions
  const cityPositions = useMemo(
    () => CITIES.map(c => latLonToVec3(c.lat, c.lon)),
    [],
  )

  // Route curve points
  const routeGeometries = useMemo(() => {
    return ROUTES.map(([a, b]) => {
      const start = cityPositions[a]
      const end   = cityPositions[b]
      const mid   = new THREE.Vector3()
        .addVectors(start, end)
        .normalize()
        .multiplyScalar(1.9)
      const curve  = new THREE.QuadraticBezierCurve3(start, mid, end)
      const points = curve.getPoints(40)
      const geo    = new THREE.BufferGeometry().setFromPoints(points)
      return geo
    })
  }, [cityPositions])

  return (
    <group>
      {/* Globe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          shininess={8}
          specular={new THREE.Color('#1A6FD4')}
        />
        {/* Route lines attached to globe */}
        {routeGeometries.map((geo, i) => (
          <lineSegments key={i}>
            <bufferGeometry attach="geometry" {...geo} />
            <lineBasicMaterial attach="material" color="#1A6FD4" opacity={0.7} transparent linewidth={1} />
          </lineSegments>
        ))}
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmoRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#1A6FD4"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* City dots */}
      {cityPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#4A90E2" />
        </mesh>
      ))}
    </group>
  )
}

function FloatingBoxes() {
  const boxes = useRef([])
  const count = 6
  const data  = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      pos:   [Math.sin(i) * 3.5, Math.cos(i * 1.3) * 1.5, Math.sin(i * 0.7) * 2],
      speed: 0.3 + i * 0.1,
      phase: i * 1.1,
    })),
  [])

  useFrame((state) => {
    boxes.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = state.clock.elapsedTime
      mesh.position.y = data[i].pos[1] + Math.sin(t * data[i].speed + data[i].phase) * 0.3
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.007
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => boxes.current[i] = el} position={d.pos}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#1A6FD4"
            metalness={0.8}
            roughness={0.2}
            emissive="#0E4A9A"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </>
  )
}

function TruckMesh() {
  const grp  = useRef()
  const dir  = useRef(1)
  const posX = useRef(-4)

  useFrame((_, d) => {
    if (!grp.current) return
    posX.current += d * 1.2 * dir.current
    if (posX.current >  4.5) { dir.current = -1; grp.current.scale.x = -1 }
    if (posX.current < -4.5) { dir.current =  1; grp.current.scale.x =  1 }
    grp.current.position.x = posX.current
  })

  return (
    <group ref={grp} position={[-4, -2.2, 0]} scale={[1, 1, 1]}>
      {/* Body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.35, 0.35]} />
        <meshStandardMaterial color="#1A6FD4" metalness={0.7} roughness={0.3} emissive="#0E4A9A" emissiveIntensity={0.4} />
      </mesh>
      {/* Cab */}
      <mesh position={[0.55, 0.22, 0]}>
        <boxGeometry args={[0.35, 0.5, 0.35]} />
        <meshStandardMaterial color="#0E4A9A" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wheels */}
      {[[-0.3,-0.08],[0.4,-0.08]].map(([x,y],i) => (
        <mesh key={i} position={[x,y,0.2]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.1,0.1,0.06,16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.5], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]}  intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#1A6FD4" />
      <pointLight position={[0, 0, 6]}  intensity={0.5} color="#4A90E2" />

      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <Globe />
      <FloatingBoxes />
      <TruckMesh />
    </Canvas>
  )
}
