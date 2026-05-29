import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num:   '01',
    title: 'Fill the Quiz Form',
    desc:  'Tell us what you\'re shipping, where it needs to go and when. Our smart form takes under 60 seconds to complete.',
    icon:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    num:   '02',
    title: 'We Confirm & Dispatch',
    desc:  'Our team reviews your shipment within 15 minutes, confirms pricing, and dispatches the nearest available driver.',
    icon:  'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  },
  {
    num:   '03',
    title: 'Same-Day Delivery',
    desc:  'Your cargo arrives same day — with GPS confirmation, photo proof and your digital signature captured.',
    icon:  'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

export default function HowItWorks() {
  const ref     = useRef(null)
  const lineRef = useRef(null)
  const inView  = useInView(ref, { once:true, margin:'-80px' })

  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX:0 },
        {
          scaleX:1,
          duration:1.6,
          ease:'power2.out',
          scrollTrigger: {
            trigger: lineRef.current,
            start:   'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background:'#030810' }}>
      {/* Animated dot grid */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26,111,212,0.05), transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
            <span className="section-label">How It Works</span>
            <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
          </div>
          <h2 className="font-bebas text-white leading-none"
            style={{ fontSize:'clamp(52px,8vw,100px)' }}>
            LOGISTICS MADE SIMPLE
          </h2>
        </motion.div>

        <div className="relative">
          {/* GSAP connector line */}
          <div className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-[2px]"
            style={{ transformOrigin:'left' }}>
            <div ref={lineRef} className="w-full h-full"
              style={{
                background:'linear-gradient(90deg,#1A6FD4,#4A90E2,#1A6FD4)',
                boxShadow:'0 0 10px rgba(26,111,212,0.6)',
                transformOrigin:'left',
              }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity:0, y:50 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay:0.2 + i * 0.2, duration:0.65, ease:[0.22,1,0.36,1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Large faded step number */}
                <div className="relative mb-6">
                  {/* Background big number */}
                  <span
                    className="font-bebas absolute -top-8 left-1/2 -translate-x-1/2 select-none pointer-events-none"
                    style={{
                      fontSize:'120px',
                      color:'rgba(26,111,212,0.07)',
                      lineHeight:1,
                      letterSpacing:'-0.02em',
                    }}
                  >
                    {step.num}
                  </span>

                  {/* Icon circle */}
                  <div
                    className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-108"
                    style={{
                      background:'rgba(10,20,48,0.8)',
                      border:'2px solid rgba(26,111,212,0.4)',
                      boxShadow:'0 0 30px rgba(26,111,212,0.12)',
                      backdropFilter:'blur(10px)',
                      color:'#4A90E2',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 40px rgba(26,111,212,0.4)'; e.currentTarget.style.borderColor='rgba(26,111,212,0.8)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow='0 0 30px rgba(26,111,212,0.12)'; e.currentTarget.style.borderColor='rgba(26,111,212,0.4)' }}
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </div>

                  {/* Step badge */}
                  <div
                    className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center font-bebas text-sm text-white"
                    style={{ background:'linear-gradient(135deg,#1A6FD4,#0E4A9A)', boxShadow:'0 0 12px rgba(26,111,212,0.5)' }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Step number label */}
                <span className="font-mono-rl text-[11px] tracking-[0.25em] uppercase mb-3"
                  style={{ color:'#1A6FD4' }}>
                  Step {step.num}
                </span>
                <h3 className="font-bebas text-white mb-3"
                  style={{ fontSize:'clamp(22px,2.5vw,28px)', letterSpacing:'0.05em' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed font-dm" style={{ color:'#888', maxWidth:'260px' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ delay:0.8 }}
          className="text-center mt-14 font-mono-rl text-xs tracking-widest"
          style={{ color:'#888' }}
        >
          AVERAGE RESPONSE TIME: UNDER 15 MINUTES
        </motion.p>
      </div>
    </section>
  )
}
