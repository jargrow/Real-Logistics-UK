import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const certs = [
  {
    standard:  'ISO 9001:2015',
    title:     'Quality Management',
    certNo:    '275507',
    expiry:    '30 September 2029',
    img:       '/images/cert-9001.jpg',
  },
  {
    standard:  'ISO 14001:2015',
    title:     'Environmental Management',
    certNo:    '275643',
    expiry:    '30 April 2029',
    img:       '/images/cert-14001.jpg',
  },
  {
    standard:  'ISO 45001:2018',
    title:     'Occupational Health & Safety',
    certNo:    '275644',
    expiry:    '13 October 2029',
    img:       '/images/cert-45001.jpg',
  },
]

export default function Certifications() {
  const ref         = useRef(null)
  const inView      = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(null)

  return (
    <>
      <section ref={ref} className="relative py-24 overflow-hidden"
        style={{ background: '#F7F8FA', borderTop: '1px solid rgba(0,0,0,0.08)' }}>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px]" style={{ background: '#1A6FD4' }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#1A6FD4' }}>
                Accreditation &amp; Certification
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3"
              style={{ color: '#0D1B2A', fontFamily: '"DM Sans",sans-serif', letterSpacing: '-0.02em' }}>
              Independently Certified
            </h2>
            <p className="text-base max-w-2xl" style={{ color: '#64748B', lineHeight: 1.7 }}>
              Real Logistics Limited holds three ISO certifications, independently assessed and
              registered by British Assessment Bureau Limited — part of the Amtivo Group,
              accredited by UKAS (No. 8289).
            </p>
          </motion.div>

          {/* Certificate grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {certs.map((c, i) => (
              <motion.div key={c.standard}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="group flex flex-col rounded-xl overflow-hidden cursor-pointer"
                style={{ background: '#0D1B2A', border: '1px solid #1E2D3D', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                onClick={() => setOpen(c)}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#1A6FD4' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; e.currentTarget.style.borderColor = '#1E2D3D' }}
              >
                {/* Document thumbnail — grey frame so white cert floats */}
                <div className="relative p-5 pb-4" style={{ background: '#D5DDE8' }}>
                  <div className="relative overflow-hidden rounded-sm"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.12)' }}>
                    <img
                      src={c.img}
                      alt={`${c.standard} Certificate`}
                      className="w-full block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{ background: 'rgba(26,111,212,0.9)', backdropFilter: 'blur(8px)' }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Certificate
                    </div>
                  </div>
                </div>

                {/* Card info — dark navy */}
                <div className="p-5 flex flex-col gap-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="text-base font-black text-white" style={{ fontFamily: '"DM Sans",sans-serif', letterSpacing: '-0.01em' }}>
                        {c.standard}
                      </div>
                      <div className="text-sm font-medium mt-0.5" style={{ color: '#7A9BB5' }}>{c.title}</div>
                    </div>
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#1A6FD4' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-xs font-mono" style={{ color: '#4A6FA5' }}>No. {c.certNo}</span>
                    <span className="text-xs" style={{ color: '#4A6FA5' }}>Valid to {c.expiry}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-6"
            style={{ borderTop: '1px solid #E2E8F0' }}
          >
            {[
              { label: 'Certifying body', value: 'British Assessment Bureau Ltd t/a Amtivo' },
              { label: 'UKAS accreditation', value: 'No. 8289' },
              { label: 'Certified', value: '14 October 2026' },
              { label: 'Subject to', value: 'Annual assessments' },
            ].map(item => (
              <div key={item.label} className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold" style={{ color: '#94A3B8' }}>{item.label}:</span>
                <span className="text-xs font-semibold" style={{ color: '#475569' }}>{item.value}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-8"
            style={{ background: 'rgba(13,27,42,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22, type: 'spring', stiffness: 280, damping: 24 }}
              className="flex flex-col w-full rounded-2xl overflow-hidden"
              style={{
                maxWidth: 560,
                maxHeight: '92vh',
                background: '#fff',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Pinned header — always visible, contains close button */}
              <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
                style={{ borderBottom: '1px solid #E2E8F0', background: '#fff' }}>
                <div>
                  <div className="font-black text-sm" style={{ color: '#0D1B2A', fontFamily: '"DM Sans",sans-serif' }}>
                    {open.standard} — {open.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                    Certificate No. {open.certNo}
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                  style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}
                  onClick={() => setOpen(null)}
                  onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
                >
                  <svg className="w-4 h-4" style={{ color: '#475569' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable certificate image */}
              <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                <img
                  src={open.img}
                  alt={`${open.standard} Certificate`}
                  style={{ width: '100%', display: 'block' }}
                />
              </div>

              {/* Pinned footer — always visible */}
              <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <span className="text-xs" style={{ color: '#64748B' }}>Valid to {open.expiry}</span>
                <span className="text-xs" style={{ color: '#94A3B8' }}>British Assessment Bureau · UKAS No. 8289</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
