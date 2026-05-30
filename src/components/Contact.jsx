import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'
import { getCookie } from '../utils/cookies'
import { formatPhone, emailStatus } from '../utils/format'

const NTFY_TOPIC = import.meta.env.VITE_NTFY_TOPIC

const inputStyle = {
  width: '100%', background: 'var(--color-bg-card)', border: 'none',
  color: '#fff', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)',
  marginBottom: 12, outline: 'none',
}

const readinessOptions = [
  { value: 'ready', label: "Ready to start", sub: "Let's go" },
  { value: 'soon', label: "Deciding soon", sub: "Within a month" },
  { value: 'exploring', label: "Just exploring", sub: "No rush" },
]

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [readiness, setReadiness] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const variant = getCookie('pv_hero') ?? 'unknown'
    const data = Object.fromEntries(new FormData(formRef.current))

    const readinessLabel = {
      ready: 'Ready to start',
      soon: 'Deciding soon',
      exploring: 'Just exploring',
    }[data.readiness] ?? data.readiness

    const body = [
      `📱 ${data.mobile || '—'}`,
      `🏢 ${data.business_name || '—'}`,
      `✉️  ${data.reply_to || '—'}`,
      `🌐 ${data.existing_url || '—'}`,
      `⏱️  ${readinessLabel || '—'}`,
      `🧭 Hero variant: ${variant}`,
      '',
      data.message,
    ].join('\n')

    try {
      const res = await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          'Title': `New Lead: ${data.from_name}`,
          'Priority': 'high',
          'Tags': 'raising_hand,pivens',
          'Content-Type': 'text/plain',
        },
        body,
      })
      if (!res.ok) throw new Error(`ntfy ${res.status}`)

      if (typeof window.plausible === 'function') {
        window.plausible('Lead', { props: { variant } })
      }
      setStatus('sent')
      setMobile('')
      setEmail('')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section
      id="contact"
      style={{ background: 'var(--color-bg-dark)', padding: '40px 24px', borderTop: '3px solid var(--color-accent)' }}
      whileInView="visible"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
    >
      <div className="container" style={{ maxWidth: 640 }}>
        <p className="section-label">Get Started</p>
        <motion.h2
          variants={fadeInUp}
          style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: 12 }}
        >
          Tell Me About<br />Your Business.
        </motion.h2>
        <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', fontSize: 15, marginBottom: 40 }}>
          I'll text you within 24 hours.
        </motion.p>

        {status === 'sent' ? (
          <p style={{ color: 'var(--color-accent)', fontSize: 18, fontWeight: 700 }}>
            Got it — expect a text from me within 24 hours.
          </p>
        ) : (
          <motion.form ref={formRef} onSubmit={handleSubmit} variants={fadeInUp}>
            <input name="from_name" placeholder="Your name" required style={inputStyle} />
            <input name="business_name" placeholder="Business name" required style={inputStyle} />
            <input
              name="mobile"
              type="tel"
              placeholder="(555) 555-5555"
              required
              value={mobile}
              onChange={e => setMobile(formatPhone(e.target.value))}
              style={inputStyle}
            />
            <input
              name="reply_to"
              type="email"
              placeholder="Email address (optional)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                ...inputStyle,
                outline: emailStatus(email) === 'valid' ? '2px solid #22c55e'
                  : emailStatus(email) === 'invalid' ? '2px solid #f87171'
                  : 'none',
              }}
            />
            <input
              name="existing_url"
              placeholder="Existing website URL (optional)"
              style={inputStyle}
            />

            {/* Readiness selector */}
            <p style={{ color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10, marginTop: 4 }}>
              How ready are you to get started?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
              {readinessOptions.map(opt => {
                const selected = readiness === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setReadiness(opt.value)}
                    style={{
                      background: selected ? 'var(--color-accent)' : 'var(--color-bg-card)',
                      border: selected ? '2px solid var(--color-accent)' : '2px solid transparent',
                      color: selected ? '#fff' : 'var(--color-text-muted)',
                      padding: '12px 8px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{opt.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{opt.sub}</div>
                  </button>
                )
              })}
            </div>
            {/* Hidden field so EmailJS picks up the value */}
            <input type="hidden" name="readiness" value={readiness} />

            <textarea
              name="message"
              placeholder="Tell me a bit about your business and what you need"
              rows={5}
              required
              style={{ ...inputStyle, resize: 'vertical', marginBottom: 16 }}
            />
            <p style={{ color: 'var(--color-text-muted)', fontSize: 12, lineHeight: 1.6, marginBottom: 20 }}>
              By submitting this form you agree to be contacted by text message. Message and data rates may apply. Reply STOP at any time to opt out.
            </p>
            {status === 'error' && (
              <p style={{ color: '#f87171', fontSize: 14, marginBottom: 12 }}>
                Something went wrong. Please try again or reach out directly.
              </p>
            )}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{ opacity: status === 'sending' ? 0.6 : 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </motion.button>
          </motion.form>
        )}
      </div>
    </motion.section>
  )
}
