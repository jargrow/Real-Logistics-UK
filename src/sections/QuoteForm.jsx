import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

const TOTAL = 7

const slide = {
  initial: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit:    (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

const SHIPMENT = [
  { id:'parcels',   label:'Parcels',   icon:'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id:'pallets',   label:'Pallets',   icon:'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
  { id:'fragile',   label:'Fragile',   icon:'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
  { id:'hazardous', label:'Hazardous', icon:'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
  { id:'oversized', label:'Oversized', icon:'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
]
const TIMEFRAMES = ['Same Day','Next Day','Scheduled Date','ASAP']
const WEIGHTS    = ['Under 5kg','5–25kg','25–100kg','100kg+']
const SPECIAL    = ['Temperature Controlled','Fragile Handling','Tail Lift Required','None']

const defaultForm = {
  shipmentType:'', collectionPostcode:'', collectionAddress:'',
  deliveryPostcode:'', deliveryAddress:'', timeframe:'',
  weight:'', special:[], name:'', phone:'', email:'', company:'',
}

const inputCls   = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200 font-dm"
const inputStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', fontFamily:'"DM Sans",sans-serif' }
const onFocus    = (e) => { e.target.style.borderColor='rgba(26,111,212,0.65)'; e.target.style.boxShadow='0 0 0 3px rgba(26,111,212,0.12)' }
const onBlur     = (e) => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none' }

export default function QuoteForm({ standalone = false }) {
  const [step,   setStep]   = useState(1)
  const [dir,    setDir]    = useState(1)
  const [form,   setForm]   = useState(defaultForm)
  const [status, setStatus] = useState('idle')

  const go   = (n) => { setDir(n > step ? 1 : -1); setStep(n) }
  const next = () => step < TOTAL && go(step + 1)
  const prev = () => step > 1    && go(step - 1)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleSpecial = (v) => setForm(f => ({
    ...f,
    special: f.special.includes(v) ? f.special.filter(s => s !== v) : [...f.special, v],
  }))

  const submit = async () => {
    setStatus('loading')
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          shipment_type:        form.shipmentType,
          collection_postcode:  form.collectionPostcode,
          collection_address:   form.collectionAddress,
          delivery_postcode:    form.deliveryPostcode,
          delivery_address:     form.deliveryAddress,
          timeframe:            form.timeframe,
          weight:               form.weight,
          special_requirements: form.special.join(', ') || 'None',
          customer_name:        form.name,
          customer_phone:       form.phone,
          customer_email:       form.email,
          customer_company:     form.company || 'N/A',
        },
        'YOUR_PUBLIC_KEY',
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const pct = ((step - 1) / (TOTAL - 1)) * 100

  if (status === 'success') {
    return (
      <div className={`${standalone ? 'min-h-screen flex items-center justify-center py-24 px-6 pt-28' : 'py-28 px-6'}`}
        style={{ background: standalone ? '#000' : 'transparent' }}>
        <motion.div
          initial={{ scale:0.85, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          className="max-w-lg mx-auto text-center glass rounded-3xl p-14"
          style={{ border:'1px solid rgba(26,111,212,0.3)' }}
        >
          <motion.div
            initial={{ scale:0 }} animate={{ scale:1 }}
            transition={{ delay:0.2, type:'spring', stiffness:200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background:'rgba(26,111,212,0.15)', border:'2px solid #1A6FD4', boxShadow:'0 0 30px rgba(26,111,212,0.4)' }}
          >
            <svg className="w-10 h-10" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 className="font-bebas text-white mb-3" style={{ fontSize:'32px', letterSpacing:'0.05em' }}>QUOTE REQUEST SENT!</h2>
          <p className="font-dm text-sm leading-relaxed mb-6" style={{ color:'#888' }}>
            Thanks {form.name}! We'll be in touch within{' '}
            <strong style={{ color:'#4A90E2' }}>15 minutes</strong>.
          </p>
          <button onClick={() => { setStep(1); setForm(defaultForm); setStatus('idle') }}
            className="px-6 py-3 rounded-xl font-bebas tracking-wider text-lg btn-primary cursor-pointer relative overflow-hidden z-10">
            <span className="relative z-10">SUBMIT ANOTHER QUOTE</span>
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <section className={`relative overflow-hidden ${standalone ? 'min-h-screen pt-28' : 'py-24'}`}
      style={{ background: standalone ? '#000' : '#030810' }}>
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
          <h2 className="font-bebas text-white leading-none"
            style={{ fontSize:'clamp(48px,7vw,80px)' }}>
            SHIP SMARTER.
            <br />
            <span style={{ color:'#1A6FD4' }}>QUOTE IN 60 SECONDS.</span>
          </h2>
        </motion.div>

        {/* Card */}
        <div className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
          style={{
            background:'rgba(0,0,0,0.6)',
            backdropFilter:'blur(20px)',
            border:'1px solid rgba(26,111,212,0.2)',
            boxShadow:'0 0 60px rgba(26,111,212,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>

          {/* Progress — truck bar */}
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
              {Array.from({ length:TOTAL }, (_,i) => (
                <button key={i} onClick={() => i + 1 <= step && go(i+1)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width:  i+1 === step ? '20px' : '7px',
                    height: '7px',
                    background: i+1 <= step ? '#1A6FD4' : 'rgba(255,255,255,0.08)',
                    boxShadow:  i+1 === step ? '0 0 10px rgba(26,111,212,0.8)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir}
              variants={slide} initial="initial" animate="animate" exit="exit"
              transition={slide.transition}>

              {/* STEP 1 – Shipment type */}
              {step === 1 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>WHAT ARE YOU SHIPPING?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SHIPMENT.map(t => (
                      <button key={t.id} onClick={() => update('shipmentType', t.id)}
                        className="p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
                        style={{
                          background: form.shipmentType === t.id ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border:`1px solid ${form.shipmentType === t.id ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow:   form.shipmentType === t.id ? '0 0 15px rgba(26,111,212,0.25)' : 'none',
                          transform:   form.shipmentType === t.id ? 'scale(1.04)' : 'scale(1)',
                        }}>
                        <svg className="w-7 h-7" style={{ color: form.shipmentType === t.id ? '#4A90E2' : '#888' }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                        </svg>
                        <span className="font-dm text-xs font-bold" style={{ color: form.shipmentType === t.id ? '#fff' : '#888' }}>
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2 – Collection */}
              {step === 2 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>COLLECTION DETAILS</h3>
                  <div className="space-y-4">
                    {[
                      { k:'collectionPostcode', label:'Collection Postcode', placeholder:'e.g. EC1A 1BB', mono:true },
                      { k:'collectionAddress',  label:'Full Address',        placeholder:'Street, City, County' },
                    ].map(f => (
                      <div key={f.k}>
                        <label className="block font-mono-rl text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color:'#888' }}>{f.label}</label>
                        <input type="text" value={form[f.k]} onChange={e => update(f.k, e.target.value)}
                          placeholder={f.placeholder} className={inputCls}
                          style={{ ...inputStyle, fontFamily: f.mono ? '"Space Mono",monospace' : '"DM Sans",sans-serif' }}
                          onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 – Delivery */}
              {step === 3 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>DELIVERY DETAILS</h3>
                  <div className="space-y-4">
                    {[
                      { k:'deliveryPostcode', label:'Delivery Postcode', placeholder:'e.g. M1 1AE', mono:true },
                      { k:'deliveryAddress',  label:'Full Address',      placeholder:'Street, City, County' },
                    ].map(f => (
                      <div key={f.k}>
                        <label className="block font-mono-rl text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color:'#888' }}>{f.label}</label>
                        <input type="text" value={form[f.k]} onChange={e => update(f.k, e.target.value)}
                          placeholder={f.placeholder} className={inputCls}
                          style={{ ...inputStyle, fontFamily: f.mono ? '"Space Mono",monospace' : '"DM Sans",sans-serif' }}
                          onFocus={onFocus} onBlur={onBlur} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4 – Timeframe */}
              {step === 4 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>WHEN DO YOU NEED IT?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMEFRAMES.map((t, i) => (
                      <motion.button key={t}
                        initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                        onClick={() => update('timeframe', t)}
                        className="p-4 rounded-xl font-bebas tracking-wider cursor-pointer transition-all duration-200 text-left"
                        style={{
                          fontSize:'18px',
                          background: form.timeframe === t ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border:`1px solid ${form.timeframe === t ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
                          color: form.timeframe === t ? '#fff' : '#888',
                          boxShadow: form.timeframe === t ? '0 0 15px rgba(26,111,212,0.2)' : 'none',
                        }}>
                        {t}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 – Weight */}
              {step === 5 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>WEIGHT & DIMENSIONS</h3>
                  <div className="space-y-2">
                    {WEIGHTS.map(w => (
                      <button key={w} onClick={() => update('weight', w)}
                        className="w-full px-5 py-4 rounded-xl font-bebas tracking-wider text-left cursor-pointer transition-all duration-200 flex items-center gap-3"
                        style={{
                          fontSize:'18px',
                          background: form.weight === w ? 'rgba(26,111,212,0.2)' : 'rgba(255,255,255,0.03)',
                          border:`1px solid ${form.weight === w ? 'rgba(26,111,212,0.65)' : 'rgba(255,255,255,0.08)'}`,
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

              {/* STEP 6 – Special */}
              {step === 6 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>SPECIAL REQUIREMENTS</h3>
                  <div className="space-y-3">
                    {SPECIAL.map((s, i) => (
                      <motion.button key={s}
                        initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
                        onClick={() => toggleSpecial(s)}
                        className="w-full px-5 py-4 rounded-xl font-dm font-semibold text-sm text-left cursor-pointer transition-all duration-200 flex items-center gap-3"
                        style={{
                          background: form.special.includes(s) ? 'rgba(26,111,212,0.15)' : 'rgba(255,255,255,0.03)',
                          border:`1px solid ${form.special.includes(s) ? 'rgba(26,111,212,0.55)' : 'rgba(255,255,255,0.08)'}`,
                          color: form.special.includes(s) ? '#fff' : '#888',
                        }}>
                        <span className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
                          style={{ background: form.special.includes(s) ? '#1A6FD4' : 'rgba(255,255,255,0.08)', border: form.special.includes(s) ? 'none' : '1px solid rgba(255,255,255,0.15)' }}>
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

              {/* STEP 7 – Contact */}
              {step === 7 && (
                <div>
                  <h3 className="font-bebas text-white mb-6" style={{ fontSize:'28px', letterSpacing:'0.05em' }}>YOUR CONTACT DETAILS</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { k:'name',    l:'Full Name',     p:'John Smith',          t:'text'  },
                      { k:'phone',   l:'Phone Number',  p:'+44 7700 900000',     t:'tel'   },
                      { k:'email',   l:'Email Address', p:'john@company.co.uk',  t:'email' },
                      { k:'company', l:'Company Name',  p:'Acme Ltd (optional)', t:'text'  },
                    ].map(f => (
                      <div key={f.k}>
                        <label className="block font-mono-rl text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color:'#888' }}>{f.l}</label>
                        <input type={f.t} value={form[f.k]} onChange={e => update(f.k, e.target.value)}
                          placeholder={f.p} className={inputCls} style={inputStyle}
                          onFocus={onFocus} onBlur={onBlur} />
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

            {step < TOTAL ? (
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
              SOMETHING WENT WRONG. CALL +44 7700 900000.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
