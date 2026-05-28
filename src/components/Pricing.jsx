import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

const included = [
  'Complete one-page website',
  'Core sections (home, about, services, etc.)',
  'Mobile-ready',
  'Contact form',
]

export default function Pricing() {
  return (
    <motion.section
      id="pricing"
      style={{ background: 'var(--color-bg-light)', padding: '80px 24px', borderTop: '3px solid var(--color-accent)' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container">
        <p className="section-label">Pricing</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 48 }}
        >
          Simple. Flat. No Surprises.
        </motion.h2>

        <motion.div
          variants={fadeInUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 48,
            background: 'var(--color-bg-dark)',
            padding: '48px 48px',
          }}
        >
          {/* Price */}
          <div style={{ flexShrink: 0 }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              The Site
            </p>
            <p style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(64px, 10vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 0 }}>
              $2,000
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 4 }}>flat. no retainer. no surprises.</p>
          </div>

          {/* Divider */}
          <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.1)', flexShrink: 0, minHeight: 80 }} />

          {/* Included list */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              What you get
            </p>
            <ul style={{ listStyle: 'none' }}>
              {included.map(item => (
                <li key={item} style={{ color: 'var(--color-text-muted)', fontSize: 15, marginBottom: 10, paddingLeft: 22, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)', fontWeight: 900 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div style={{ flexShrink: 0 }}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block',
                background: 'var(--color-accent)',
                color: '#fff',
                fontFamily: 'var(--font-black)',
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
                padding: '16px 32px',
                textDecoration: 'none',
              }}
            >
              Get Started →
            </motion.a>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 12, textAlign: 'center' }}>
              Add-ons from +$500 each
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
