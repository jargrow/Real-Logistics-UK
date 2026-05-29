import { Suspense, lazy, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const GlobeScene = lazy(() => import('../three/GlobeScene'))

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const values = [
  { icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title:'Transparency', desc:'Every delivery is tracked, photographed, and reported. No surprises, no excuses.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Reliability', desc:'We don\'t promise what we can\'t deliver. Our SLA record speaks for itself.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Speed', desc:'Same-day is our standard, not a premium add-on. We built the company around it.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title:'Partnership', desc:'We treat every business client like a long-term partner, not a transaction.' },
]

const stats = [
  { n:'500+', l:'Monthly Deliveries' },
  { n:'98%',  l:'On-Time Rate'       },
  { n:'24/7', l:'Operations'         },
  { n:'50+',  l:'UK Cities Covered'  },
]

function Section({ children, bg='#000' }) {
  return <section style={{ background:bg }}>{children}</section>
}

export default function About() {
  const valRef  = useRef(null)
  const valView = useInView(valRef, { once:true, margin:'-60px' })

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" style={{ background:'#000' }}>
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <GlobeScene />
          </Suspense>
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.95) 100%)' }} />
        <div className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="section-label mb-3">About Us</motion.p>
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
              className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
              Built on Trust,<br /><span className="text-gradient">Driven by Speed</span>
            </motion.h1>
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
              className="text-sm md:text-base leading-relaxed" style={{ color:'#888' }}>
              Real Logistics Limited was founded with a single mission: to make UK logistics genuinely reliable.
              We combine the agility of a local courier with the scale of a national freight network.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14" style={{ background:'rgba(26,111,212,0.05)', borderTop:'1px solid rgba(26,111,212,0.12)', borderBottom:'1px solid rgba(26,111,212,0.12)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s,i) => (
              <motion.div key={s.l}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-1" style={{ color:'#4A90E2' }}>{s.n}</div>
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color:'#888' }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6" style={{ background:'#050508' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7 }}
          >
            <p className="section-label mb-3">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Why We Started Real Logistics</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color:'#888' }}>
              <p>Our founder experienced firsthand how a missed delivery could cost a business tens of thousands of pounds — and how couriers simply didn't care. That frustration became the fuel for Real Logistics.</p>
              <p>We launched with a simple promise: <strong style={{ color:'#C0C0C0' }}>real trust, real time, real solutions</strong>. That means answering the phone, arriving when we say, and treating your cargo like it matters — because to your business, it does.</p>
              <p>Today we operate a growing fleet of vans across the UK, serving manufacturers, retailers, healthcare providers and small businesses who can't afford to gamble on their logistics.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80',
                'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80',
                'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80',
                'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
              ].map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio:'4/3' }}>
                  <img src={url} alt="Real Logistics fleet" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section ref={valRef} className="py-24 px-6" style={{ background:'#000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:30 }} animate={valView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.7 }} className="text-center mb-14">
            <p className="section-label mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v,i) => (
              <motion.div key={v.title}
                initial={{ opacity:0, y:30 }} animate={valView ? { opacity:1, y:0 } : {}}
                transition={{ delay:i*0.1, duration:0.6 }}
                className="glass p-6 rounded-2xl text-center"
                style={{ border:'1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background:'rgba(26,111,212,0.1)', border:'1px solid rgba(26,111,212,0.25)' }}>
                  <svg className="w-7 h-7" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:'#888' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background:'#050508' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-sm mb-8" style={{ color:'#888' }}>Get your first quote in under 60 seconds — no commitment required.</p>
          <Link to="/quote" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold cursor-pointer btn-primary relative overflow-hidden z-10">
            <span className="relative z-10">Get a Free Quote</span>
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
