import { useState, useEffect, useCallback } from 'react'
import { formatPhone, emailStatus } from './utils/format'

const API = import.meta.env.VITE_INVOICE_API_URL || 'http://localhost:3001'

const inputStyle = {
  width: '100%',
  background: '#f9f9f9',
  border: '1px solid #ddd',
  color: '#111',
  padding: '12px 14px',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
}

const STATUS_COLORS = {
  draft:  { bg: '#f5f5f5',  color: '#888',    label: 'Draft'  },
  sent:   { bg: '#fff7ed',  color: '#ea580c', label: 'Sent'   },
  paid:   { bg: '#f0fdf4',  color: '#16a34a', label: 'Paid'   },
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.draft
  return (
    <span style={{
      background: s.bg, color: s.color, fontWeight: 700, fontSize: 11,
      letterSpacing: 1, textTransform: 'uppercase', padding: '3px 10px',
      borderRadius: 2,
    }}>
      {s.label}
    </span>
  )
}

const emptyItem = () => ({ description: '', quantity: 1, unit_price: '', total: 0 })
const emptyForm = () => ({
  client_name: '', business_name: '', email: '', mobile: '',
  line_items: [{ description: 'Website Design & Development', quantity: 1, unit_price: 2000, total: 2000 }],
  notes: '',
  due_date: '',
})

export default function InvoicePage() {
  const [token, setToken]       = useState(() => sessionStorage.getItem('inv_token') || '')
  const [tokenInput, setTokenInput] = useState('')
  const [authed, setAuthed]     = useState(false)
  const [authErr, setAuthErr]   = useState(false)
  const [invoices, setInvoices] = useState([])
  const [form, setForm]         = useState(emptyForm())
  const [creating, setCreating] = useState(false)
  const [createErr, setCreateErr] = useState('')
  const [actionLoading, setActionLoading] = useState(null) // invoiceId + action

  // ── Auth ──────────────────────────────────────────────────────────────────
  async function handleLogin(e) {
    e.preventDefault()
    const t = tokenInput.trim()
    try {
      const res = await fetch(`${API}/invoices`, {
        headers: { Authorization: `Bearer ${t}` },
      })
      if (!res.ok) throw new Error()
      sessionStorage.setItem('inv_token', t)
      setToken(t)
      setAuthed(true)
      setAuthErr(false)
    } catch {
      setAuthErr(true)
    }
  }

  // ── Load invoices ─────────────────────────────────────────────────────────
  const loadInvoices = useCallback(async () => {
    if (!token) return
    const res = await fetch(`${API}/invoices`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      const data = await res.json()
      setInvoices(data)
      setAuthed(true)
    }
  }, [token])

  useEffect(() => { loadInvoices() }, [loadInvoices])

  // ── Line items ────────────────────────────────────────────────────────────
  function setItem(idx, field, value) {
    setForm(f => {
      const items = f.line_items.map((it, i) => {
        if (i !== idx) return it
        const updated = { ...it, [field]: value }
        if (field === 'quantity' || field === 'unit_price') {
          const q = field === 'quantity' ? Number(value) : Number(it.quantity)
          const p = field === 'unit_price' ? Number(value) : Number(it.unit_price)
          updated.total = isNaN(q * p) ? 0 : q * p
        }
        return updated
      })
      return { ...f, line_items: items }
    })
  }

  function addItem() {
    setForm(f => ({ ...f, line_items: [...f.line_items, emptyItem()] }))
  }

  function removeItem(idx) {
    setForm(f => ({ ...f, line_items: f.line_items.filter((_, i) => i !== idx) }))
  }

  const grandTotal = form.line_items.reduce((sum, it) => sum + Number(it.total || 0), 0)

  // ── Create invoice ────────────────────────────────────────────────────────
  async function handleCreate(e) {
    e.preventDefault()
    setCreating(true)
    setCreateErr('')
    try {
      const res = await fetch(`${API}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          line_items: form.line_items.map(it => ({
            ...it,
            quantity:   Number(it.quantity),
            unit_price: Number(it.unit_price),
            total:      Number(it.total),
          })),
          due_date: form.due_date || null,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create invoice')
      }
      setForm(emptyForm())
      await loadInvoices()
    } catch (err) {
      setCreateErr(err.message)
    } finally {
      setCreating(false)
    }
  }

  // ── Invoice actions ───────────────────────────────────────────────────────
  async function markPaid(id) {
    setActionLoading(id + '_paid')
    try {
      const res = await fetch(`${API}/invoices/${id}/paid`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      await loadInvoices()
    } catch {
      alert('Failed to mark as paid.')
    } finally {
      setActionLoading(null)
    }
  }

  async function deleteInvoice(id, invoiceNumber) {
    if (!window.confirm(`Delete invoice ${invoiceNumber}? This cannot be undone.`)) return
    setActionLoading(id + '_delete')
    try {
      await fetch(`${API}/invoices/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      await loadInvoices()
    } catch {
      alert('Failed to delete invoice.')
    } finally {
      setActionLoading(null)
    }
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', background: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#111', padding: '20px 32px', borderBottom: '1px solid #333' }}>
          <a href="/" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 18, letterSpacing: 1, color: '#fff' }}>
            PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
          </a>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <form onSubmit={handleLogin} style={{ background: '#222', border: '1px solid #333', padding: 48, width: '100%', maxWidth: 400 }}>
            <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              Invoice Admin
            </p>
            <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, marginBottom: 32 }}>Enter Access Token</h1>
            <input
              type="password"
              placeholder="Admin token"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              autoFocus
              style={{
                ...inputStyle,
                background: '#2a2a2a',
                border: `1px solid ${authErr ? '#f87171' : '#444'}`,
                color: '#fff',
                marginBottom: 4,
              }}
            />
            {authErr && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 12 }}>Invalid token. Try again.</p>}
            <button
              type="submit"
              style={{
                marginTop: 16, width: '100%', background: '#f97316', color: '#fff',
                border: 'none', fontWeight: 900, fontSize: 14, letterSpacing: 1,
                textTransform: 'uppercase', padding: '14px 0', cursor: 'pointer',
              }}
            >
              Unlock →
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Main admin UI ─────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f5f5f5', minHeight: '100vh', color: '#111' }}>

      {/* Header */}
      <div style={{ background: '#1a1a1a', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 18, letterSpacing: 1, color: '#fff' }}>
          PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
        </a>
        <span style={{ color: '#f97316', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
          Invoices
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── Create Invoice ── */}
        <div style={{ background: '#fff', border: '1px solid #e5e5e5', padding: 40, marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 28, paddingBottom: 16, borderBottom: '2px solid #f97316' }}>
            New Invoice
          </h2>

          <form onSubmit={handleCreate}>
            {/* Client info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <input
                placeholder="Client name *"
                required
                value={form.client_name}
                onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))}
                style={inputStyle}
              />
              <input
                placeholder="Business name"
                value={form.business_name}
                onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email address *"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{
                  ...inputStyle,
                  outline: emailStatus(form.email) === 'valid' ? '2px solid #22c55e'
                    : emailStatus(form.email) === 'invalid' ? '2px solid #f87171' : 'none',
                }}
              />
              <input
                type="tel"
                placeholder="(555) 555-5555"
                value={form.mobile}
                onChange={e => setForm(f => ({ ...f, mobile: formatPhone(e.target.value) }))}
                style={inputStyle}
              />
            </div>

            {/* Due date */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Due Date (optional)
              </label>
              <input
                type="date"
                value={form.due_date}
                onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))}
                style={{ ...inputStyle, maxWidth: 200 }}
              />
            </div>

            {/* Line items */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 80px 120px 100px 40px',
                gap: 8,
                marginBottom: 8,
              }}>
                {['Description', 'Qty', 'Unit Price', 'Total', ''].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {form.line_items.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 120px 100px 40px', gap: 8, marginBottom: 8 }}>
                  <input
                    placeholder="Description"
                    value={item.description}
                    onChange={e => setItem(idx, 'description', e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => setItem(idx, 'quantity', e.target.value)}
                    style={{ ...inputStyle, textAlign: 'center' }}
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={item.unit_price}
                    onChange={e => setItem(idx, 'unit_price', e.target.value)}
                    style={{ ...inputStyle, textAlign: 'right' }}
                  />
                  <div style={{
                    ...inputStyle,
                    textAlign: 'right',
                    fontWeight: 700,
                    background: '#f9f9f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                    ${Number(item.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    disabled={form.line_items.length === 1}
                    style={{
                      background: 'none', border: '1px solid #ddd', color: '#999',
                      cursor: form.line_items.length === 1 ? 'not-allowed' : 'pointer',
                      fontSize: 18, fontWeight: 300, lineHeight: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addItem}
                style={{
                  marginTop: 4, background: 'none', border: '1px dashed #ddd',
                  color: '#888', fontSize: 13, padding: '10px 16px', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                + Add line item
              </button>

              {/* Total */}
              <div style={{
                marginTop: 16,
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: 12,
                borderTop: '2px solid #111',
              }}>
                <span style={{ fontSize: 22, fontWeight: 900 }}>
                  Total: ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Notes */}
            <textarea
              placeholder="Notes (payment instructions, thank-you message, etc.)"
              rows={3}
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical', marginBottom: 24 }}
            />

            {createErr && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{createErr}</p>}

            <button
              type="submit"
              disabled={creating}
              style={{
                background: '#f97316', color: '#fff', border: 'none',
                fontWeight: 900, fontSize: 14, letterSpacing: 1,
                textTransform: 'uppercase', padding: '14px 36px',
                cursor: creating ? 'wait' : 'pointer',
              }}
            >
              {creating ? 'Creating...' : 'Create Invoice →'}
            </button>
          </form>
        </div>

        {/* ── Invoice list ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1 }}>
              All Invoices
            </h2>
            <span style={{ color: '#888', fontSize: 13 }}>{invoices.length} invoice{invoices.length !== 1 ? 's' : ''}</span>
          </div>

          {invoices.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #e5e5e5', padding: 48, textAlign: 'center', color: '#888' }}>
              No invoices yet. Create your first one above.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {invoices.map(inv => (
                <div key={inv.id} style={{
                  background: '#fff',
                  border: '1px solid #e5e5e5',
                  padding: '20px 24px',
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr 1fr 100px 1fr auto',
                  alignItems: 'center',
                  gap: 16,
                }}>
                  {/* Invoice number */}
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: '#f97316' }}>{inv.invoice_number}</div>
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
                      {new Date(inv.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Client */}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{inv.client_name}</div>
                    {inv.business_name && <div style={{ fontSize: 12, color: '#888' }}>{inv.business_name}</div>}
                    <div style={{ fontSize: 12, color: '#aaa' }}>{inv.email}</div>
                  </div>

                  {/* Due date */}
                  <div>
                    {inv.due_date ? (
                      <>
                        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>Due</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {new Date(inv.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </>
                    ) : (
                      <span style={{ fontSize: 12, color: '#ccc' }}>No due date</span>
                    )}
                  </div>

                  {/* Total */}
                  <div style={{ fontWeight: 900, fontSize: 16, textAlign: 'right' }}>
                    ${Number(inv.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>

                  {/* Status */}
                  <div>
                    <StatusBadge status={inv.status} />
                    {inv.paid_at && (
                      <div style={{ fontSize: 11, color: '#16a34a', marginTop: 4 }}>
                        Paid {new Date(inv.paid_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <a
                      href={`/invoice/${inv.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#f5f5f5', color: '#333', border: '1px solid #ddd',
                        fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                        padding: '7px 14px', textDecoration: 'none', whiteSpace: 'nowrap',
                      }}
                    >
                      View
                    </a>
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => markPaid(inv.id)}
                        disabled={actionLoading === inv.id + '_paid'}
                        style={{
                          background: '#16a34a', color: '#fff', border: 'none',
                          fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                          padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                      >
                        {actionLoading === inv.id + '_paid' ? '...' : 'Mark Paid'}
                      </button>
                    )}
                    <button
                      onClick={() => deleteInvoice(inv.id, inv.invoice_number)}
                      disabled={actionLoading === inv.id + '_delete'}
                      style={{
                        background: 'none', color: '#dc2626', border: '1px solid #fca5a5',
                        fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                        padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      {actionLoading === inv.id + '_delete' ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
