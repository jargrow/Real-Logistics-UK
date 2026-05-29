import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const quickLinks = ['Home','Services','About','Contact']
const services   = ['Same-Day Courier','Overnight Freight','Pallet Delivery','Fragile Goods','24/7 Emergency','Nationwide UK']

const socials = [
  { name:'Facebook',  path:'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { name:'Instagram', path:'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z' },
  { name:'LinkedIn',  path:'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
  { name:'Twitter',   path:'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background:'#050508', borderTop:'1px solid rgba(26,111,212,0.15)' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] pointer-events-none"
        style={{ background:'linear-gradient(90deg,transparent,#1A6FD4,transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Col 1 – Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 cursor-pointer">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background:'linear-gradient(135deg,#1A6FD4,#0E4A9A)', boxShadow:'0 0 15px rgba(26,111,212,0.4)' }}>
                RL
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wider uppercase">Real Logistics</div>
                <div className="text-[10px] text-[#888] tracking-[0.2em] uppercase">Limited</div>
              </div>
            </Link>
            <p className="text-[#888] text-sm leading-relaxed mb-5">
              Real Trust. Real Time. Real Solutions.<br/>
              UK's premier same-day courier &amp; transport service.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <motion.a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ scale:1.2, rotate:5, background:'rgba(26,111,212,0.2)', borderColor:'rgba(26,111,212,0.5)' }}
                  whileTap={{ scale:0.9 }}
                  transition={{ duration:0.15 }}
                >
                  <svg className="w-4 h-4 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[...quickLinks, 'Get a Quote'].map(l => (
                <motion.li key={l} whileHover={{ x:4 }} transition={{ duration:0.15 }}>
                  <Link
                    to={l === 'Home' ? '/' : l === 'Get a Quote' ? '/quote' : `/${l.toLowerCase()}`}
                    className="text-[#888] text-sm hover:text-[#4A90E2] transition-colors cursor-pointer flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#1A6FD4] flex-shrink-0" />
                    {l}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Services */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services"
                    className="text-[#888] text-sm hover:text-[#4A90E2] transition-colors cursor-pointer flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#1A6FD4] flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text:'+44 7700 900000' },
                { icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text:'info@reallogisticsltd.co.uk' },
                { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text:'Nationwide UK Coverage' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background:'rgba(26,111,212,0.15)', border:'1px solid rgba(26,111,212,0.25)' }}>
                    <svg className="w-4 h-4" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-[#888] text-sm pt-1.5">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[#555] text-xs">
            © 2025 Real Logistics Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(t => (
              <a key={t} href="#" className="text-[#555] text-xs hover:text-[#888] transition-colors cursor-pointer">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
