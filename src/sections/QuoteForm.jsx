import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Paste your Google Apps Script Web App URL here after deploying
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwN2goJVk1l358e_8wvejFkzw8jIXizP9f-bghHCyYZpflSawzhztVWY3goRbn3VfNIjw/exec'

const TOTAL = 6

const slide = {
  initial: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit:    (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

const SHIPMENT = [
  { id:'documents', label:'Documents\n& Letters',  icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id:'parcels',   label:'Parcels\n& Boxes',      icon:'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id:'pallets',   label:'Pallets\n& Freight',    icon:'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
  { id:'fragile',   label:'Fragile\nItems',        icon:'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { id:'oversized', label:'Oversized\nor Bulky',   icon:'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
  { id:'unsure',    label:'Not Sure\n/ Other',     icon:'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const UK_CITIES = ['London','Manchester','Birmingham','Leeds','Liverpool','Edinburgh','Glasgow','Cardiff','Bristol','Belfast']
const TIMEFRAMES = ['ASAP — Within Hours','Same Day','Next Day','Scheduled Date']
const WEIGHTS    = ['Under 5kg','5–25kg','25–100kg','100kg+']
const SPECIAL    = ['Temperature Controlled','Fragile Handling','Tail Lift Required','None']

const WHATSAPP_NUMBER = '447359629231'

const defaultForm = {
  shipmentType: '',
  fromCity: '', fromCityOther: '',
  toCity:   '', toCityOther:   '',
  timeframe: '', scheduledDate: '',
  weight: '',
  special: [],
  name: '', phone: '', email: '', company: '',
}

const inputCls   = 'w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200 font-dm'
const inputStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', fontFamily:'"DM Sans",sans-serif' }
const onFocus    = (e) => { e.target.style.borderColor='rgba(26,111,212,0.65)'; e.target.style.boxShadow='0 0 0 3px rgba(26,111,212,0.12)' }
const onBlur     = (e) => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none' }

// ── City picker sub-component ─────────────────────────────────
function CityPicker({ label, value, otherValue, onChange, onOtherChange }) {
  const isOther = value === '__other__'
  return (
    <div>
      <p className="font-mono-rl text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color:'#888' }}>{label}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {UK_CITIES.map(city => (
          <button
            key={city}
            type="button"
            onClick={() => onChange(city)}
            className="px-3.5 py-1.5 rounded-full font-dm text-xs font-semibold cursor-pointer transition-all duration-150"
            style={{
              background: value === city ? 'rgba(26,111,212,0.25)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${value === city ? 'rgba(26,111,212,0.7)' : 'rgba(255,255,255,0.1)'}`,
              color: value === city ? '#fff' : '#888',
              boxShadow: value === city ? '0 0 12px rgba(26,111,212,0.3)' : 'none',
            }}
          >
            {city}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange('__other__')}
          className="px-3.5 py-1.5 rounded-full font-dm text-xs font-semibold cursor-pointer transition-all duration-150"
          style={{
            background: isOther ? 'rgba(26,111,212,0.25)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isOther ? 'rgba(26,111,212,0.7)' : 'rgba(255,255,255,0.1)'}`,
            color: isOther ? '#fff' : '#888',
            boxShadow: isOther ? '0 0 12px rgba(26,111,212,0.3)' : 'none',
          }}
        >
          Other
        </button>
      </div>
      <AnimatePresence>
        {isOther && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={otherValue}
              onChange={e => onOtherChange(e.target.value)}
              placeholder="Type your city..."
              className={inputCls}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Thank-you screen ──────────────────────────────────────────
function ThankYou({ name, phone, onReset }) {
  return (
    <motion.div
      key="thankyou"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-2xl mx-auto px-6 py-24 text-center"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(26,111,212,0.12), transparent 70%)' }} />

      {/* Checkmark badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 16 }}
        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        style={{
          background: 'rgba(26,111,212,0.12)',
          border: '2px solid #1A6FD4',
          boxShadow: '0 0 40px rgba(26,111,212,0.4), 0 0 80px rgba(26,111,212,0.15)',
        }}
      >
        <svg className="w-12 h-12" style={{ color: '#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          style={{ border: '1px solid rgba(26,111,212,0.5)' }}
        />
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="font-bebas text-white leading-none mb-3"
        style={{ fontSize: 'clamp(42px,6vw,72px)', letterSpacing: '0.04em' }}
      >
        QUOTE REQUEST <span style={{ color: '#1A6FD4', textShadow: '0 0 30px rgba(26,111,212,0.5)' }}>RECEIVED.</span>
      </motion.h2>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="font-dm text-base leading-relaxed mb-3 max-w-md mx-auto"
        style={{ color: '#C0C0C0' }}
      >
        Thanks{name ? `, ${name}` : ''}. Your request is with us.
      </motion.p>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-2xl p-6 mb-8 text-left max-w-md mx-auto"
        style={{
          background: 'rgba(26,111,212,0.07)',
          border: '1px solid rgba(26,111,212,0.2)',
        }}
      >
        <p className="font-mono-rl text-[10px] tracking-[0.22em] uppercase mb-4" style={{ color: '#4A90E2' }}>
          What happens next
        </p>
        {[
          { n: '01', t: 'Specialist assigned', d: 'A logistics specialist picks up your request right now.' },
          { n: '02', t: 'We contact you', d: `Expect a call${phone ? ` on ${phone}` : ''} within 15 minutes with your confirmed quote.` },
          { n: '03', t: 'Driver dispatched', d: 'Once confirmed, your driver is on the way — same day.' },
        ].map(s => (
          <div key={s.n} className="flex gap-4 mb-4 last:mb-0">
            <span className="font-bebas text-2xl leading-none flex-shrink-0 mt-0.5"
              style={{ color: '#1A6FD4', textShadow: '0 0 12px rgba(26,111,212,0.5)' }}>{s.n}</span>
            <div>
              <p className="font-dm text-sm font-bold text-white leading-none mb-1">{s.t}</p>
              <p className="font-dm text-xs leading-relaxed" style={{ color: '#888' }}>{s.d}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mb-6"
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 font-dm font-bold text-white cursor-pointer"
          style={{
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: '0 0 30px rgba(37,211,102,0.45), 0 0 60px rgba(37,211,102,0.18)',
            fontSize: '15px',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(37,211,102,0.65), 0 0 90px rgba(37,211,102,0.28)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(37,211,102,0.45), 0 0 60px rgba(37,211,102,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          {/* WhatsApp icon */}
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Skip the wait — chat with us now
        </a>
        <p className="font-mono-rl text-[10px] tracking-widest mt-3" style={{ color: '#555' }}>
          FASTEST RESPONSE · AVERAGE REPLY IN UNDER 5 MINS
        </p>
      </motion.div>

      {/* Reset link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onReset}
        className="font-dm text-xs cursor-pointer transition-colors"
        style={{ color: '#555' }}
        onMouseEnter={e => e.currentTarget.style.color = '#888'}
        onMouseLeave={e => e.currentTarget.style.color = '#555'}
      >
        Submit another request
      </motion.button>
    </motion.div>
  )
}

// ── Main form ─────────────────────────────────────────────────
export default function QuoteForm({ standalone = false }) {
  const [step,    setStep]   = useState(1)
  const [dir,     setDir]    = useState(1)
  const [form,    setForm]   = useState(defaultForm)
  const [status,  setStatus] = useState('idle') // idle | loading | success | error
  const [errors,  setErrors] = useState({})

  const go   = (n) => { setDir(n > step ? 1 : -1); setStep(n) }
  const next = () => step < TOTAL && go(step + 1)
  const prev = () => step > 1    && go(step - 1)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleSpecial = (v) => setForm(f => ({
    ...f,
    special: f.special.includes(v) ? f.special.filter(s => s !== v) : [...f.special, v],
  }))

  // Auto-advance after a short visual confirmation delay
  const autoAdvance = (k, v) => {
    update(k, v)
    setTimeout(() => go(step + 1), 320)
  }

  // Derived city values (chip or typed other)
  const fromCity = form.fromCity === '__other__' ? form.fromCityOther : form.fromCity
  const toCity   = form.toCity   === '__other__' ? form.toCityOther   : form.toCity

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStatus('loading')

    const timeframeLabel = form.timeframe === 'Scheduled Date' && form.scheduledDate
      ? `Scheduled: ${new Date(form.scheduledDate).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`
      : form.timeframe

    try {
      await fetch(SHEET_URL, {
        method:  'POST',
        // no-cors avoids preflight; Apps Script still receives the body
        mode:    'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body:    JSON.stringify({
          name:         form.name,
          phone:        form.phone,
          email:        form.email    || '',
          company:      form.company  || '',
          shipmentType: form.shipmentType,
          fromCity,
          toCity,
          timeframe:    timeframeLabel,
          weight:       form.weight,
          special:      form.special.join(', ') || 'None',
        }),
      })
    } catch (err) {
      // Network error — log silently, still show thank-you
      console.warn('Sheet submission error:', err)
    }

    setStatus('success')
  }

  const reset = () => { setStep(1); setForm(defaultForm); setStatus('idle'); setErrors({}) }

  const pct = ((step - 1) / (TOTAL - 1)) * 100

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <section
        className={`relative overflow-hidden ${standalone ? 'min-h-screen pt-20' : 'py-24'}`}
        style={{ background: standalone ? '#000' : '#030810' }}
      >
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <ThankYou name={form.name} phone={form.phone} onReset={reset} />
      </section>
    )
  }

  return (
    <section
      className={`relative overflow-hidden ${standalone ? 'min-h-screen pt-28' : 'py-24'}`}
      style={{ background: standalone ? '#000' : '#030810' }}
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute inset-0 dot-bg opacity-15 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 font-mono-rl text-[10px] tracking-[0.25em] uppercase"
            style={{ background:'rgba(26,111,212,0.1)', border:'1px solid rgba(26,111,212,0.3)', color:'#4A90E2' }}>
            GET A QUOTE
          </div>
          <h2 className="font-bebas text-white leading-none" style={{ fontSize:'clamp(48px,7vw,80px)' }}>
            SHIP SMARTER.
            <br />
            <span style={{ color:'#1A6FD4' }}>QUOTE IN 60 SECONDS.</span>
          </h2>
        </motion.div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(26,111,212,0.2)',
            boxShadow: '0 0 60px rgba(26,111,212,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono-rl text-[10px] tracking-[0.2em] uppercase" style={{ color:'#888' }}>
                Step {step} of {TOTAL}
              </span>
              <span className="font-mono-rl text-[10px] tracking-[0.15em]" style={{ color:'#4A90E2' }}>
                {Math.round(pct)}% Complete
              </span>
            </div>
            <div className="relative h-6">
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] rounded-full overflow-hidden"
                style={{ background:'rgba(255,255,255,0.07)' }}>
                <motion.div className="h-full rounded-full"
                  animate={{ width:`${pct}%` }}
                  transition={{ duration:0.5, ease:'easeOut' }}
                  style={{ background:'linear-gradient(90deg,#1A6FD4,#4A90E2)', boxShadow:'0 0 8px rgba(26,111,212,0.6)' }}
                />
              </div>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ left:`calc(${pct}% - 14px)` }}
                transition={{ duration:0.5, ease:'easeOut' }}
                style={{ filter:'drop-shadow(0 0 6px rgba(26,111,212,0.9))' }}
              >
                <svg width="28" height="18" viewBox="0 0 52 34" fill="none">
                  <rect x="2" y="8" width="30" height="16" rx="1.5" fill="#1A6FD4" stroke="#C0C0C0" strokeWidth="0.8"/>
                  <rect x="31" y="6" width="16" height="18" rx="2" fill="#0E4A9A" stroke="#C0C0C0" strokeWidth="0.8"/>
                  <rect x="34" y="8" width="10" height="7" rx="1" fill="#4A90E2" opacity="0.9"/>
                  <rect x="4" y="22" width="40" height="4" rx="1" fill="#050A14"/>
                  <circle cx="40" cy="28" r="5" fill="#111" stroke="#C0C0C0" strokeWidth="1.5"/>
                  <circle cx="40" cy="28" r="2.2" fill="#555"/>
                  <circle cx="12" cy="28" r="5" fill="#111" stroke="#C0C0C0" strokeWidth="1.5"/>
                  <circle cx="12" cy="28" r="2.2" fill="#555"/>
                  <circle cx="48" cy="17" r="2" fill="#FFD700" opacity="0.95"/>
                </svg>
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 px-0.5">
              {Array.from({ length: TOTAL }, (_, i) => (
                <button key={i} onClick={() => i + 1 <= step && go(i + 1)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width:  i + 1 === step ? '20px' : '7px',
                    height: '7px',
                    background: i + 1 <= step ? '#1A6FD4' : 'rgba(255,255,255,0.08)',
                    boxShadow:  i + 1 === step ? '0 0 10px rgba(26,111,212,0.8)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir}
              variants={slide} initial="initial" animate="animate" exit="exit"
              transition={slide.transition}
            >

              {/* STEP 1 — Shipment type (auto-advance) */}
              {step === 1 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    WHAT ARE YOU SHIPPING?
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Select one — we'll move you straight on.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SHIPMENT.map(t => (
                      <button key={t.id}
                        onClick={() => autoAdvance('shipmentType', t.id)}
                        className="p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
                        style={{
                          background: form.shipmentType === t.id ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.shipmentType === t.id ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: form.shipmentType === t.id ? '0 0 15px rgba(26,111,212,0.25)' : 'none',
                          transform: form.shipmentType === t.id ? 'scale(1.04)' : 'scale(1)',
                        }}>
                        <svg className="w-7 h-7" style={{ color: form.shipmentType === t.id ? '#4A90E2' : '#888' }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                        </svg>
                        <span className="font-dm text-xs font-bold text-center leading-tight whitespace-pre-line" style={{ color: form.shipmentType === t.id ? '#fff' : '#888' }}>
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 — From / To city */}
              {step === 2 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    WHERE IS IT GOING?
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Pick cities or type your own.</p>
                  <div className="space-y-6">
                    <CityPicker
                      label="From"
                      value={form.fromCity}
                      otherValue={form.fromCityOther}
                      onChange={v => update('fromCity', v)}
                      onOtherChange={v => update('fromCityOther', v)}
                    />
                    <div className="h-[1px]" style={{ background:'rgba(255,255,255,0.06)' }} />
                    <CityPicker
                      label="To"
                      value={form.toCity}
                      otherValue={form.toCityOther}
                      onChange={v => update('toCity', v)}
                      onOtherChange={v => update('toCityOther', v)}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 — Timeframe (auto-advance, except Scheduled Date) */}
              {step === 3 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    HOW SOON DO YOU NEED DISPATCH?
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Select one — we'll move you straight on.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMEFRAMES.map((t, i) => (
                      <motion.button key={t}
                        initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                        onClick={() => {
                          update('timeframe', t)
                          update('scheduledDate', '')
                          if (t !== 'Scheduled Date') setTimeout(() => go(step + 1), 320)
                        }}
                        className="p-4 rounded-xl font-bebas tracking-wider cursor-pointer transition-all duration-200 text-left"
                        style={{
                          fontSize: '18px',
                          background: form.timeframe === t ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.timeframe === t ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
                          color: form.timeframe === t ? '#fff' : '#888',
                          boxShadow: form.timeframe === t ? '0 0 15px rgba(26,111,212,0.2)' : 'none',
                        }}>
                        {t}
                      </motion.button>
                    ))}
                  </div>

                  {/* Date + time picker — shown only when Scheduled Date is selected */}
                  <AnimatePresence>
                    {form.timeframe === 'Scheduled Date' && (
                      <motion.div
                        initial={{ opacity:0, height:0, marginTop:0 }}
                        animate={{ opacity:1, height:'auto', marginTop:20 }}
                        exit={{ opacity:0, height:0, marginTop:0 }}
                        transition={{ duration:0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl p-5"
                          style={{ background:'rgba(26,111,212,0.07)', border:'1px solid rgba(26,111,212,0.25)' }}>
                          <p className="font-mono-rl text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color:'#4A90E2' }}>
                            Pick your date and time
                          </p>
                          <p className="font-dm text-xs mb-4" style={{ color:'#666' }}>
                            Choose both a date and a time slot, then press Continue.
                          </p>
                          <input
                            type="datetime-local"
                            value={form.scheduledDate}
                            min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                            onChange={e => update('scheduledDate', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none font-dm"
                            style={{
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(26,111,212,0.4)',
                              colorScheme: 'dark',
                              fontFamily: '"DM Sans",sans-serif',
                            }}
                          />
                          {form.scheduledDate && (
                            <div className="mt-4 flex items-center justify-between gap-4">
                              <p className="font-dm text-xs" style={{ color:'#4A90E2' }}>
                                Scheduled for <strong style={{ color:'#fff' }}>{new Date(form.scheduledDate).toLocaleString('en-GB', { dateStyle:'long', timeStyle:'short' })}</strong>
                              </p>
                              <button
                                onClick={() => go(step + 1)}
                                className="flex-shrink-0 px-5 py-2 rounded-xl font-bebas tracking-widest text-base cursor-pointer btn-primary relative overflow-hidden z-10"
                              >
                                <span className="relative z-10">CONTINUE</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* STEP 4 — Weight (auto-advance) */}
              {step === 4 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    HOW HEAVY IS THE SHIPMENT?
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Select one — we'll move you straight on.</p>
                  <div className="space-y-2">
                    {WEIGHTS.map(w => (
                      <button key={w}
                        onClick={() => autoAdvance('weight', w)}
                        className="w-full px-5 py-4 rounded-xl font-bebas tracking-wider text-left cursor-pointer transition-all duration-200 flex items-center gap-3"
                        style={{
                          fontSize: '18px',
                          background: form.weight === w ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.weight === w ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
                          color: form.weight === w ? '#fff' : '#888',
                        }}>
                        <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all"
                          style={{ borderColor: form.weight === w ? '#1A6FD4' : '#444' }}>
                          {form.weight === w && <span className="w-2 h-2 rounded-full" style={{ background:'#1A6FD4' }} />}
                        </span>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 — Special requirements */}
              {step === 5 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    ANY SPECIAL REQUIREMENTS?
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Select all that apply, then hit Continue.</p>
                  <div className="space-y-3">
                    {SPECIAL.map((s, i) => (
                      <motion.button key={s}
                        initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
                        onClick={() => toggleSpecial(s)}
                        className="w-full px-5 py-4 rounded-xl font-dm font-semibold text-sm text-left cursor-pointer transition-all duration-200 flex items-center gap-3"
                        style={{
                          background: form.special.includes(s) ? 'rgba(26,111,212,0.15)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${form.special.includes(s) ? 'rgba(26,111,212,0.55)' : 'rgba(255,255,255,0.08)'}`,
                          color: form.special.includes(s) ? '#fff' : '#888',
                        }}>
                        <span className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
                          style={{
                            background: form.special.includes(s) ? '#1A6FD4' : 'rgba(255,255,255,0.08)',
                            border: form.special.includes(s) ? 'none' : '1px solid rgba(255,255,255,0.15)',
                          }}>
                          {form.special.includes(s) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6 — Contact details */}
              {step === 6 && (
                <div>
                  <h3 className="font-bebas text-white mb-2" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>
                    YOUR CONTACT DETAILS
                  </h3>
                  <p className="font-dm text-xs mb-6" style={{ color:'#666' }}>Name and phone are required. We'll call you within 15 minutes.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { k:'name',    l:'Full Name *',         p:'John Smith',          t:'text',  req:true  },
                      { k:'phone',   l:'Phone Number *',      p:'+44 7700 900000',     t:'tel',   req:true  },
                      { k:'email',   l:'Email (optional)',    p:'john@company.co.uk',  t:'email', req:false },
                      { k:'company', l:'Company (optional)',  p:'Acme Ltd',            t:'text',  req:false },
                    ].map(f => (
                      <div key={f.k}>
                        <label className="block font-mono-rl text-[10px] tracking-[0.2em] uppercase mb-2"
                          style={{ color: errors[f.k] ? '#f87171' : '#888' }}>
                          {errors[f.k] ? errors[f.k] : f.l}
                        </label>
                        <input
                          type={f.t}
                          value={form[f.k]}
                          onChange={e => { update(f.k, e.target.value); if (errors[f.k]) setErrors(prev => ({ ...prev, [f.k]: '' })) }}
                          placeholder={f.p}
                          className={inputCls}
                          style={{
                            ...inputStyle,
                            borderColor: errors[f.k] ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.1)',
                          }}
                          onFocus={onFocus}
                          onBlur={onBlur}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6"
            style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={prev} disabled={step === 1}
              className="px-5 py-2.5 rounded-xl font-dm text-sm font-bold cursor-pointer transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed btn-ghost">
              Back
            </button>

            {/* Step 1, 3, 4 auto-advance — show subtle skip */}
            {[1, 3, 4].includes(step) ? (
              <button onClick={next}
                className="font-dm text-xs cursor-pointer transition-colors"
                style={{ color:'#555' }}
                onMouseEnter={e => e.currentTarget.style.color = '#888'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                Skip →
              </button>
            ) : step < TOTAL ? (
              <button onClick={next}
                className="px-8 py-2.5 rounded-xl font-bebas tracking-widest text-lg cursor-pointer btn-primary relative overflow-hidden z-10">
                <span className="relative z-10">CONTINUE</span>
              </button>
            ) : (
              <button onClick={submit} disabled={status === 'loading'}
                className="px-8 py-2.5 rounded-xl font-bebas tracking-widest text-lg cursor-pointer btn-primary relative overflow-hidden z-10 disabled:opacity-70 btn-pulse">
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      SENDING...
                    </>
                  ) : 'GET MY INSTANT QUOTE'}
                </span>
              </button>
            )}
          </div>

          {status === 'error' && (
            <p className="font-mono-rl text-red-400 text-xs text-center mt-3 tracking-widest">
              SOMETHING WENT WRONG. CALL +44 1992 661695.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
