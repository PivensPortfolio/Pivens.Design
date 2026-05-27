export default function HeroA() {
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '100px 24px' }}>
      <div className="container">
        <p className="section-label">Web Design Studio</p>
        <h1 style={{
          fontFamily: 'var(--font-black)',
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.05,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Your Site.<br />Done in Days.
        </h1>
        <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-black)', fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
          $2,000 flat. No agency BS.
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 40 }}>
          One-page site. Everything included.
        </p>
        <a href="#pricing" className="btn-primary">See Pricing →</a>
      </div>
    </section>
  )
}
