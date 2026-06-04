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
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src="/images/rl-logo.png"
              alt="Real Logistics Limited"
              className="h-11 w-auto object-contain py-0.5"
              style={{ filter: 'drop-shadow(0 0 8px rgba(26,111,212,0.4))' }}
            />
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
          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/447359629231"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold tracking-wide cursor-pointer"
              style={{
                background: 'linear-gradient(135deg,#25D366,#128C7E)',
                boxShadow: '0 0 16px rgba(37,211,102,0.35)',
                color: '#fff',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 0 28px rgba(37,211,102,0.6)'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='0 0 16px rgba(37,211,102,0.35)'; e.currentTarget.style.transform='translateY(0)' }}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </motion.a>

            {/* Get a Quote */}
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
                className="mt-2 block text-center px-5 py-3 rounded-lg text-sm font-bold cursor-pointer text-white"
                style={{ background: 'linear-gradient(135deg,#1A6FD4,#0E4A9A)' }}
              >
                Get a Quote
              </Link>
              <a
                href="https://wa.me/447359629231"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold cursor-pointer text-white"
                style={{
                  background: 'linear-gradient(135deg,#25D366,#128C7E)',
                  boxShadow: '0 0 16px rgba(37,211,102,0.3)',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
