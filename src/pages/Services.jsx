import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const services = [
  {
    title: 'Same-Day Courier',
    icon:  'M13 10V3L4 14h7v7l9-11h-7z',
    img:   'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
    desc:  'Our flagship service — rapid door-to-door delivery anywhere in the UK within the same working day. Ideal for urgent business documents, e-commerce fulfilment, and time-critical shipments.',
    features: ['GPS-tracked in real time','Photo proof of delivery','Driver confirmation call','Available 7 days a week'],
  },
  {
    title: 'Overnight Freight',
    icon:  'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    img:   'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    desc:  'Scheduled overnight freight for non-urgent but time-sensitive shipments. Collection in the evening, guaranteed next-morning delivery — at a fraction of the same-day cost.',
    features: ['Evening collection slots','Pre-10am or pre-12 delivery','Pallet & parcel rates','Full tracking included'],
  },
  {
    title: 'Pallet Delivery',
    icon:  'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
    img:   'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
    desc:  'Heavy and bulky pallet freight handled with specialist vehicles. Full loads, part loads, and single pallet options — with tail-lift delivery where required.',
    features: ['1–33 pallet capacity','Tail-lift vehicles available','Same-day & next-day options','Warehouse-to-warehouse'],
  },
  {
    title: 'Fragile Goods Handling',
    icon:  'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    img:   'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    desc:  'Expert handling for artwork, glassware, electronics, antiques and medical equipment. Specialist packaging materials and trained staff ensure your items arrive perfectly intact.',
    features: ['Specialist padding & packaging','Trained fragile-goods drivers','Temperature monitoring','Additional insurance available'],
  },
  {
    title: '24/7 Emergency Logistics',
    icon:  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    img:   'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    desc:  'Emergencies don\'t follow business hours. Our 24/7 dispatch team is on call round the clock — nights, weekends and bank holidays. Typical dispatch time under 30 minutes.',
    features: ['10-minute response guarantee','Night & weekend availability','Bank holiday coverage','Priority fleet dispatch'],
  },
  {
    title: 'Nationwide UK Coverage',
    icon:  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    img:   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    desc:  'No postcode is too remote. Our nationwide network covers England, Scotland, Wales and Northern Ireland — with local hubs in London, Manchester, Birmingham, Edinburgh, Cardiff and Belfast.',
    features: ['Every UK postcode covered','Local hub network','Rural & remote delivery','Island services available'],
  },
]

function ServiceCard({ s, i }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.6, delay:i * 0.07, ease:[0.22,1,0.36,1] }}
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={false} scale={1.01} transitionSpeed={400}>
        <div className="glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
          style={{ border:'1px solid rgba(255,255,255,0.07)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor='rgba(26,111,212,0.35)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img src={s.img} alt={s.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0"
              style={{ background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background:'rgba(26,111,212,0.7)', backdropFilter:'blur(10px)' }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg">{s.title}</h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-sm leading-relaxed mb-5" style={{ color:'#888' }}>{s.desc}</p>
            <ul className="space-y-2">
              {s.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color:'#C0C0C0' }}>
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color:'#1A6FD4' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default function Services() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Hero banner */}
      <section className="relative pt-36 pb-24 overflow-hidden" style={{ background:'#000' }}>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,111,212,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="section-label mb-3">Our Services</motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.7 }}
            className="text-4xl md:text-6xl font-black text-white mb-5">
            World-Class Logistics<br /><span className="text-gradient">Tailored for UK Business</span>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
            className="text-base max-w-xl mx-auto mb-10" style={{ color:'#888' }}>
            From same-day couriers to overnight pallet freight — we cover every logistics need with professionalism and speed.
          </motion.p>
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.45 }}>
            <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold cursor-pointer btn-primary relative overflow-hidden z-10">
              <span className="relative z-10">Get a Quote</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6" style={{ background:'#050508' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center" style={{ background:'#000' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Book a Collection?</h2>
          <p className="text-sm mb-8" style={{ color:'#888' }}>Fill in our 60-second quote form and we'll confirm within 15 minutes.</p>
          <Link to="/quote" className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold cursor-pointer btn-primary relative overflow-hidden z-10">
            <span className="relative z-10">Start Your Quote</span>
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
