import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL = 4
const SPRING = { stiffness: 150, damping: 18, mass: 0.5 }

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springX = useSpring(mouseX, SPRING)
  const springY = useSpring(mouseY, SPRING)

  // Trail positions — each slightly more lagged
  const trailX = Array.from({ length: TRAIL }, (_, i) =>
    useSpring(mouseX, { stiffness: 150 - i * 25, damping: 18 + i * 4, mass: 0.5 + i * 0.15 })
  )
  const trailY = Array.from({ length: TRAIL }, (_, i) =>
    useSpring(mouseY, { stiffness: 150 - i * 25, damping: 18 + i * 4, mass: 0.5 + i * 0.15 })
  )

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const attach = () => {
      document.querySelectorAll('a,button,[role="button"],.cursor-pointer').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      obs.disconnect()
    }
  }, [mouseX, mouseY])

  const truckW = clicking ? 24 : hovering ? 42 : 32
  const truckH = truckW * 0.62

  return (
    <>
      {/* Trail dots — rendered back to front */}
      {trailX.map((tx, i) => {
        const size = 7 - i * 1.4
        const opacity = 0.55 - i * 0.12
        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 z-[9994] pointer-events-none rounded-full"
            style={{
              x: tx,
              y: trailY[i],
              width:  size,
              height: size,
              translateX: -size / 2,
              translateY: -size / 2,
              background: '#1A6FD4',
              opacity,
              boxShadow: `0 0 ${8 - i * 1.5}px rgba(26,111,212,0.8)`,
            }}
          />
        )
      })}

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9996] pointer-events-none rounded-full"
        style={{
          x: springX,
          y: springY,
          width:  hovering ? 60 : 46,
          height: hovering ? 60 : 46,
          translateX: hovering ? -30 : -23,
          translateY: hovering ? -30 : -23,
          border: `1.5px solid rgba(26,111,212,${hovering ? 0.9 : 0.45})`,
          boxShadow: hovering
            ? '0 0 20px rgba(26,111,212,0.5), 0 0 40px rgba(26,111,212,0.2)'
            : '0 0 8px rgba(26,111,212,0.15)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, translate 0.2s ease',
        }}
        animate={{ scale: clicking ? 0.8 : 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Truck cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: -(truckW / 2),
          translateY: -(truckH / 2),
        }}
        animate={{ scale: clicking ? 0.8 : hovering ? 1.5 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <svg
          width={truckW}
          height={truckH}
          viewBox="0 0 52 34"
          fill="none"
          style={{
            transition: 'width 0.15s ease, height 0.15s ease',
            filter: hovering
              ? 'drop-shadow(0 0 10px rgba(26,111,212,1)) drop-shadow(0 0 22px rgba(26,111,212,0.7))'
              : 'drop-shadow(0 0 5px rgba(26,111,212,0.65))',
          }}
        >
          <rect x="2"  y="8"  width="30" height="16" rx="1.5" fill="#1A6FD4" stroke="#C0C0C0" strokeWidth="0.8"/>
          <text x="10" y="20" fontSize="8" fontWeight="800" fill="white" fontFamily="sans-serif">RL</text>
          <rect x="31" y="6"  width="16" height="18" rx="2"   fill="#0E4A9A" stroke="#C0C0C0" strokeWidth="0.8"/>
          <rect x="34" y="8"  width="10" height="7"  rx="1"   fill="#4A90E2" opacity="0.9"/>
          <rect x="4"  y="22" width="40" height="4"  rx="1"   fill="#050A14"/>
          <rect x="46" y="4"  width="2"  height="9"  rx="1"   fill="#888"/>
          <circle cx="40" cy="28" r="5"   fill="#111" stroke="#C0C0C0" strokeWidth="1.5"/>
          <circle cx="40" cy="28" r="2.2" fill="#555"/>
          <circle cx="12" cy="28" r="5"   fill="#111" stroke="#C0C0C0" strokeWidth="1.5"/>
          <circle cx="12" cy="28" r="2.2" fill="#555"/>
          <circle cx="48" cy="17" r="2"   fill="#FFD700" opacity="0.95"/>
          <circle cx="48" cy="17" r="4"   fill="#4A90E2" opacity="0.25"/>
        </svg>
      </motion.div>
    </>
  )
}
