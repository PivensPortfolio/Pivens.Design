import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn, viewport } from '../utils/animations'

const projects = [
  {
    name: 'FreightPath Academy',
    description: 'CDL training platform — student app, admin console, and marketing site.',
    url: 'https://freightpathacademy.com',
  },
  {
    name: 'Kandi & Co. Cleaning',
    description: 'Professional cleaning service for Vancouver & Portland — booking-focused site with services, reviews, and FAQ.',
    url: 'https://www.kandiecleaning.com',
  },
  {
    name: "Erwin's Quality Plants",
    description: 'Family-grown plant nursery in Eugene, OR since 1981 — gallery, seasonal blooms, events, and location.',
    url: 'https://erwins-quality-plants.vercel.app',
  },
  {
    name: 'Savona Coffee House',
    description: 'Riverfront coffeehouse in Vancouver, WA — espresso, breakfast, ice cream, and outdoor seating on the Columbia.',
    url: 'https://savona-coffeehouse.vercel.app',
    proposal: true,
  },
  {
    name: 'Stardust Diner',
    description: 'Classic American diner established 1987 — full menu, gallery, and story page with retro neon aesthetic.',
    url: 'https://stardust-diner.vercel.app',
    proposal: true,
  },
]

export default function Portfolio() {
  const items = projects.length === 1
    ? [...projects, { name: 'More Coming Soon', description: '', url: null }]
    : projects

  return (
    <motion.section
      id="work"
      style={{ background: 'var(--color-bg-dark)', padding: '40px 24px' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container">
        <p className="section-label">Recent Work</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: 40 }}
        >
          Built to Perform.
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {items.map(project => (
            <motion.div
              key={project.name}
              variants={scaleIn}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
              style={{ background: 'var(--color-bg-card)', padding: 28, transition: 'box-shadow 0.2s' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontFamily: 'var(--font-black)', color: '#fff', fontSize: 18, fontWeight: 900, margin: 0 }}>
                  {project.name}
                </h3>
                {project.proposal && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
                    color: 'var(--color-accent)', border: '1px solid var(--color-accent)',
                    padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    Design Proposal
                  </span>
                )}
              </div>
              {project.description && (
                <p style={{ color: 'var(--color-text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                  {project.description}
                </p>
              )}
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                  color: 'var(--color-accent)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase'
                }}>
                  View Site →
                </a>
              ) : (
                <span style={{ color: '#444', fontSize: 12, fontStyle: 'italic' }}>Coming soon</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
