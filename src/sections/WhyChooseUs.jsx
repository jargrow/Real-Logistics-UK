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

        {/* RIGHT — 3 tilt cards */}
        <div className="flex flex-col gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.tag}
              initial={{ opacity:0, x:40, y:0 }}
              animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ delay:0.15 + i * 0.15, duration:0.6, ease:[0.22,1,0.36,1] }}
              whileHover={{ boxShadow:'0 0 30px rgba(26,111,212,0.5)' }}
              style={{ borderRadius:'16px' }}
            >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable={true}
                glareMaxOpacity={0.06}
                scale={1.03}
                transitionSpeed={500}
              >
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    border:'1px solid rgba(255,255,255,0.07)',
                    background:'rgba(0,0,0,0.5)',
                    backdropFilter:'blur(12px)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor='rgba(26,111,212,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}
                >
                  {/* Image strip */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={card.img} alt={card.tag}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      style={{ filter:'brightness(0.22) saturate(0.5)' }}
                    />
                  </div>
                  {/* Blue tint on hover */}
                  <div className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background:'rgba(26,111,212,0.08)' }} />

                  <div className="relative z-[2] flex items-center gap-4 p-5">
                    {/* Tag pill */}
                    <div className="flex-shrink-0 px-2.5 py-1 rounded-md font-mono-rl text-[10px] tracking-[0.15em] uppercase"
                      style={{ background:'rgba(26,111,212,0.2)', border:'1px solid rgba(26,111,212,0.35)', color:'#4A90E2' }}>
                      {card.tag}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm leading-tight mb-1" style={{ fontFamily:'"DM Sans",sans-serif' }}>
                        {card.title.replace('\n', ' ')}
                      </h3>
                      <p className="text-xs leading-relaxed font-dm" style={{ color:'#888' }}>{card.desc}</p>
                    </div>
                    {/* Arrow */}
                    <div className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
