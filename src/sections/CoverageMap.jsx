import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const UK_PATH = "M340,40 L360,30 L380,35 L390,55 L380,70 L370,80 L360,75 L350,85 L360,95 L355,110 L340,115 L330,105 L325,90 L335,75 L320,65 L310,55 L320,45 Z M300,120 L320,115 L335,125 L340,140 L330,155 L315,160 L300,155 L290,145 L285,130 L295,120 Z M240,160 L270,150 L295,155 L310,170 L320,190 L330,210 L340,230 L350,250 L360,270 L355,290 L340,305 L320,315 L300,320 L280,325 L260,320 L250,305 L240,290 L230,270 L220,250 L215,230 L220,210 L230,190 L235,170 Z M150,200 L180,195 L210,205 L215,220 L205,235 L190,240 L170,238 L155,228 L145,215 Z"

const cities = [
  { name:'London',     x:310, y:290, major:true  },
  { name:'Manchester', x:258, y:195, major:true  },
  { name:'Birmingham', x:275, y:242, major:true  },
  { name:'Edinburgh',  x:290, y:85,  major:true  },
  { name:'Cardiff',    x:222, y:275, major:false },
  { name:'Belfast',    x:160, y:140, major:false },
  { name:'Leeds',      x:283, y:192, major:false },
  { name:'Liverpool',  x:246, y:207, major:false },
  { name:'Glasgow',    x:272, y:90,  major:false },
  { name:'Bristol',    x:240, y:285, major:false },
]

const routes = [[0,1],[0,2],[0,3],[1,2],[2,4],[1,5],[0,9],[2,6],[1,7],[3,8]]

const coverageList = [
  { region:'London & South East',  detail:'Fastest 2-hour windows' },
  { region:'Midlands & North',     detail:'Manchester · Leeds · Liverpool' },
  { region:'Scotland',             detail:'Edinburgh & Glasgow hubs' },
  { region:'Wales & South West',   detail:'Cardiff · Bristol · Bath' },
  { region:'Northern Ireland',     detail:'Belfast & beyond' },
]

export default function CoverageMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once:true, margin:'-100px' })

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background:'#000' }}>
      <div className="absolute inset-0 dot-bg opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* SVG Map */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
          >
            <svg viewBox="100 20 350 340" className="w-full max-w-lg mx-auto"
              style={{ filter:'drop-shadow(0 0 40px rgba(26,111,212,0.12))' }}>
              {/* UK silhouette */}
              <path d={UK_PATH} fill="rgba(26,111,212,0.05)" stroke="rgba(26,111,212,0.2)" strokeWidth="1.5" />

              {/* Route lines */}
              {inView && routes.map(([a,b], i) => {
                const ca = cities[a], cb = cities[b]
                return (
                  <motion.line key={i}
                    x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
                    stroke="#1A6FD4" strokeWidth="1" strokeOpacity="0.3"
                    strokeDasharray="4 4"
                    initial={{ pathLength:0, opacity:0 }}
                    animate={{ pathLength:1, opacity:1 }}
                    transition={{ duration:1.4, delay:0.4 + i*0.1 }}
                  />
                )
              })}

              {/* Pulse rings + dots */}
              {cities.map((c,i) => (
                <g key={c.name}>
                  {inView && c.major && (
                    <motion.circle cx={c.x} cy={c.y} r={9}
                      fill="transparent" stroke="#1A6FD4" strokeWidth="1"
                      initial={{ scale:0.5, opacity:0.8 }}
                      animate={{ scale:2.2, opacity:0 }}
                      transition={{ duration:2.2, delay:0.6 + i*0.2, repeat:Infinity, repeatDelay:0.8 }}
                    />
                  )}
                  <motion.circle cx={c.x} cy={c.y} r={c.major ? 5 : 3}
                    fill={c.major ? '#1A6FD4' : '#4A90E2'}
                    stroke={c.major ? '#4A90E2' : '#1A6FD4'} strokeWidth="1.5"
                    initial={{ scale:0, opacity:0 }}
                    animate={inView ? { scale:1, opacity:1 } : {}}
                    transition={{ duration:0.4, delay:0.5 + i*0.08, type:'spring' }}
                    style={{ filter: c.major ? 'drop-shadow(0 0 5px rgba(26,111,212,0.9))' : 'none' }}
                  />
                  {c.major && (
                    <motion.text x={c.x+7} y={c.y+4}
                      fontSize="8.5" fill="rgba(255,255,255,0.75)"
                      fontFamily='"Space Mono",monospace' fontWeight="700"
                      initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
                      transition={{ delay:0.8 + i*0.08 }}
                    >
                      {c.name}
                    </motion.text>
                  )}
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.8, ease:[0.22,1,0.36,1], delay:0.2 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px]" style={{ background:'#1A6FD4' }} />
              <span className="section-label">UK Coverage</span>
            </div>
            <h2 className="font-bebas text-white leading-none mb-4"
              style={{ fontSize:'clamp(48px,7vw,88px)' }}>
              WE GO EVERYWHERE
              <br />
              <span style={{ color:'#1A6FD4' }}>YOU NEED US</span>
            </h2>
            <p className="font-dm text-sm leading-relaxed mb-8" style={{ color:'#888' }}>
              England. Scotland. Wales. Ireland. All covered, all the time.
              <br />
              Our growing fleet reaches every UK postcode — no exceptions.
            </p>

            <div className="space-y-3">
              {coverageList.map((item, i) => (
                <motion.div key={item.region}
                  initial={{ opacity:0, x:20 }}
                  animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ delay:0.5 + i*0.08 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 cursor-pointer group"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(26,111,212,0.08)'; e.currentTarget.style.borderColor='rgba(26,111,212,0.25)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.06)' }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background:'#1A6FD4', boxShadow:'0 0 8px rgba(26,111,212,0.8)' }} />
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily:'"DM Sans",sans-serif' }}>{item.region}</div>
                    <div className="font-mono-rl text-[10px] tracking-widest uppercase mt-0.5" style={{ color:'#888' }}>{item.detail}</div>
                  </div>
                  <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:'#4A90E2' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
