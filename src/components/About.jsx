export default function About() {
  return (
    <section style={{ background: 'var(--color-bg-light)', padding: '80px 24px' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="section-label">About</p>
        <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 24 }}>
          One Person. No Handoffs.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: '#444', marginBottom: 16 }}>
          30+ years designing and building. I work fast because I've done this a thousand times.
          One person means one point of contact, no agency layers, and no surprises on the bill.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: '#444' }}>
          You get a professional site built the right way, without the six-week timeline or the $15,000 invoice.
        </p>
      </div>
    </section>
  )
}
