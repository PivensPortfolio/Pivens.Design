export default function HeroB() {
  return (
    <section style={{ background: 'var(--color-bg-light)', borderTop: '4px solid var(--color-accent)', padding: '100px 24px' }}>
      <div className="container">
        <p className="section-label" style={{ color: 'var(--color-text-primary)' }}>Web Design Studio</p>
        <h1 style={{
          fontFamily: 'var(--font-black)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          lineHeight: 1.05,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Your Competitors<br />Have a Website.<br />
          <span style={{ color: 'var(--color-accent)' }}>You Don't.</span>
        </h1>
        <p style={{ color: '#555', fontSize: 16, marginBottom: 40 }}>
          Fix that in days, not months. Starting at $2,000.
        </p>
        <a href="#pricing" className="btn-primary">See Pricing →</a>
      </div>
    </section>
  )
}
