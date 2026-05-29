import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const signals = [
  { icon:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label:'No Hidden Fees', sub:'Transparent pricing' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label:'Fully Insured', sub:'All cargo covered' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label:'Real-Time Tracking', sub:'GPS every delivery' },
  { icon:'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label:'5-Star Rated', sub:'500+ verified reviews' },
  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label:'24/7 Support', sub:'Always available' },
]

export default function TrustSignals() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-50px' })

  return (
    <section ref={ref} className="relative py-12"
      style={{
        background:'#030810',
        borderTop:'1px solid rgba(26,111,212,0.15)',
        borderBottom:'1px solid rgba(26,111,212,0.08)',
      }}>

      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background:'linear-gradient(90deg,transparent,rgba(26,111,212,0.6) 40%,rgba(74,144,226,0.6) 60%,transparent)' }} />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {signals.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:18 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:i*0.1, duration:0.5, type:'spring', stiffness:200 }}
              className="flex flex-col items-center text-center gap-3 group cursor-pointer"
            >
              <motion.div
                animate={inView ? { y:[0,-5,0] } : {}}
                transition={{ duration:0.6, delay:0.3 + i*0.1 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background:'rgba(26,111,212,0.1)', border:'1px solid rgba(26,111,212,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 20px rgba(26,111,212,0.35)'; e.currentTarget.style.borderColor='rgba(26,111,212,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(26,111,212,0.25)' }}
              >
                <svg className="w-6 h-6" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </motion.div>
              <div>
                <div className="text-sm font-bold text-white" style={{ fontFamily:'"DM Sans",sans-serif' }}>{s.label}</div>
                <div className="font-mono-rl text-[10px] tracking-widest uppercase mt-0.5" style={{ color:'#888' }}>{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
