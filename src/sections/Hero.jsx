import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ── UI/UX Pro Max: Editorial service style · clean minimal · 4.5:1 contrast ──
const THEMES = {
  light: {
    sectionBg:    '#F5F7FA',
    photo:        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80',
    photoFilter:  'brightness(0.52) saturate(0.9)',
    overlay:      'linear-gradient(110deg,rgba(245,247,250,0.94) 0%,rgba(235,242,252,0.72) 46%,rgba(0,0,0,0.0) 100%)',
    overlayBot:   'linear-gradient(to top,rgba(245,247,250,0.65) 0%,transparent 55%)',
    heading:      '#0A1428',
    headingAccent:'#1A6FD4',
    headingSub:   '#64748B',
    body:         '#475569',
    tag:          { bg:'rgba(26,111,212,0.1)',  border:'rgba(26,111,212,0.28)', color:'#1A6FD4' },
    card:         { bg:'rgba(255,255,255,0.93)', border:'rgba(26,111,212,0.16)', text:'#0A1428', muted:'#6B7280' },
    bar:          { bg:'rgba(255,255,255,0.88)', border:'rgba(0,0,0,0.08)',      text:'#0A1428', muted:'#6B7280', div:'rgba(0,0,0,0.08)' },
    ghostBtn:     { bg:'rgba(10,20,40,0.07)', border:'rgba(10,20,40,0.18)', color:'#0A1428' },
    van:          { body:'#D4E2F4', cab:'#C2D0E8', accent:'#1A6FD4', wheel:'#2A3A5A', glass:'rgba(26,111,212,0.32)' },
    tog:          { onBg:'rgba(26,111,212,0.12)', onBorder:'rgba(26,111,212,0.45)', onText:'#1A6FD4',
                    offBg:'rgba(0,0,0,0.05)', offBorder:'rgba(0,0,0,0.12)', offText:'#9CA3AF' },
  },
  dark: {
    sectionBg:    '#040D1E',
    photo:        'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80',
    photoFilter:  'brightness(0.32) saturate(0.75)',
    overlay:      'linear-gradient(110deg,rgba(4,13,30,0.93) 0%,rgba(4,13,30,0.65) 46%,rgba(0,0,0,0.06) 100%)',
    overlayBot:   'linear-gradient(to top,rgba(4,13,30,0.7) 0%,transparent 55%)',
    heading:      '#FFFFFF',
    headingAccent:'#1A6FD4',
    headingSub:   '#94A3B8',
    body:         '#CBD5E1',
    tag:          { bg:'rgba(26,111,212,0.15)', border:'rgba(26,111,212,0.38)', color:'#4A90E2' },
    card:         { bg:'rgba(8,16,32,0.88)',    border:'rgba(26,111,212,0.22)', text:'#FFFFFF',  muted:'#888888' },
    bar:          { bg:'rgba(4,13,30,0.90)',    border:'rgba(26,111,212,0.16)', text:'#FFFFFF',  muted:'#888888', div:'rgba(255,255,255,0.07)' },
    ghostBtn:     { bg:'rgba(255,255,255,0.06)', border:'rgba(255,255,255,0.18)', color:'#FFFFFF' },
    van:          { body:'#0D1E38', cab:'#0A1428', accent:'#1A6FD4', wheel:'#05090F', glass:'rgba(74,144,226,0.38)' },
    tog:          { onBg:'rgba(26,111,212,0.22)', onBorder:'rgba(26,111,212,0.58)', onText:'#4A90E2',
                    offBg:'rgba(255,255,255,0.05)', offBorder:'rgba(255,255,255,0.1)', offText:'#4B5563' },
  },
}

const EASE = [0.22, 1, 0.36, 1]

// ── Delivery van SVG ──────────────────────────────────────────
function DeliveryVan({ v }) {
  return (
    <svg viewBox="0 0 340 168" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ width:'100%', height:'auto', filter:'drop-shadow(0 8px 32px rgba(26,111,212,0.25))' }}>
      <defs>
        <filter id="headGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Trailer */}
      <rect x="4" y="24" width="230" height="100" rx="7" fill={v.body} stroke={v.accent} strokeWidth="1.5"/>
      {[42,76,110,144,178,212].map(x => (
        <line key={x} x1={x} y1="24" x2={x} y2="124" stroke={v.accent} strokeWidth="0.7" opacity="0.22"/>
      ))}
      {/* Door split */}
      <line x1="117" y1="24" x2="117" y2="124" stroke={v.accent} strokeWidth="1.4" opacity="0.48"/>
      <rect x="108" y="67" width="7" height="10" rx="3.5" fill={v.accent}/>
      <rect x="120" y="67" width="7" height="10" rx="3.5" fill={v.accent}/>
      {/* RL badge on side */}
      <rect x="44" y="58" width="48" height="30" rx="6" fill={v.accent}
        style={{ filter:'drop-shadow(0 0 8px rgba(26,111,212,0.6))' }}/>
      <text x="68" y="78" textAnchor="middle" fill="white"
        fontFamily="'Bebas Neue',sans-serif" fontSize="18" fontWeight="bold">RL</text>

      {/* Cab */}
      <path d="M234 124 L234 54 Q234 42 246 42 L276 42 Q295 42 298 58 L298 100 Q298 114 284 114 Z"
        fill={v.cab} stroke={v.accent} strokeWidth="1.5"/>
      {/* Windscreen */}
      <path d="M236 53 L246 44 L274 44 L282 53 L282 78 L236 78 Z" fill={v.glass}/>
      {/* Headlight */}
      <rect x="292" y="82" width="6" height="24" rx="3" fill="#60A5FA" filter="url(#headGlow)" opacity="0.95"/>

      {/* Rear wheel */}
      <circle cx="70"  cy="130" r="24" fill={v.wheel}/>
      <circle cx="70"  cy="130" r="14" fill={v.body} stroke={v.accent} strokeWidth="1.2"/>
      <circle cx="70"  cy="130" r="5"  fill={v.accent}/>
      {/* Front wheel */}
      <circle cx="272" cy="130" r="24" fill={v.wheel}/>
      <circle cx="272" cy="130" r="14" fill={v.cab} stroke={v.accent} strokeWidth="1.2"/>
      <circle cx="272" cy="130" r="5"  fill={v.accent}/>

      {/* Motion speed lines */}
      {[60, 75, 90].map((y, i) => (
        <line key={y} x1={-6 - i*9} y1={y} x2={28 - i*5} y2={y}
          stroke={v.accent} strokeWidth="2" opacity={0.38 - i*0.1} strokeDasharray="14 8"/>
      ))}

      {/* Ground shadow */}
      <ellipse cx="170" cy="155" rx="140" ry="8" fill={v.accent} opacity="0.08"/>
    </svg>
  )
}

// ── Floating route card ───────────────────────────────────────
function RouteCard({ c, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { y:28, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ delay:1.85, duration:0.55, ease:EASE }}
      style={{
        position:'absolute', bottom:'-16px', left:'-22px',
        background:c.bg, border:`1px solid ${c.border}`,
        backdropFilter:'blur(22px)', WebkitBackdropFilter:'blur(22px)',
        borderRadius:'16px', padding:'14px 18px', minWidth:'216px',
      }}
    >
      <div className="font-mono-rl text-[10px] tracking-[0.18em] uppercase mb-2.5" style={{ color:'#1A6FD4' }}>
        Live Tracking
      </div>
      <div className="flex items-center gap-3 mb-2.5">
        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background:'rgba(26,111,212,0.15)' }}>
          <svg className="w-3.5 h-3.5" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-semibold font-dm leading-none" style={{ color:c.text }}>Manchester → London</div>
          <div className="text-[11px] mt-0.5 font-dm" style={{ color:c.muted }}>ETA: 2h 45m · On track</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background:'#22C55E' }}/>
          <span className="font-mono-rl text-[10px] tracking-widest" style={{ color:'#22C55E' }}>IN TRANSIT</span>
        </div>
        <span className="font-mono-rl text-[10px] px-2 py-0.5 rounded-full"
          style={{ background:'rgba(26,111,212,0.13)', color:'#4A90E2' }}>98% ON-TIME</span>
      </div>
    </motion.div>
  )
}

// ── Floating stats badge ──────────────────────────────────────
function StatsBadge({ c, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { x:24, opacity:0 }}
      animate={{ x:0, opacity:1 }}
      transition={{ delay:2.05, duration:0.5, ease:EASE }}
      style={{
        position:'absolute', top:'-14px', right:'-18px',
        background:c.bg, border:`1px solid ${c.border}`,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        borderRadius:'14px', padding:'12px 16px',
        display:'flex', alignItems:'center', gap:'12px',
      }}
    >
      <div className="font-bebas text-3xl leading-none"
        style={{ color:'#1A6FD4', textShadow:'0 0 12px rgba(26,111,212,0.5)' }}>500+</div>
      <div>
        <div className="text-[13px] font-bold font-dm leading-tight" style={{ color:c.text }}>Monthly</div>
        <div className="text-[11px] font-dm" style={{ color:c.muted }}>Deliveries</div>
      </div>
    </motion.div>
  )
}

// ── MAIN HERO ─────────────────────────────────────────────────
export default function Hero() {
  const [theme, setTheme] = useState('dark')
  const reduced = useReducedMotion()
  const t = THEMES[theme]

  return (
    <section
      className="relative overflow-hidden"
      style={{ height:'100vh', minHeight:'700px', background:t.sectionBg }}
      aria-label="Real Logistics Limited hero"
    >
      {/* ── Background photo, Ken Burns on mount ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${theme}`}
          className="absolute inset-0 z-0"
          initial={reduced ? false : { opacity:0, scale:1.06 }}
          animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:1.6, ease:'easeOut' }}
        >
          <img src={t.photo} alt="UK road scene"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'center 40%', filter:t.photoFilter }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background:t.overlay }}/>
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background:t.overlayBot }}/>

      {/* ── Page content ── */}
      <div className="relative z-[2] h-full flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 md:px-14 lg:px-20 pt-7">
          <motion.div className="flex items-center gap-3"
            initial={reduced ? false : { opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.15, duration:0.45 }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bebas text-white text-sm"
              style={{ background:'linear-gradient(135deg,#1A6FD4,#0E4A9A)',
                boxShadow:'0 0 16px rgba(26,111,212,0.5)' }}>RL</div>
            <span className="font-barlow text-[12px] tracking-[0.28em] uppercase select-none hidden sm:block"
              style={{ color: theme === 'light' ? '#64748B' : '#94A3B8' }}>
              Real Logistics Limited
            </span>
          </motion.div>

          {/* Light / Dark toggle */}
          <motion.div className="flex gap-1.5"
            initial={reduced ? false : { opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.3 }}>
            {[{ id:'light', icon:'☀', label:'Light' }, { id:'dark', icon:'◉', label:'Dark' }].map(opt => (
              <motion.button key={opt.id} onClick={() => setTheme(opt.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 font-mono-rl text-[10px] tracking-[0.15em] uppercase cursor-pointer"
                style={{
                  borderRadius:'999px',
                  background: theme === opt.id ? t.tog.onBg  : t.tog.offBg,
                  border:`1px solid ${theme === opt.id ? t.tog.onBorder : t.tog.offBorder}`,
                  color:      theme === opt.id ? t.tog.onText : t.tog.offText,
                  transition:'all 0.2s',
                }}
                whileHover={{ scale:1.06 }} whileTap={{ scale:0.93 }}>
                {opt.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* ── Two-column main area ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-8 md:px-14 lg:px-20 py-6">

          {/* LEFT — copy */}
          <div className="max-w-lg">

            {/* Tag pill */}
            <motion.div className="inline-flex items-center gap-2.5 mb-7 cursor-default"
              style={{ background:t.tag.bg, border:`1px solid ${t.tag.border}`, borderRadius:'999px', padding:'6px 16px' }}
              initial={reduced ? false : { opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.48, duration:0.5, ease:EASE }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background:t.tag.color }}/>
              <span className="font-mono-rl text-[11px] tracking-[0.2em] uppercase" style={{ color:t.tag.color }}>
                UK Same-Day Courier · 24 / 7
              </span>
            </motion.div>

            {/* Headline — 3-line stagger */}
            <div className="mb-7" style={{ lineHeight:'0.92' }}>
              {[
                { word:'REAL',      size:'clamp(52px,8.5vw,104px)', color:t.heading      },
                { word:'LOGISTICS', size:'clamp(64px,11vw,132px)',  color:'#1A6FD4'      },
                { word:'LIMITED',   size:'clamp(42px,6.8vw,84px)',  color:t.headingSub   },
              ].map((l, i) => (
                <div key={l.word} className="overflow-hidden">
                  <motion.h1 className="font-bebas block select-none"
                    style={{ fontSize:l.size, color:l.color, letterSpacing:'-0.01em',
                      textShadow: i === 1 ? '0 0 48px rgba(26,111,212,0.45)' : 'none' }}
                    initial={reduced ? false : { y:90, opacity:0 }}
                    animate={{ y:0, opacity:1 }}
                    transition={{ delay:0.72 + i*0.13, duration:0.72, ease:[0.22,1,0.36,1] }}>
                    {l.word}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Body copy */}
            <motion.p className="font-dm text-[15px] leading-relaxed mb-8 max-w-[360px]"
              style={{ color:t.body }}
              initial={reduced ? false : { opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.12, duration:0.55, ease:EASE }}>
              Nationwide UK coverage. Same-day, overnight freight
              &amp; fragile goods — GPS tracked, photo confirmed,
              dispatched within 15 minutes.
            </motion.p>

            {/* CTA pair */}
            <motion.div className="flex flex-wrap gap-3"
              initial={reduced ? false : { opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:1.28, duration:0.55, ease:EASE }}>

              <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                <Link to="/quote"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer text-white"
                  style={{ borderRadius:'999px', background:'linear-gradient(135deg,#1A6FD4,#0E4A9A)',
                    boxShadow:'0 4px 28px rgba(26,111,212,0.5)' }}>
                  Get Instant Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}>
                <Link to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-[13px] tracking-[0.1em] uppercase cursor-pointer"
                  style={{ borderRadius:'999px', background:t.ghostBtn.bg,
                    border:`1.5px solid ${t.ghostBtn.border}`, color:t.ghostBtn.color }}>
                  Our Services
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — animated van + cards */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative" style={{ width:'400px', height:'300px' }}>

              {/* Van slides in from right */}
              <motion.div className="absolute"
                style={{ top:'44px', left:'16px', width:'370px' }}
                initial={reduced ? false : { x:340, opacity:0, rotate:1 }}
                animate={{ x:0, opacity:1, rotate:0 }}
                transition={{ delay:0.25, duration:1.35, ease:[0.16,1,0.3,1] }}>
                <DeliveryVan v={t.van} />
              </motion.div>

              <RouteCard  c={t.card} reduced={reduced} />
              <StatsBadge c={t.card} reduced={reduced} />
            </div>
          </div>
        </div>

        {/* ── Bottom stats bar ── */}
        <motion.div
          className="mx-6 md:mx-14 lg:mx-20 mb-6 rounded-2xl overflow-hidden"
          style={{ background:t.bar.bg, border:`1px solid ${t.bar.border}`,
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)' }}
          initial={reduced ? false : { opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:1.6, duration:0.6, ease:EASE }}>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { v:'500+', l:'Monthly Deliveries' },
              { v:'98%',  l:'On-Time Rate'       },
              { v:'24/7', l:'Always Available'   },
              { v:'4',    l:'UK Nations Covered' },
            ].map((s, i) => (
              <div key={s.l} className="flex flex-col items-center justify-center py-4 px-6 gap-0.5"
                style={{ borderLeft: i > 0 ? `1px solid ${t.bar.div}` : 'none' }}>
                <span className="font-bebas text-[26px] leading-none" style={{ color:'#1A6FD4' }}>{s.v}</span>
                <span className="font-dm text-[11px] text-center" style={{ color:t.bar.muted }}>{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
