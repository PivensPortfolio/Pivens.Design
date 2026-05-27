const projects = [
  {
    name: 'FreightPath Academy',
    description: 'CDL training platform — student app, admin console, and marketing site.',
    url: 'https://freightpathacademy.com',
  },
  // Add more projects here as available
]

export default function Portfolio() {
  const items = projects.length === 1
    ? [...projects, { name: 'More Coming Soon', description: '', url: null }]
    : projects

  return (
    <section id="work" style={{ background: 'var(--color-bg-dark)', padding: '80px 24px' }}>
      <div className="container">
        <p className="section-label">Recent Work</p>
        <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: 40 }}>
          Built to Perform.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {items.map(project => (
            <div key={project.name} style={{ background: 'var(--color-bg-card)', padding: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-black)', color: '#fff', fontSize: 18, fontWeight: 900, marginBottom: 10 }}>
                {project.name}
              </h3>
              {project.description && (
                <p style={{ color: 'var(--color-text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                  {project.description}
                </p>
              )}
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                  color: 'var(--color-accent)', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase'
                }}>
                  View Live Site →
                </a>
              ) : (
                <span style={{ color: '#444', fontSize: 12, fontStyle: 'italic' }}>Coming soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
