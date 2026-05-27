export default function Nav() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--color-bg-dark)',
      padding: '0 24px',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
      }}>
        <a href="#" style={{ fontFamily: 'var(--font-black)', fontSize: 16, fontWeight: 900, letterSpacing: 2 }}>
          <span style={{ color: '#fff' }}>PIVENS</span>
          <span style={{ color: 'var(--color-accent)' }}>.DESIGN</span>
        </a>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Pricing', 'Work', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
