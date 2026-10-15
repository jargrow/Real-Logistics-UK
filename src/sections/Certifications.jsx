import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const certs = [
  {
    standard: 'ISO 9001:2015',
    title: 'Quality Management',
    benefit: 'Every delivery handled to a documented, audited quality standard.',
    certNo: '275507',
    expiry: '30 September 2029',
    color: '#1A6FD4',
    glow: 'rgba(26,111,212,0.35)',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    standard: 'ISO 14001:2015',
    title: 'Environmental Management',
    benefit: 'Committed to reducing the environmental impact of every route we run.',
    certNo: '275643',
    expiry: '30 April 2029',
    color: '#16A34A',
    glow: 'rgba(22,163,74,0.35)',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    standard: 'ISO 45001:2018',
    title: 'Health & Safety',
    benefit: 'Rigorous safety protocols protecting our drivers and your cargo at every stage.',
    certNo: '275644',
    expiry: '13 October 2029',
    color: '#D97706',
    glow: 'rgba(217,119,6,0.35)',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
]

export default function Certifications() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden"
      style={{ background: '#04060D', borderTop: '1px solid rgba(26,111,212,0.12)' }}>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(26,111,212,0.5) 40%,rgba(74,144,226,0.5) 60%,transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold tracking-[0.2em] uppercase"
            style={{ background: 'rgba(26,111,212,0.1)', border: '1px solid rgba(26,111,212,0.25)', color: '#4A90E2' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            UKAS Accredited · British Assessment Bureau
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ fontFamily: '"DM Sans",sans-serif', letterSpacing: '-0.02em' }}>
            ISO Certified.<br className="sm:hidden" /> <span style={{ color: '#4A90E2' }}>UKAS Accredited.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto leading-relaxed">
            All three international standards independently audited and certified — covering quality, environment, and safety across every service we provide.
          </p>
        </motion.div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {certs.map((c, i) => (
            <motion.div key={c.standard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 180 }}
              className="relative group rounded-2xl overflow-hidden cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.08)`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${c.color}55`
                e.currentTarget.style.boxShadow = `0 0 40px ${c.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top colour bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />

              <div className="p-8">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}40` }}>
                  <svg className="w-8 h-8" style={{ color: c.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </div>

                {/* Standard */}
                <div className="text-2xl font-black mb-1" style={{ color: c.color, fontFamily: '"DM Sans",sans-serif', letterSpacing: '-0.01em' }}>
                  {c.standard}
                </div>

                {/* Title */}
                <div className="text-white font-bold text-lg mb-3" style={{ fontFamily: '"DM Sans",sans-serif' }}>
                  {c.title}
                </div>

                {/* Benefit */}
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  {c.benefit}
                </p>

                {/* Divider */}
                <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

                {/* Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#555] text-xs uppercase tracking-widest">Cert No.</span>
                    <span className="text-[#aaa] text-xs font-mono">{c.certNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#555] text-xs uppercase tracking-widest">Valid to</span>
                    <span className="text-[#aaa] text-xs">{c.expiry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#555] text-xs uppercase tracking-widest">Issued by</span>
                    <span className="text-[#aaa] text-xs">British Assessment Bureau</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center"
        >
          {[
            { label: 'Certified since', value: 'October 2026' },
            { label: 'Accreditation body', value: 'UKAS No. 8289' },
            { label: 'Scope', value: 'Courier & light goods transport, Great Britain' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#555] text-xs">{item.label}:</span>
              <span className="text-[#888] text-xs font-semibold">{item.value}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
