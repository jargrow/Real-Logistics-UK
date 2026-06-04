import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const slides = [
  { src: '/images/gallery-01.webp', label: 'Our Team',           sub: 'Ready for every job' },
  { src: '/images/fleet-02.webp',   label: 'Always Moving',      sub: 'On the road 24/7' },
  { src: '/images/gallery-02.webp', label: 'Our Fleet',          sub: 'Branded & road-ready' },
  { src: '/images/gallery-03.webp', label: 'Careful Handling',   sub: 'Every parcel matters' },
  { src: '/images/fleet-01.webp',   label: 'The Crew',           sub: 'Proud to serve the UK' },
  { src: '/images/gallery-04.webp', label: 'On the Move',        sub: 'UK-wide convoy' },
  { src: '/images/gallery-05.webp', label: 'Night Shift',        sub: '24/7 — no exceptions' },
  { src: '/images/gallery-07.webp', label: 'Depot Ready',        sub: 'Prepped at sunrise' },
  { src: '/images/gallery-08.webp', label: 'Personal Service',   sub: 'Real people, real care' },
  { src: '/images/fleet-04.webp',   label: 'Full Fleet',         sub: 'Three nations, one team' },
  { src: '/images/gallery-06.webp', label: 'Loaded & Secure',    sub: 'Every item accounted for' },
  { src: '/images/fleet-03.webp',   label: 'Door to Door',       sub: 'Delivered with pride' },
]

export default function FleetGallery() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ background: '#030810' }}>
      {/* Subtle top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(26,111,212,0.5) 40%,rgba(74,144,226,0.5) 60%,transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(26,111,212,0.3),transparent)' }} />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(26,111,212,0.06), transparent 70%)' }} />

      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px]" style={{ background: '#1A6FD4' }} />
            <span className="section-label">In The Field</span>
            <span className="w-8 h-[1px]" style={{ background: '#1A6FD4' }} />
          </div>
          <h2 className="font-bebas text-white leading-none" style={{ fontSize: 'clamp(44px,7vw,88px)' }}>
            REAL LOGISTICS.{' '}
            <span style={{ color: '#1A6FD4', textShadow: '0 0 40px rgba(26,111,212,0.45)' }}>IN ACTION.</span>
          </h2>
          <p className="font-dm text-sm mt-4 max-w-md mx-auto leading-relaxed" style={{ color: '#888' }}>
            A glimpse of our fleet, our drivers, and our daily operations — across every corner of the UK.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="swiper-fleet"
        >
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            coverflowEffect={{
              rotate:   20,
              stretch:  0,
              depth:    180,
              modifier: 1.2,
              slideShadows: true,
            }}
            autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i} style={{ width: '420px', maxWidth: '82vw' }}>
                <div className="relative rounded-2xl overflow-hidden group"
                  style={{ border: '1px solid rgba(26,111,212,0.15)', aspectRatio: '16/10' }}>
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
                  {/* Blue shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(26,111,212,0.06)' }} />
                  {/* Caption */}
                  <div className="absolute bottom-4 left-4">
                    <p className="font-bebas text-white text-lg leading-none tracking-wider">{slide.label}</p>
                    <p className="font-mono-rl text-[10px] tracking-widest uppercase mt-0.5" style={{ color: '#4A90E2' }}>{slide.sub}</p>
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
