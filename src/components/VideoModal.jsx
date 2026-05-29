import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function VideoModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          exit={{ opacity:0 }}
          transition={{ duration:0.35 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ background:'rgba(0,0,0,0.92)', backdropFilter:'blur(10px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale:0.8, opacity:0 }}
            animate={{ scale:1,   opacity:1 }}
            exit={{ scale:0.85, opacity:0 }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            className="relative w-full max-w-4xl mx-6"
            style={{ aspectRatio:'16/9' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-2xl pointer-events-none"
              style={{ background:'linear-gradient(135deg,#1A6FD4,transparent,#1A6FD4)', opacity:0.4 }} />

            {/* Video placeholder – swap src for a real embed */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center"
              style={{ background:'#050A14', border:'1px solid rgba(26,111,212,0.3)' }}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer"
                  style={{ background:'rgba(26,111,212,0.2)', border:'2px solid #1A6FD4', boxShadow:'0 0 30px rgba(26,111,212,0.4)' }}>
                  <svg className="w-8 h-8 ml-1" style={{ color:'#4A90E2' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-bebas text-3xl text-white mb-1">Real Logistics Story</p>
                <p className="text-sm" style={{ color:'#888', fontFamily:'"DM Sans", sans-serif' }}>
                  Replace this with your YouTube/Vimeo embed URL
                </p>
              </div>
            </div>

            {/* Close */}
            <button onClick={onClose}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
              style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)' }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
