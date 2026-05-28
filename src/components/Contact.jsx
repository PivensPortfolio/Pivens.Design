import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../utils/animations'
import { getCookie } from '../utils/cookies'

const inputStyle = {
  width: '100%', background: 'var(--color-bg-card)', border: 'none',
  color: '#fff', padding: '14px 16px', fontSize: 15, fontFamily: 'var(--font-body)',
  marginBottom: 12, outline: 'none',
}

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const variant = getCookie('pv_hero') ?? 'unknown'

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      if (typeof window.plausible === 'function') {
        window.plausible('Lead', { props: { variant } })
      }
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section
      id="contact"
      style={{ background: 'var(--color-bg-dark)', padding: '80px 24px', borderTop: '3px solid var(--color-accent)' }}
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
            <input name="mobile" type="tel" placeholder="Mobile number" required style={inputStyle} />
            <input name="reply_to" type="email" placeholder="Email address (optional)" style={inputStyle} />
            <input
              name="existing_url"
              placeholder="Existing website URL (optional)"
              style={inputStyle}
            />
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
                Something went wrong. Text (555) 555-5555 directly.
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
