export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-darkest)', padding: '24px', textAlign: 'center' }}>
      <span style={{ color: '#444', fontSize: 12, letterSpacing: 1 }}>
        © {new Date().getFullYear()} PIVENS<span style={{ color: 'var(--color-accent)' }}>.DESIGN</span>
      </span>
    </footer>
  )
}
