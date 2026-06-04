import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Link } from 'react-router-dom'

const cards = [
  {
    tag:   'THE EYE',
    title: 'Visual Proof\nof Reliability',
    desc:  'GPS-tracked fleet, photo confirmation on delivery. Every mile monitored — you see everything.',
    img:   'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80',
  },
  {
    tag:   'THE VOICE',
    title: 'Clear Trusted\nCommunication',
    desc:  'Plain English, proactive ETA alerts, dedicated manager who actually picks up the phone.',
    img:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
  },
  {
    tag:   'THE ECHO',
    title: 'Data-Driven\nResults',
    desc:  'Every delivery sharpens our routes and SLAs. We don\'t just improve — we prove it with data.',
    img:   'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80',
  },
]

export default function WhyChooseUs() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background:'#000' }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
          alt="UK motorway"
          className="w-full h-full object-cover object-center"
          style={{ filter:'brightness(0.18) saturate(0.6)' }}
          loading="lazy"
        />
      </div>
      {/* Gradient left-side fade so text is readable */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background:'linear-gradient(100deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none dot-bg opacity-30" />

      <div className="relative z-[2] max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — bold copy */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.5 }}
              className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
            <motion.span
              initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.5, delay:0.05 }}
              className="section-label">Why Real Logistics</motion.span>
          </div>

          {/* Staggered headline lines */}
          {['BUILT FOR', 'BRITISH', 'BUSINESS.'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.65, ease: [0.22,1,0.36,1] }}
              >
                <h2
                  className="font-bebas leading-none"
                  style={{
                    fontSize: 'clamp(64px,9vw,100px)',
                    color: i === 1 ? '#1A6FD4' : '#fff',
                    textShadow: i === 1 ? '0 0 40px rgba(26,111,212,0.4)' : 'none',
                  }}
                >
                  {line}
                </h2>
              </motion.div>
            </div>
          ))}

          <motion.p
            initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.5, duration:0.6 }}
            className="text-[15px] leading-relaxed mt-6 mb-8 max-w-md font-dm" style={{ color:'#C0C0C0' }}
          >
            5 vans. 4 nations. 24/7. One promise.
          </motion.p>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.6, duration:0.5 }}
            className="flex gap-8 mb-10"
          >
            {[
              { n:'98%', l:'On-Time Rate' },
              { n:'15m', l:'Avg Response' },
              { n:'24/7',l:'Always Open'  },
            ].map(s => (
              <div key={s.l}>
                <div className="font-bebas text-4xl" style={{ color:'#4A90E2', textShadow:'0 0 16px rgba(26,111,212,0.4)' }}>{s.n}</div>
                <div className="font-mono-rl text-[10px] tracking-widest uppercase mt-0.5" style={{ color:'#888' }}>{s.l}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.7 }}
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
          >
            <Link to="/services"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer btn-primary relative overflow-hidden z-10"
              style={{ borderRadius:'999px' }}>
              <span className="relative z-10">Explore Our Services</span>
              <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — 3 vertical feature cards (Option B) */}
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              num:  '01',
              icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              stat: '100%',
              title:'Full Visibility',
              desc: 'GPS-tracked fleet, photo confirmation on delivery. Every mile monitored — you see it all in real time.',
            },
            {
              num:  '02',
              icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
              stat: '15m',
              title:'Always Reachable',
              desc: 'Plain English updates, proactive ETA alerts. A real manager picks up every call — no voicemail, no bots.',
            },
            {
              num:  '03',
              icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
              stat: '98%',
              title:'Proven Results',
              desc: "Every delivery sharpens our routes and SLAs. We don't just say we improve — the data proves it.",
            },
          ].map((f, i) => (
            <motion.div key={f.num}
              initial={{ opacity:0, x:50 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ delay:0.15 + i * 0.14, duration:0.65, ease:[0.22,1,0.36,1] }}
              className="relative rounded-2xl p-6 cursor-pointer overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(26,111,212,0.45)'; e.currentTarget.style.background='rgba(26,111,212,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.03)' }}
            >
              {/* Blue left accent bar */}
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                style={{ background:'linear-gradient(to bottom,#1A6FD4,#4A90E2)', boxShadow:'0 0 12px rgba(26,111,212,0.6)' }} />

              <div className="flex items-start gap-5 pl-3">
                {/* Icon + stat */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background:'rgba(26,111,212,0.15)', border:'1px solid rgba(26,111,212,0.3)' }}>
                    <svg className="w-5 h-5" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <span className="font-bebas text-xl leading-none"
                    style={{ color:'#1A6FD4', textShadow:'0 0 10px rgba(26,111,212,0.5)' }}>{f.stat}</span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono-rl text-[9px] tracking-[0.2em] uppercase" style={{ color:'#1A6FD4' }}>{f.num}</span>
                    <h3 className="font-dm font-bold text-white text-sm">{f.title}</h3>
                  </div>
                  <p className="font-dm text-xs leading-relaxed" style={{ color:'#888' }}>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
