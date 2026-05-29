import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 5,   suffix: '+',  label: 'Fleet Vehicles',     desc: 'Vans & HGVs'          },
  { value: 24,  suffix: '/7', label: 'Always On',           desc: '365 days a year'      },
  { value: 500, suffix: '+',  label: 'Monthly Deliveries',  desc: 'And still counting'   },
  { value: 4,   suffix: '',   label: 'UK Nations',          desc: 'Eng · Sco · Wal · Ire'},
  { value: 98,  suffix: '%',  label: 'On-Time Rate',        desc: 'Verified deliveries'  },
]

function Counter({ value, suffix, inView }) {
  const [n, setN] = useState(0)
  const ran = useRef(false)
  useEffect(() => {
    if (!inView || ran.current) return
    ran.current = true
    const steps = 50
    const ms    = 1500 / steps
    let step = 0
    const id = setInterval(() => {
      step++
      setN(Math.round((step / steps) * value))
      if (step >= steps) clearInterval(id)
    }, ms)
    return () => clearInterval(id)
  }, [inView, value])
  return <>{n}{suffix}</>
}

export default function StatsStrip() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative"
      style={{
        background:   '#020710',
        borderTop:    '1px solid rgba(26,111,212,0.22)',
        borderBottom: '1px solid rgba(26,111,212,0.1)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(26,111,212,0.85) 20%, rgba(74,144,226,0.85) 50%, rgba(26,111,212,0.85) 80%, transparent)' }} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="relative flex flex-col items-center justify-center py-8 px-4 text-center group"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
            >
              <span
                className="font-bebas leading-none mb-1"
                style={{
                  fontSize: 'clamp(44px,5.5vw,72px)',
                  color: '#1A6FD4',
                  textShadow: '0 0 24px rgba(26,111,212,0.5)',
                }}
              >
                <Counter value={s.value} suffix={s.suffix} inView={inView} />
              </span>
              <span className="font-dm text-[12px] font-semibold text-white uppercase tracking-[0.15em] mb-0.5">
                {s.label}
              </span>
              <span className="font-mono-rl text-[10px] tracking-widest uppercase" style={{ color: '#555' }}>
                {s.desc}
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(26,111,212,0.07), transparent)' }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
