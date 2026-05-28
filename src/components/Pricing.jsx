import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn, viewport } from '../utils/animations'

const tiers = [
  {
    name: 'The Site',
    price: '$2,000',
    items: ['Home', 'About', 'Services', 'Reviews', 'FAQ', 'Contact'],
    highlight: false,
    badge: null,
  },
  {
    name: 'The Site + Booking',
    price: '$2,500',
    items: ['Everything in The Site', 'Online booking integration'],
    highlight: true,
    badge: 'POPULAR',
  },
  {
    name: 'The Full Kit',
    price: '$3,500',
    items: ['Everything in The Site', 'Booking', 'Email list', 'Survey / feedback form'],
    highlight: false,
    badge: null,
  },
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {tiers.map(tier => (
            <motion.div
              key={tier.name}
              variants={scaleIn}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(249,115,22,0.2)' }}
              style={{
                background: tier.highlight ? 'var(--color-accent)' : 'var(--color-bg-dark)',
                padding: 32,
                position: 'relative',
                transition: 'box-shadow 0.2s',
              }}
            >
              {tier.badge && (
                <span style={{
                  position: 'absolute', top: -12, left: 24,
                  background: '#fff', color: 'var(--color-accent)',
                  fontFamily: 'var(--font-black)', fontSize: 10, fontWeight: 900,
                  letterSpacing: 1, padding: '3px 10px',
                }}>
                  {tier.badge}
                </span>
              )}
              <p style={{ color: tier.highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                {tier.name}
              </p>
              <p style={{ fontFamily: 'var(--font-black)', fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 24 }}>
                {tier.price}
                <span style={{ fontSize: 14, fontWeight: 400, color: tier.highlight ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}> flat</span>
              </p>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {tier.items.map(item => (
                  <li key={item} style={{ color: tier.highlight ? '#fff' : 'var(--color-text-muted)', fontSize: 14, marginBottom: 8, paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: tier.highlight ? '#fff' : 'var(--color-accent)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: 'block', textAlign: 'center',
                background: tier.highlight ? '#fff' : 'var(--color-accent)',
                color: tier.highlight ? 'var(--color-accent)' : '#fff',
                fontFamily: 'var(--font-black)', fontSize: 12, fontWeight: 900,
                letterSpacing: 1, textTransform: 'uppercase', padding: '12px 0',
              }}>
                Get Started →
              </a>
            </motion.div>
          ))}
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 13, marginTop: 24 }}>
          Need just one add-on? Booking, Email, or Surveys can be added to any package for +$500 each.
        </p>
      </div>
    </motion.section>
  )
}
