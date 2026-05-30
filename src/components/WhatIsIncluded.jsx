import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

const included = ['Home section', 'About section', 'Services section', 'Reviews section', 'FAQ section', 'Contact form']

const basicAddOns = [
  'Email list signup',
  'Customer feedback form',
  'Live chat widget',
  'Menu or price list',
  'Team / staff directory',
  'Job listings / careers section',
  'Social media feed (Instagram)',
  'Google Reviews embed',
  'Pop-up lead capture',
  'Google Maps + directions',
]

const advancedAddOns = [
  'Online booking / appointment scheduling',
  'Blog (up to 3 starter posts)',
  'Photo gallery',
  'Event calendar',
  'Before & after gallery',
  'Client intake / onboarding form',
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
          <h3 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 40 }}>
            Need More? Add It On.
          </h3>

          {/* Basic Add-ons */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: 'var(--font-black)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Basic Add-Ons</p>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-black)', fontSize: 22, fontWeight: 900, margin: 0 }}>+$249 each</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {basicAddOns.map(item => (
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
          </div>

          {/* Advanced Add-ons */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: 'var(--font-black)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Advanced Add-Ons</p>
              <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-black)', fontSize: 22, fontWeight: 900, margin: 0 }}>+$499 each</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {advancedAddOns.map(item => (
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
          </div>

          <p style={{ color: '#999', fontSize: 13, marginTop: 20 }}>
            Don't see what you need? Ask — if it can be built into a single page, we can price it.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
