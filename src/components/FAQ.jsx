import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'

const faqs = [
  {
    q: 'How long does it take?',
    a: 'Typically within 3-5 business days from our first conversation. Simple sites can be faster.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Your business name, what you do, contact details, and any photos or logo you have. If you have an existing site, even better.',
  },
  {
    q: 'Do you do revisions?',
    a: 'Yes. Two rounds of revisions are included. Most clients are happy after the first draft.',
  },
  {
    q: 'What if I need more than one page?',
    a: 'Multi-page sites are available. Reach out and we\'ll put together a custom quote.',
  },
  {
    q: 'How do I pay?',
    a: '50% upfront, 50% on delivery. Accepted via bank transfer, Zelle, or credit card.',
  },
  {
    q: "What's included in the add-ons?",
    a: 'Booking: an online appointment scheduler. Email: a signup form connected to your email list. Surveys: a feedback or lead capture form.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        {q}
        <span style={{ color: 'var(--color-accent)', fontSize: 20, lineHeight: 1, marginLeft: 16 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p style={{ paddingBottom: 20, fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <motion.section
      style={{ background: 'var(--color-bg-light)', padding: '80px 24px', borderTop: '1px solid #ddd' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="section-label">FAQ</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 40 }}
        >
          Common Questions.
        </motion.h2>
        {faqs.map(item => (
          <motion.div key={item.q} variants={fadeInUp}>
            <FAQItem {...item} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
