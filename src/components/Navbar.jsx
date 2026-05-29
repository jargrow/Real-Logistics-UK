import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',        label: 'Home' },
  { to: '/services',label: 'Services' },
  { to: '/about',   label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[200]"
    >
      <nav
        className="mx-auto transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(0,0,0,0.85)'
            : 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(26,111,212,0.25)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-sm"
              style={{
                background: 'linear-gradient(135deg,#1A6FD4,#0E4A9A)',
                boxShadow: '0 0 15px rgba(26,111,212,0.5)',
              }}
            >
              RL
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none tracking-wider uppercase group-hover:text-blue-400 transition-colors">
                Real Logistics
              </div>
              <div className="text-[10px] text-[#888] tracking-[0.2em] uppercase font-medium">
                Limited
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l, i) => {
              const active = location.pathname === l.to
              return (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    to={l.to}
                    className="relative px-4 py-2 text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-200"
                    style={{ color: active ? '#4A90E2' : 'rgba(255,255,255,0.8)' }}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: '#1A6FD4', boxShadow: '0 0 8px #1A6FD4' }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/quote"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide cursor-pointer btn-primary relative overflow-hidden z-10"
                style={{ background: 'linear-gradient(135deg,#1A6FD4,#0E4A9A)' }}
              >
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="relative z-10">Get a Quote</span>
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              {[0,1,2].map(i => (
                <motion.span
                  key={i}
                  className="block h-0.5 bg-white rounded-full"
                  animate={{
                    width: menuOpen && i === 1 ? 0 : '20px',
                    rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                    y:      menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
            className="md:hidden"
            style={{
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(26,111,212,0.2)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={l.to}
                    className="block px-4 py-3 text-white font-semibold rounded-lg cursor-pointer transition-colors"
                    style={{ background: location.pathname === l.to ? 'rgba(26,111,212,0.15)' : 'transparent' }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/quote"
                className="mt-2 block text-center px-5 py-3 rounded-lg text-sm font-bold cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#1A6FD4,#0E4A9A)' }}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
