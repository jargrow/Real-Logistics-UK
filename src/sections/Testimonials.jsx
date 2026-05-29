import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const reviews = [
  {
    name:    'James Harrison',
    company: 'LondonTech Ltd',
    role:    'Operations Director · London',
    stars:   5,
    text:    "Real Logistics saved our launch week. Same-day delivery, no drama, no excuses. I've never had a missed delivery in 12 months of working with them. Absolute game-changer.",
    avatar:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name:    'Sarah Mitchell',
    company: 'NorthBrew Co.',
    role:    'Founder · Manchester',
    stars:   5,
    text:    "24/7 really means 24/7. I needed a 2am pickup for an urgent client delivery — they answered within 8 minutes and had a driver there by 3am. Unbelievable service.",
    avatar:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name:    'Ahmed Rahman',
    company: 'ScotFrame Supplies',
    role:    'Supply Chain Manager · Edinburgh',
    stars:   5,
    text:    "5 vans but it feels like a fleet of 50. Always on time, always professional. The GPS tracking and photo confirmation is exactly what our enterprise clients demand.",
    avatar:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    name:    'Patricia Okafor',
    company: 'MedEquip Supplies',
    role:    'Logistics Director · London',
    stars:   5,
    text:    "Critical medical equipment delivered same-day, every time. Temperature-controlled transit, fragile handling — they handle everything with absolute professionalism.",
    avatar:  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length:5 }, (_,i) => (
        <svg key={i} className="w-4 h-4" style={{ color: i < count ? '#FFC107' : 'rgba(255,255,255,0.08)' }}
          viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background:'#030810' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,111,212,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
            <span className="section-label">Client Testimonials</span>
            <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
          </div>
          <h2 className="font-bebas text-white leading-none"
            style={{ fontSize:'clamp(48px,8vw,96px)' }}>
            TRUSTED BY UK{' '}
            <span style={{ color:'#1A6FD4' }}>BUSINESSES</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity:0, y:60 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.75, delay:0.2, ease:[0.22,1,0.36,1] }}
          className="swiper-testimonial"
        >
          <Swiper
            modules={[EffectCoverflow, Autoplay, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{ rotate:28, stretch:0, depth:160, modifier:1.5, slideShadows:false }}
            autoplay={{ delay:4200, disableOnInteraction:false }}
            pagination={{ clickable:true }}
            className="pb-12"
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i} style={{ width:'360px', maxWidth:'88vw' }}>
                <div className="rounded-2xl p-7"
                  style={{
                    background:'rgba(3,8,16,0.8)',
                    backdropFilter:'blur(16px)',
                    border:'1px solid rgba(255,255,255,0.07)',
                  }}>
                  <Stars count={r.stars} />

                  {/* Quote mark */}
                  <div className="font-bebas text-6xl leading-none mt-2 mb-1" style={{ color:'rgba(26,111,212,0.25)', lineHeight:0.8 }}>"</div>

                  <p className="font-dm text-sm leading-relaxed mb-5" style={{ color:'#C0C0C0' }}>
                    {r.text}
                  </p>

                  <div className="flex items-center gap-3 pt-4"
                    style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                    <img src={r.avatar} alt={r.name}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      style={{ border:'2px solid rgba(26,111,212,0.5)' }}
                    />
                    <div>
                      <div className="text-sm font-bold text-white" style={{ fontFamily:'"DM Sans",sans-serif' }}>{r.name}</div>
                      <div className="font-mono-rl text-[10px] tracking-widest" style={{ color:'#4A90E2' }}>{r.company}</div>
                      <div className="font-mono-rl text-[10px] tracking-widest" style={{ color:'#888' }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
