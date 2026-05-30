import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn, starPop, viewport } from '../utils/animations'

const reviews = [
  {
    quote: "We had nothing before. Now customers call us because they found us online. Best money we've spent.",
    name: 'Mike R.',
    business: 'Residential Contractor',
  },
  {
    quote: "Done in less than a week. Looks better than sites we've seen from agencies charging triple the price.",
    name: 'Sandra L.',
    business: 'Hair Salon Owner',
  },
  {
    quote: "Exactly what I needed. Clean, fast, and he knew what he was doing from the first conversation.",
    name: 'James T.',
    business: 'Restaurant Owner',
  },
]

export default function Reviews() {
  return (
    <motion.section
      style={{ background: '#fff', padding: '40px 24px', borderTop: '1px solid var(--color-border)' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container">
        <p className="section-label">Reviews</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 40 }}
        >
          Real Businesses. Real Results.
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {reviews.map(review => (
            <motion.div
              key={review.name}
              variants={scaleIn}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(249,115,22,0.15)' }}
              style={{
                border: '2px solid var(--color-accent)',
                padding: 28,
              }}
            >
              <motion.div variants={staggerContainer} style={{ display: 'inline-flex', gap: 2, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.span key={i} variants={starPop} style={{ color: 'var(--color-accent)', fontSize: 20 }}>★</motion.span>
                ))}
              </motion.div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#444', marginBottom: 20, fontStyle: 'italic' }}>
                "{review.quote}"
              </p>
              <p style={{ fontWeight: 700, fontSize: 13 }}>{review.name}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>{review.business}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
