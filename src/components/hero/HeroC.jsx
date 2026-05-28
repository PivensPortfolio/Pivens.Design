import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../../utils/animations'

export default function HeroC() {
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div className="container" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.p className="section-label" variants={fadeInUp}>30 Years. One Price.</motion.p>
        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-black)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          Professional<br />Websites<br />
          <span style={{ color: 'var(--color-accent)' }}>Done Fast.</span>
        </motion.h1>
        <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', fontSize: 15, marginBottom: 40 }}>
          From $2,000. No fluff. No months of back-and-forth.
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
