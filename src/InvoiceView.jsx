import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_INVOICE_API_URL || 'http://localhost:3001'

export default function InvoiceView() {
  const id = window.location.pathname.split('/').pop()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetch(`${API}/invoices/${id}`)
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(data => {
        setInvoice(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888', fontSize: 15 }}>Loading invoice...</p>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 900, fontSize: 22, color: '#111', marginBottom: 12 }}>Invoice Not Found</p>
          <p style={{ color: '#888', fontSize: 15 }}>This invoice doesn't exist or the link is incorrect.</p>
        </div>
      </div>
    )
  }

  const inv = invoice
  const dueDisplay = inv.due_date
    ? new Date(inv.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Upon receipt'

  const issuedDisplay = new Date(inv.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const isPaid = inv.status === 'paid'

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .invoice-card { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f0f0f0', minHeight: '100vh', padding: '40px 24px 80px' }}>

        {/* Print / top bar */}
        <div className="no-print" style={{ maxWidth: 760, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="https://pivens.design" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 16, letterSpacing: 1, color: '#1a1a1a' }}>
            PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
          </a>
          <button
            onClick={() => window.print()}
            style={{
              background: '#1a1a1a', color: '#fff', border: 'none',
              fontWeight: 700, fontSize: 12, letterSpacing: 1,
              textTransform: 'uppercase', padding: '10px 20px', cursor: 'pointer',
            }}
          >
            Print / Save PDF
          </button>
        </div>

        {/* Invoice card */}
        <div className="invoice-card" style={{
          maxWidth: 760,
          margin: '0 auto',
          background: '#fff',
          boxShadow: '0 4px 40px rgba(0,0,0,0.10)',
        }}>

          {/* Header stripe */}
          <div style={{ background: '#1a1a1a', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: 1 }}>
              PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
            </span>
            {isPaid && (
              <span style={{
                background: '#16a34a', color: '#fff',
                fontWeight: 900, fontSize: 13, letterSpacing: 2,
                textTransform: 'uppercase', padding: '6px 18px',
                border: '2px solid #fff',
              }}>
                PAID
              </span>
            )}
          </div>

          <div style={{ padding: '40px 40px 48px' }}>

            {/* Invoice meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
                  Invoice
                </p>
                <h1 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 6px', color: '#111' }}>{inv.invoice_number}</h1>
                <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Issued: {issuedDisplay}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Amount Due</p>
                <p style={{ fontSize: 36, fontWeight: 900, margin: '0 0 6px', color: isPaid ? '#16a34a' : '#111' }}>
                  ${Number(inv.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Due: {dueDisplay}</p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 3, background: '#f97316', marginBottom: 32 }} />

            {/* From / To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>From</p>
                <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>Charles Pivens</p>
                <p style={{ color: '#888', fontSize: 14 }}>Pivens.Design</p>
                <p style={{ color: '#888', fontSize: 14 }}>invoices@pivens.design</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>To</p>
                <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{inv.client_name}</p>
                {inv.business_name && <p style={{ color: '#555', fontSize: 14, marginBottom: 2 }}>{inv.business_name}</p>}
                <p style={{ color: '#888', fontSize: 14 }}>{inv.email}</p>
                {inv.mobile && <p style={{ color: '#888', fontSize: 14 }}>{inv.mobile}</p>}
              </div>
            </div>

            {/* Line items table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 0 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #111' }}>
                  {['Description', 'Qty', 'Unit Price', 'Total'].map(h => (
                    <th key={h} style={{
                      padding: '10px 0',
                      fontSize: 11, fontWeight: 700, letterSpacing: 1,
                      textTransform: 'uppercase', color: '#888',
                      textAlign: h === 'Description' ? 'left' : 'right',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inv.line_items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '14px 0', fontSize: 14, color: '#111' }}>{item.description}</td>
                    <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'right', color: '#555' }}>{item.quantity}</td>
                    <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'right', color: '#555' }}>
                      ${Number(item.unit_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'right', fontWeight: 700, color: '#111' }}>
                      ${Number(item.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total row */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
              borderTop: '2px solid #111', paddingTop: 16, marginTop: 0, marginBottom: 32,
              gap: 32,
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>Total</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: isPaid ? '#16a34a' : '#111' }}>
                ${Number(inv.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Notes */}
            {inv.notes && (
              <div style={{
                background: '#f9f9f9',
                border: '1px solid #eee',
                padding: '16px 20px',
                marginBottom: 0,
                borderRadius: 2,
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Notes</p>
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>{inv.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ background: '#f5f5f5', borderTop: '1px solid #eee', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#aaa' }}>pivens.design</span>
            <span style={{ fontSize: 12, color: '#aaa' }}>Questions? Text Charles directly.</span>
          </div>
        </div>
      </div>
    </>
  )
}
