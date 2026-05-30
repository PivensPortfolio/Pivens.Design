import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

export default function About() {
  return (
    <motion.section
      style={{ background: 'var(--color-bg-light)', padding: '40px 24px' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="section-label">About</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 24 }}
        >
          One Person. No Handoffs.
        </motion.h2>
        <motion.p variants={fadeInUp} style={{ fontSize: 17, lineHeight: 1.75, color: '#444', marginBottom: 16 }}>
          30+ years designing and building. I work fast because I've done this a thousand times.
          One person means one point of contact, no agency layers, and no surprises on the bill.
        </motion.p>
        <motion.p variants={fadeInUp} style={{ fontSize: 17, lineHeight: 1.75, color: '#444' }}>
          You get a professional site built the right way, without the six-week timeline or the $15,000 invoice.
        </motion.p>
      </div>
    </motion.section>
  )
}
