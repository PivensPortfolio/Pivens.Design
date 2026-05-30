import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../../utils/animations'

export default function HeroA() {
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div className="container" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.p className="section-label" variants={fadeInUp}>Web Design Studio</motion.p>
        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-black)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Your Site.<br />Done in Days.
        </motion.h1>
        <motion.div
          variants={fadeInUp}
          style={{ height: 2, background: 'var(--color-accent)', marginBottom: 24 }}
        />
        <motion.p variants={fadeInUp} style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-black)', fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
          $499 flat. No agency BS.
        </motion.p>
        <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 40 }}>
          One-page site. Everything included.
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
