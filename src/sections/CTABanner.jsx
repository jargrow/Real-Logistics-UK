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

        {/* CTA buttons row */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ delay:0.35, duration:0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary quote button */}
          <motion.div whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
            <Link
              to="/quote"
              className="inline-flex items-center gap-3 px-12 py-5 font-bebas tracking-widest cursor-pointer btn-pulse relative overflow-hidden"
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

          {/* WhatsApp button */}
          <motion.a
            href="https://wa.me/447359629231"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:0.97 }}
            className="inline-flex items-center gap-3 px-8 py-5 font-bebas tracking-widest cursor-pointer"
            style={{
              fontSize:'clamp(16px,2vw,19px)',
              letterSpacing:'0.12em',
              borderRadius:'999px',
              background:'linear-gradient(135deg,#25D366,#128C7E)',
              boxShadow:'0 0 30px rgba(37,211,102,0.45), 0 0 60px rgba(37,211,102,0.18)',
              color:'#fff',
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WHATSAPP US
          </motion.a>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity:0, y:10 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {[
            { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label:'Fully Insured' },
            { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label:'Response in 15 Mins' },
            { icon:'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', label:'No Obligation' },
          ].map(p => (
            <div key={p.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
              </svg>
              <span className="font-mono-rl text-[10px] tracking-[0.18em] uppercase text-white">{p.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
