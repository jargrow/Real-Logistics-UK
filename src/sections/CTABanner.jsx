import { Suspense, lazy, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const ParticleField = lazy(() => import('../three/ParticleField'))

export default function CTABanner() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section ref={ref} className="relative py-36 overflow-hidden" style={{ background:'#000' }}>
      {/* Three.js particle background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ParticleField height="100%" opacity={0.7} />
        </Suspense>
      </div>

      {/* Radial blue glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(26,111,212,0.14) 0%, transparent 70%)' }} />

      {/* Top / bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[1]"
        style={{ background:'linear-gradient(90deg,transparent,#1A6FD4 40%,#4A90E2 60%,transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] z-[1]"
        style={{ background:'linear-gradient(90deg,transparent,rgba(26,111,212,0.3),transparent)' }} />

      <div className="relative z-[2] max-w-4xl mx-auto px-8 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
          <span className="section-label">Ready to Ship?</span>
          <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
        </motion.div>

        {/* Bebas Neue headline */}
        <motion.h2
          initial={{ opacity:0, y:40 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.1, duration:0.75, ease:[0.22,1,0.36,1] }}
          className="font-bebas text-white leading-none mb-4"
          style={{ fontSize:'clamp(64px,11vw,130px)' }}
        >
          READY TO{' '}
          <motion.span
            animate={inView ? { opacity:[0.6,1,0.6] } : {}}
            transition={{ duration:2.5, repeat:Infinity }}
            style={{
              color:'#1A6FD4',
              textShadow:'0 0 40px rgba(26,111,212,0.5)',
            }}
          >
            SHIP?
          </motion.span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.25, duration:0.6 }}
          className="font-dm text-base mb-12 max-w-lg mx-auto leading-relaxed"
          style={{ color:'#888' }}
        >
          Get your free quote in 60 seconds. No obligation — we'll confirm
          pricing and dispatch within <strong style={{ color:'#C0C0C0' }}>15 minutes</strong>.
        </motion.p>

        {/* Big CTA button — pill style */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ delay:0.35, duration:0.5 }}
          whileHover={{ scale:1.05 }}
          whileTap={{ scale:0.97 }}
        >
          <Link
            to="/quote"
            className="inline-flex items-center gap-3 px-14 py-5 font-bebas tracking-widest cursor-pointer btn-pulse relative overflow-hidden"
            style={{
              fontSize:'clamp(18px,2.5vw,22px)',
              background:'linear-gradient(135deg,#1A6FD4,#0E4A9A)',
              letterSpacing:'0.14em',
              borderRadius:'999px',
              boxShadow:'0 0 40px rgba(26,111,212,0.55), 0 0 80px rgba(26,111,212,0.2)',
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            START MY QUOTE NOW →
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.55 }}
          className="font-mono-rl text-[11px] mt-6 tracking-widest"
          style={{ color:'#444' }}
        >
          NO OBLIGATION · FULLY INSURED · RESPONSE IN 15 MINS
        </motion.p>
      </div>
    </section>
  )
}
