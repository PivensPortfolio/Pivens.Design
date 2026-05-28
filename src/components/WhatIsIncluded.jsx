import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

const items = ['Home section', 'About section', 'Services section', 'Reviews section', 'FAQ section', 'Contact form']

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {items.map(item => (
            <motion.div key={item} variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--color-bg-light)', padding: '14px 18px' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 900, fontSize: 16 }}>✓</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{item}</span>
            </motion.div>
          ))}
        </div>
        <p style={{ color: '#666', fontSize: 15 }}>Mobile-ready. Delivered in days.</p>
      </div>
    </motion.section>
  )
}
