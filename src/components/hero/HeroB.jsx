import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../../utils/animations'

export default function HeroB() {
  return (
    <section style={{ background: 'var(--color-bg-light)', borderTop: '4px solid var(--color-accent)', padding: '50px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div className="container" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.p className="section-label" variants={fadeInUp} style={{ color: 'var(--color-text-primary)' }}>Web Design Studio</motion.p>
        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-black)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Look Like the Business<br />
          <span style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>You Actually Are.</span>
        </motion.h1>
        <motion.div
          variants={fadeInUp}
          style={{ height: 2, background: 'var(--color-accent)', marginBottom: 24 }}
        />
        <motion.p variants={fadeInUp} style={{ color: '#555', fontSize: 16, marginBottom: 40 }}>
          Fix that in days, not months. Starting at $499.
        </motion.p>
        <motion.a
          href="#pricing"
          className="btn-primary"
          variants={fadeInUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          See Pricing →
        </motion.a>
      </motion.div>
    </section>
  )
}
