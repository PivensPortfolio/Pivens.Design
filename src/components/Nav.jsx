import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Pricing', 'Work', 'Contact']

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 24px',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 56,
        }}>
          <a href="#" style={{ fontFamily: 'var(--font-black)', fontSize: 16, fontWeight: 900, letterSpacing: 2 }}>
            <span style={{ color: '#fff' }}>PIVENS</span>
            <span style={{ color: 'var(--color-accent)' }}>.DESIGN</span>
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                style={{ color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{ color: '#fff', fontSize: 22, lineHeight: 1, padding: '4px 0' }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'sticky',
              top: 56,
              zIndex: 99,
              background: 'rgba(13, 13, 13, 0.98)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '2px solid var(--color-accent)',
              overflow: 'hidden',
            }}
          >
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '20px 32px',
                  color: '#fff',
                  fontFamily: 'var(--font-black)',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                {link} <span style={{ color: 'var(--color-accent)' }}>→</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
