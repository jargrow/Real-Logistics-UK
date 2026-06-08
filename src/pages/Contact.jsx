import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all duration-200"
const inputStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)' }
const inputFocus = (e) => { e.target.style.borderColor='rgba(26,111,212,0.6)'; e.target.style.boxShadow='0 0 0 3px rgba(26,111,212,0.1)' }
const inputBlur  = (e) => { e.target.style.borderColor='rgba(255,255,255,0.1)'; e.target.style.boxShadow='none' }

export default function Contact() {
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', message:'' })
  const [status, setStatus] = useState('idle')

  const update = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CONTACT_TEMPLATE_ID',
        { ...form },
        'YOUR_PUBLIC_KEY',
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Header */}
      <section className="relative pt-36 pb-20 overflow-hidden" style={{ background:'#000' }}>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="section-label mb-3">Contact Us</motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.7 }}
            className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's Talk <span className="text-gradient">Logistics</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
            className="text-sm max-w-lg mx-auto" style={{ color:'#888' }}>
            Have a question, need a bespoke quote or want to discuss an account? Our team responds within 15 minutes.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-6" style={{ background:'#050508' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, delay:0.1 }}
          >
            {status === 'success' ? (
              <div className="glass rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
                style={{ border:'1px solid rgba(26,111,212,0.3)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background:'rgba(26,111,212,0.2)', border:'2px solid #1A6FD4' }}>
                  <svg className="w-8 h-8" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-sm" style={{ color:'#888' }}>We'll be in touch within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="glass rounded-2xl p-8"
                style={{ border:'1px solid rgba(255,255,255,0.08)' }}>
                <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>
                <div className="space-y-4">
                  {[
                    { k:'name',    label:'Full Name',     type:'text',  placeholder:'John Smith'         },
                    { k:'email',   label:'Email Address', type:'email', placeholder:'john@company.co.uk' },
                    { k:'phone',   label:'Phone Number',  type:'tel',   placeholder:'+44 1992 661695'    },
                  ].map(f => (
                    <div key={f.k}>
                      <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:'#888' }}>{f.label}</label>
                      <input type={f.type} value={form[f.k]} onChange={e => update(f.k, e.target.value)}
                        placeholder={f.placeholder} className={inputClass} style={inputStyle}
                        onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color:'#888' }}>Message</label>
                    <textarea value={form.message} onChange={e => update('message', e.target.value)}
                      placeholder="How can we help you?" rows={4}
                      className={inputClass + ' resize-none'} style={inputStyle}
                      onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'}
                  className="mt-6 w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer btn-primary relative overflow-hidden z-10 disabled:opacity-70">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === 'loading' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </span>
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs text-center mt-3">
                    Something went wrong. Please call +44 1992 661695.
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Contact info + map placeholder */}
          <motion.div
            initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.6, delay:0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-7" style={{ border:'1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-lg font-bold text-white mb-5">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title:'Office', val:'+44 1992 661695', sub:'Mon–Sun, 24/7', href:'tel:+441992661695' },
                  { icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Email', val:'info@real-logistics.co.uk', href:'mailto:info@real-logistics.co.uk', sub:'Response within 15 minutes' },
                  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Coverage', val:'Nationwide UK', sub:'Every postcode covered' },
                  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'Operating Hours', val:'24 Hours / 7 Days', sub:'365 days a year', href:null },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ background:'rgba(26,111,212,0.12)', border:'1px solid rgba(26,111,212,0.25)' }}>
                      <svg className="w-5 h-5" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color:'#888' }}>{item.title}</div>
                      {item.href
                        ? <a href={item.href} className="text-sm font-semibold text-white hover:text-[#4A90E2] transition-colors">{item.val}</a>
                        : <div className="text-sm font-semibold text-white">{item.val}</div>
                      }
                      <div className="text-xs" style={{ color:'#666' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA card */}
            <a href="https://wa.me/447359629231" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 rounded-2xl cursor-pointer group transition-all duration-200"
              style={{
                background: 'rgba(37,211,102,0.07)',
                border: '1px solid rgba(37,211,102,0.25)',
                boxShadow: '0 0 20px rgba(37,211,102,0.08)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(37,211,102,0.12)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.45)'; e.currentTarget.style.boxShadow='0 0 30px rgba(37,211,102,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(37,211,102,0.07)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.25)'; e.currentTarget.style.boxShadow='0 0 20px rgba(37,211,102,0.08)' }}
            >
              <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background:'rgba(37,211,102,0.15)', border:'1px solid rgba(37,211,102,0.35)', boxShadow:'0 0 16px rgba(37,211,102,0.3)' }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-dm font-bold text-white text-sm mb-0.5">Get a faster response on WhatsApp</div>
                <div className="font-mono-rl text-[10px] tracking-widest uppercase" style={{ color:'#25D366' }}>+44 7359 629231 · Avg reply under 5 mins</div>
              </div>
              <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ color:'#25D366' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden" style={{ height:240, border:'1px solid rgba(26,111,212,0.2)' }}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                alt="UK Coverage Map"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background:'rgba(0,0,0,0.4)' }}>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
