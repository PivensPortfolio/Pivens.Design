import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(26, 26, 26, 0.85)',
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
        <div style={{ display: 'flex', gap: 28 }}>
          {['Pricing', 'Work', 'Contact'].map((link, i) => (
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
      </div>
    </motion.nav>
  )
}
