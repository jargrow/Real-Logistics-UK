import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Same-Day Courier',
    short: 'Door-to-door same day',
    img:   'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80',
    icon:  'M13 10V3L4 14h7v7l9-11h-7z',
    large: true,
  },
  {
    title: 'Overnight Freight',
    short: 'Guaranteed next morning',
    img:   'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    icon:  'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    large: false,
  },
  {
    title: 'Pallet Delivery',
    short: 'Heavy & bulk freight',
    img:   'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
    icon:  'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    large: false,
  },
  {
    title: 'Fragile Goods',
    short: 'White-glove care',
    img:   'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
    icon:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    large: false,
  },
  {
    title: '24/7 Emergency',
    short: 'Always on call',
    img:   'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80',
    icon:  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    large: false,
  },
  {
    title: 'Nationwide Coverage',
    short: 'Every UK postcode',
    img:   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    icon:  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    large: false,
  },
]

function ServiceCard({ s, i, inView }) {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.94 }}
      animate={inView ? { opacity:1, scale:1 } : {}}
      transition={{ delay:i * 0.07, duration:0.55, ease:[0.22,1,0.36,1] }}
      whileHover={{ scale:1.02 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        border:'1px solid rgba(255,255,255,0.07)',
        minHeight: s.large ? 460 : 220,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(26,111,212,0.45)'}
      onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}
    >
      {/* Background image */}
      <img src={s.img} alt={s.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
        style={{ filter:'brightness(0.55) saturate(0.75)' }}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

      {/* Blue border glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow:'inset 0 0 0 1px rgba(26,111,212,0.4)', borderRadius:'1rem' }} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Icon + title row */}
        <div className="flex items-end gap-3">
          <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background:'rgba(26,111,212,0.3)', border:'1px solid rgba(26,111,212,0.5)', backdropFilter:'blur(8px)' }}>
            <svg className="w-4 h-4" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
            </svg>
          </div>
          <div>
            <h3
              className="font-bebas text-white leading-none"
              style={{ fontSize: s.large ? 'clamp(28px,4vw,42px)' : '22px', letterSpacing:'0.03em' }}
            >
              {s.title}
            </h3>
            <p className="font-mono-rl text-[10px] tracking-widest uppercase mt-0.5" style={{ color:'#4A90E2' }}>
              {s.short}
            </p>
          </div>
        </div>

        {/* "Learn More" link – slides up on hover */}
        <div className="overflow-hidden mt-3">
          <motion.div
            initial={false}
            className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Link to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              style={{ color:'#4A90E2', fontFamily:'"DM Sans",sans-serif' }}
            >
              Learn More
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  const large = services.filter(s => s.large)
  const small = services.filter(s => !s.large)

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background:'#000' }}>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
              <span className="section-label">Our Services</span>
            </div>
            <h2 className="font-bebas text-white leading-none"
              style={{ fontSize:'clamp(52px,8vw,96px)' }}>
              EVERY LOGISTICS
              <br />
              <span style={{ color:'#1A6FD4' }}>NEED COVERED</span>
            </h2>
          </div>
          <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
            <Link to="/services"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-[13px] font-bold tracking-[0.1em] uppercase cursor-pointer btn-ghost self-start"
              style={{ borderRadius:'999px' }}>
              View All Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Bento grid layout ── */}
        {/* Row 1: large card left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Large card spans 2 cols */}
          <div className="md:col-span-2">
            <ServiceCard s={large[0]} i={0} inView={inView} />
          </div>
          {/* 2 stacked small cards */}
          <div className="flex flex-col gap-4">
            {small.slice(0,2).map((s,i) => (
              <ServiceCard key={s.title} s={s} i={i+1} inView={inView} />
            ))}
          </div>
        </div>
        {/* Row 2: 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {small.slice(2).map((s,i) => (
            <ServiceCard key={s.title} s={s} i={i+4} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
