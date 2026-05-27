export default function HeroC() {
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '100px 24px' }}>
      <div className="container">
        <p className="section-label">30 Years. One Price.</p>
        <h1 style={{
          fontFamily: 'var(--font-black)',
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1.05,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Professional<br />Websites<br />
          <span style={{ color: 'var(--color-accent)' }}>Done Fast.</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 15, marginBottom: 40 }}>
          From $2,000. No fluff. No months of back-and-forth.
        </p>
        <a href="#pricing" className="btn-primary">See Pricing →</a>
      </div>
    </section>
  )
}
