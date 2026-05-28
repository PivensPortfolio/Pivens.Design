import { useState } from 'react'
import emailjs from '@emailjs/browser'

const TERMS = [
  {
    title: 'Project Scope',
    body: 'This agreement covers the design and development of one (1) single-page website as described by the client during intake. Any work beyond the agreed scope — including additional pages, features, or integrations not listed in the original project description — is outside this agreement and will be quoted and billed separately.',
  },
  {
    title: 'Project Price',
    body: 'The base price for a single-page website is $2,000 (USD), paid flat. Add-on features (booking integration, email list, blog, gallery, etc.) are $500 each and must be agreed upon in writing before work begins. All prices are in U.S. dollars.',
  },
  {
    title: 'Deposit & Payment Schedule',
    body: 'A non-refundable deposit of 50% ($1,000) is due before any design or development work begins. The remaining 50% balance is due in full before the website goes live. Work will not commence without a paid deposit, and the site will not be launched until the full balance is received.',
  },
  {
    title: 'No Refund on Deposit',
    body: 'The deposit is strictly non-refundable under any circumstances, including but not limited to: client change of mind, business closure, failure to provide content, or project cancellation initiated by the client. If the client terminates the project after work has begun, the designer retains the deposit and is owed payment for all work completed up to the termination date at a rate of $50/hour.',
  },
  {
    title: 'Revisions',
    body: 'This agreement includes two (2) rounds of revisions. A revision round is defined as a single consolidated set of feedback submitted at one time. Each additional revision round beyond the two included will be billed at $50 per hour, invoiced after completion. Revision requests must be submitted in writing (text or email). Verbal requests are not binding.',
  },
  {
    title: 'Post-Launch Edits',
    body: 'Any changes requested after the site has launched — including text updates, image swaps, layout changes, or feature additions — are billed at $50 per hour. A minimum one-hour charge applies to all post-launch work. The designer is under no obligation to accept post-launch work requests but will make reasonable efforts to accommodate them.',
  },
  {
    title: 'Client Content Responsibilities',
    body: 'The client is responsible for providing all content required for the website: copy (text), images, logos, brand guidelines, and any other materials. Content must be provided in digital format. The designer is not responsible for sourcing, writing, or photographing content unless separately agreed and priced. Project timelines are contingent on timely content delivery from the client.',
  },
  {
    title: 'Timeline & Client Delays',
    body: 'The designer will provide an estimated delivery timeline after the deposit is received. This timeline assumes timely feedback and content delivery from the client. Delays caused by the client — including late content submission, slow feedback, or extended periods of non-response (more than 5 business days) — will extend the project timeline accordingly. Client-caused delays do not entitle the client to a refund or price reduction.',
  },
  {
    title: 'Scope Changes',
    body: 'Any change to the agreed project scope — including new sections, new features, redesigned layouts, or changes in direction after work has begun — constitutes a scope change and requires a written amendment to this agreement. Scope changes may result in additional charges and timeline adjustments. The designer reserves the right to decline scope changes that are unreasonable or significantly alter the original brief.',
  },
  {
    title: 'Intellectual Property & Ownership',
    body: 'Upon receipt of full payment, the client receives full ownership of the final website design, code, and all deliverables. Prior to full payment, all work remains the intellectual property of the designer. The designer retains the right to display the completed work in their portfolio, on social media, and in marketing materials, unless the client requests otherwise in writing.',
  },
  {
    title: 'Third-Party Services & Accounts',
    body: 'The website may rely on third-party services (hosting, email platforms, booking tools, analytics, etc.). The client is responsible for creating, maintaining, and paying for any required third-party accounts. The designer is not responsible for outages, pricing changes, policy changes, or discontinuation of any third-party service. Costs associated with third-party services are not included in the project price.',
  },
  {
    title: '30-Day Bug Fix Warranty',
    body: 'The designer provides a 30-day warranty period following the site launch date during which any bugs or technical issues that are the direct result of the designer\'s work will be corrected at no charge. This warranty does not cover issues caused by client modifications, third-party service changes, hosting provider issues, or content errors. After 30 days, all fixes and updates are billed at the standard $50/hour rate.',
  },
  {
    title: 'Hosting & Ongoing Maintenance',
    body: 'This agreement does not include ongoing hosting, domain registration, or maintenance unless explicitly stated. Once the site is delivered, it is the client\'s responsibility to maintain their hosting account and keep any third-party integrations active. The designer is not liable for a site going offline due to expired hosting, domain lapse, or third-party account issues.',
  },
  {
    title: 'Limitation of Liability',
    body: 'The designer\'s total liability under this agreement shall not exceed the total amount paid by the client for the project. The designer is not liable for any indirect, incidental, special, or consequential damages, including but not limited to: lost revenue, lost business, data loss, or reputational damage, arising from the use or inability to use the delivered website.',
  },
  {
    title: 'Communication',
    body: 'Primary communication for this project will be conducted via text message (SMS). The client consents to receiving text messages related to this project. Standard message and data rates may apply. The client may reply STOP at any time to opt out of SMS communication, understanding that this may affect the designer\'s ability to deliver the project on time.',
  },
  {
    title: 'Governing Law',
    body: 'This agreement shall be governed by and construed in accordance with the laws of the State of Indiana, United States. Any disputes arising under this agreement shall be resolved in the courts of Indiana.',
  },
  {
    title: 'Entire Agreement',
    body: 'This document constitutes the entire agreement between the parties regarding the project described herein. It supersedes all prior discussions, quotes, and communications. Any modifications to this agreement must be made in writing and agreed upon by both parties.',
  },
]

const inputStyle = {
  width: '100%',
  background: '#f5f5f5',
  border: '1px solid #ddd',
  color: '#111',
  padding: '14px 16px',
  fontSize: 15,
  fontFamily: 'inherit',
  marginBottom: 12,
  outline: 'none',
  boxSizing: 'border-box',
}

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function ContractPage() {
  const [form, setForm] = useState({
    client_name: '',
    business_name: '',
    email: '',
    mobile: '',
    project_description: '',
    signature: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!agreed) return
    if (!form.signature.trim()) return
    setStatus('sending')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTRACT_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...form,
          agreed_date: today,
          agreed: 'Yes — digital signature provided',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111', background: '#fff', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: '#1a1a1a', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 18, letterSpacing: 1, color: '#fff' }}>
          PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
        </a>
        <span style={{ color: '#666', fontSize: 13 }}>Web Design Agreement</span>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Title block */}
        <div style={{ borderBottom: '3px solid #f97316', paddingBottom: 32, marginBottom: 40 }}>
          <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            Web Design Services Agreement
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 16 }}>
            Project Agreement<br />& Terms of Service
          </h1>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6 }}>
            Please read all terms carefully before signing. This agreement is legally binding once signed and the deposit is received.
          </p>
          <p style={{ color: '#999', fontSize: 13, marginTop: 12 }}>Date: {today}</p>
        </div>

        {/* Client info form */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid #eee' }}>
            1. Client Information
          </h2>
          <input
            name="client_name"
            placeholder="Full legal name *"
            required
            value={form.client_name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="business_name"
            placeholder="Business name *"
            required
            value={form.business_name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email address *"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="mobile"
            type="tel"
            placeholder="Mobile number *"
            required
            value={form.mobile}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="project_description"
            placeholder="Describe the website you need — sections, features, add-ons, anything agreed upon *"
            rows={4}
            required
            value={form.project_description}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Terms */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid #eee' }}>
            2. Terms & Conditions
          </h2>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: 2,
            padding: '32px',
            maxHeight: 480,
            overflowY: 'scroll',
            background: '#fafafa',
            fontSize: 14,
            lineHeight: 1.75,
          }}>
            {TERMS.map((term, i) => (
              <div key={term.title} style={{ marginBottom: 28 }}>
                <p style={{ fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, color: '#f97316', marginBottom: 6 }}>
                  {i + 1}. {term.title}
                </p>
                <p style={{ color: '#333', margin: 0 }}>{term.body}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>Scroll to read all terms before signing.</p>
        </div>

        {/* Signature */}
        {status === 'sent' ? (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: 32, textAlign: 'center' }}>
            <p style={{ color: '#16a34a', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Agreement Received</p>
            <p style={{ color: '#555', fontSize: 15 }}>
              A copy has been sent. Expect a text from me within 24 hours to confirm the deposit and get started.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 24, paddingBottom: 8, borderBottom: '1px solid #eee' }}>
              3. Signature & Agreement
            </h2>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 28, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ marginTop: 3, accentColor: '#f97316', width: 18, height: 18, flexShrink: 0 }}
              />
              <span style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>
                I have read and agree to all of the terms and conditions above. I understand that my deposit is non-refundable, that revisions beyond the first two rounds are billed at $50/hour, and that this constitutes a legally binding agreement.
              </span>
            </label>

            <div style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 13, color: '#555', marginBottom: 8 }}>
                Type your full legal name below as your digital signature:
              </p>
              <input
                name="signature"
                placeholder="Full legal name"
                required
                value={form.signature}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  fontStyle: 'italic',
                  fontSize: 18,
                  fontFamily: 'Georgia, serif',
                  borderColor: form.signature ? '#f97316' : '#ddd',
                  borderWidth: 2,
                  background: '#fff',
                  marginBottom: 4,
                }}
              />
              <p style={{ color: '#999', fontSize: 12 }}>Signed on: {today}</p>
            </div>

            {status === 'error' && (
              <p style={{ color: '#dc2626', fontSize: 14, marginBottom: 12 }}>
                Something went wrong submitting. Text (555) 555-5555 directly.
              </p>
            )}

            <button
              type="submit"
              disabled={!agreed || !form.signature.trim() || status === 'sending'}
              style={{
                background: agreed && form.signature.trim() ? '#f97316' : '#ccc',
                color: '#fff',
                border: 'none',
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: 'uppercase',
                padding: '16px 40px',
                cursor: agreed && form.signature.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
                marginTop: 8,
              }}
            >
              {status === 'sending' ? 'Submitting...' : 'Sign & Submit Agreement →'}
            </button>
            <p style={{ color: '#999', fontSize: 12, marginTop: 12 }}>
              By clicking "Sign & Submit" you confirm this is your legal signature and you agree to the terms above.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
