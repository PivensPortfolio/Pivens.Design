import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

const included = ['Home section', 'About section', 'Services section', 'Reviews section', 'FAQ section', 'Contact form']

const addOns = [
  'Online booking / appointment scheduling',
  'Email list signup',
  'Customer feedback form',
  'Live chat widget',
  'Blog (up to 3 starter posts)',
  'Photo gallery',
  'Event calendar',
  'Menu or price list',
  'Team / staff directory',
  'Job listings / careers section',
  'Before & after gallery',
  'Social media feed (Instagram)',
  'Google Reviews embed',
  'Pop-up lead capture',
  'Client intake / onboarding form',
  'Google Maps + directions',
]

export default function WhatIsIncluded() {
  return (
    <motion.section
      style={{ background: '#fff', padding: '80px 24px', borderTop: '1px solid var(--color-border)' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container">
        <p className="section-label">What's Included</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 40 }}
        >
          Everything on One Page.
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
          {included.map(item => (
            <motion.div key={item} variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--color-bg-light)', padding: '14px 18px' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 900, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{item}</span>
            </motion.div>
          ))}
        </div>
        <motion.p variants={fadeInUp} style={{ color: '#666', fontSize: 15, marginBottom: 56 }}>Mobile-ready. Delivered in days.</motion.p>

        {/* Add-ons */}
        <motion.div variants={fadeInUp} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 48 }}>
          <p className="section-label" style={{ marginBottom: 8 }}>Add-Ons</p>
          <h3 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 8 }}>
            Need More? Add It On.
          </h3>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
            Any of the following can be added. Frontend features from <strong>+$249</strong>. Backend features (galleries, events, booking, etc.) from <strong>+$499</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {addOns.map(item => (
              <motion.div
                key={item}
                variants={fadeInUp}
                style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--color-border)', padding: '12px 16px', background: '#fff' }}
                whileHover={{ borderColor: 'var(--color-accent)', background: 'var(--color-bg-light)' }}
              >
                <span style={{ color: 'var(--color-accent)', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>+</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{item}</span>
              </motion.div>
            ))}
          </div>
          <p style={{ color: '#999', fontSize: 13, marginTop: 20 }}>
            Don't see what you need? Ask — if it can be built into a single page, we can price it.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
