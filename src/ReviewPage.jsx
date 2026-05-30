import { useState, useEffect, useRef, useCallback } from 'react'

const API = import.meta.env.VITE_REVIEW_API_URL
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET

const PIN_COLORS = {
  open: '#f97316',
  resolved: '#22c55e',
}

export default function ReviewPage() {
  const token = window.location.pathname.split('/review/')[1]?.split('/')[0]
  const adminKey = new URLSearchParams(window.location.search).get('key')
  const isAdmin = adminKey === ADMIN_SECRET

  const [session, setSession] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Comment form state
  const [pendingClick, setPendingClick] = useState(null) // {x, y, xPct, yPct}
  const [authorName, setAuthorName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Active pin (clicked pin to show comment)
  const [activePin, setActivePin] = useState(null)

  const overlayRef = useRef(null)

  // Load session data
  useEffect(() => {
    if (!token) { setError('Invalid review link.'); setLoading(false); return }
    fetch(`${API}/sessions/${token}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setSession(data.session); setComments(data.comments); setLoading(false) })
      .catch(() => { setError('Review session not found.'); setLoading(false) })
  }, [token])

  // Click on overlay → open comment form
  const handleOverlayClick = useCallback((e) => {
    if (!overlayRef.current) return
    // Don't capture clicks on pins or form
    if (e.target.closest('[data-pin]') || e.target.closest('[data-form]')) return
    setActivePin(null)
    const rect = overlayRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPct = (x / rect.width) * 100
    const yPct = (y / rect.height) * 100
    setPendingClick({ x, y, xPct, yPct })
    setCommentText('')
  }, [])

  const cancelForm = () => setPendingClick(null)

  const submitComment = async () => {
    if (!commentText.trim() || !pendingClick) return
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/sessions/${token}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x_percent: pendingClick.xPct,
          y_percent: pendingClick.yPct,
          comment: commentText.trim(),
          author_name: authorName.trim() || 'Client',
        }),
      })
      const newComment = await res.json()
      setComments(c => [...c, newComment])
      setPendingClick(null)
      setAuthorName('')
      setCommentText('')
    } catch {
      alert('Failed to submit comment. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleResolve = async (id) => {
    const res = await fetch(`${API}/comments/${id}/resolve`, {
      method: 'PATCH',
      headers: { 'x-admin-key': adminKey },
    })
    const updated = await res.json()
    setComments(c => c.map(x => x.id === updated.id ? updated : x))
    if (activePin?.id === id) setActivePin(updated)
  }

  const deleteComment = async (id) => {
    if (!confirm('Delete this comment?')) return
    await fetch(`${API}/comments/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey },
    })
    setComments(c => c.filter(x => x.id !== id))
    if (activePin?.id === id) setActivePin(null)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      Loading review...
    </div>
  )

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#111', color: '#f87171', fontFamily: 'system-ui, sans-serif', fontSize: 18 }}>
      {error}
    </div>
  )

  const openComments = comments.filter(c => !c.resolved)
  const resolvedComments = comments.filter(c => c.resolved)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#0f0f0f' }}>

      {/* Left: iframe + overlay */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, background: '#1a1a1a', borderBottom: '2px solid #f97316', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: 1, color: '#fff' }}>
            PIVENS<span style={{ color: '#f97316' }}>.DESIGN</span>
          </span>
          <span style={{ color: '#666', fontSize: 12 }}>|</span>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{session.project_name}</span>
          <span style={{ color: '#888', fontSize: 12 }}>— {session.client_name}</span>
          <span style={{ marginLeft: 'auto', color: '#888', fontSize: 12 }}>
            Click anywhere on the design to leave a comment
          </span>
        </div>

        {/* iframe */}
        <iframe
          src={session.preview_url}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', marginTop: 42 }}
          title="Site Preview"
        />

        {/* Click overlay */}
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          style={{ position: 'absolute', inset: 0, marginTop: 42, cursor: 'crosshair', zIndex: 5 }}
        >
          {/* Existing comment pins */}
          {comments.map((c, i) => (
            <div
              key={c.id}
              data-pin="true"
              onClick={e => { e.stopPropagation(); setPendingClick(null); setActivePin(activePin?.id === c.id ? null : c) }}
              style={{
                position: 'absolute',
                left: `${c.x_percent}%`,
                top: `${c.y_percent}%`,
                transform: 'translate(-50%, -50%)',
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: c.resolved ? PIN_COLORS.resolved : PIN_COLORS.open,
                color: '#fff',
                fontSize: 11,
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                zIndex: 20,
                border: '2px solid #fff',
                userSelect: 'none',
              }}
              title={c.comment}
            >
              {i + 1}
            </div>
          ))}

          {/* Active pin tooltip */}
          {activePin && (
            <div
              data-form="true"
              style={{
                position: 'absolute',
                left: `${activePin.x_percent}%`,
                top: `${activePin.y_percent}%`,
                transform: 'translate(16px, -50%)',
                background: '#1a1a1a',
                border: `2px solid ${activePin.resolved ? PIN_COLORS.resolved : PIN_COLORS.open}`,
                borderRadius: 6,
                padding: 16,
                minWidth: 260,
                maxWidth: 320,
                zIndex: 30,
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#f97316', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {activePin.author_name}
                </span>
                <span style={{ color: '#555', fontSize: 11 }}>
                  {new Date(activePin.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={{ color: '#fff', fontSize: 14, lineHeight: 1.5, margin: '0 0 12px' }}>{activePin.comment}</p>
              {activePin.resolved && (
                <p style={{ color: PIN_COLORS.resolved, fontSize: 11, fontWeight: 700, margin: '0 0 8px' }}>✓ Resolved</p>
              )}
              {isAdmin && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => toggleResolve(activePin.id)}
                    style={{ flex: 1, background: activePin.resolved ? '#333' : PIN_COLORS.resolved, color: '#fff', border: 'none', padding: '6px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 3 }}
                  >
                    {activePin.resolved ? 'Unresolve' : 'Resolve'}
                  </button>
                  <button
                    onClick={() => deleteComment(activePin.id)}
                    style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 3 }}
                  >
                    Delete
                  </button>
                </div>
              )}
              <button
                onClick={() => setActivePin(null)}
                style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
              >×</button>
            </div>
          )}

          {/* New comment form */}
          {pendingClick && (
            <div
              data-form="true"
              style={{
                position: 'absolute',
                left: pendingClick.x,
                top: pendingClick.y,
                transform: 'translate(16px, -50%)',
                background: '#1a1a1a',
                border: '2px solid #f97316',
                borderRadius: 6,
                padding: 16,
                width: 280,
                zIndex: 30,
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>
                Leave a comment
              </p>
              <input
                placeholder="Your name (optional)"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '8px 10px', fontSize: 13, marginBottom: 8, boxSizing: 'border-box', outline: 'none' }}
              />
              <textarea
                placeholder="Describe your feedback..."
                rows={3}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                autoFocus
                style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '8px 10px', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  onClick={submitComment}
                  disabled={!commentText.trim() || submitting}
                  style={{ flex: 1, background: commentText.trim() ? '#f97316' : '#333', color: '#fff', border: 'none', padding: '8px 0', fontSize: 12, fontWeight: 700, cursor: commentText.trim() ? 'pointer' : 'not-allowed', borderRadius: 3 }}
                >
                  {submitting ? 'Saving...' : 'Submit →'}
                </button>
                <button
                  onClick={cancelForm}
                  style={{ background: '#222', color: '#888', border: 'none', padding: '8px 12px', fontSize: 12, cursor: 'pointer', borderRadius: 3 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Admin panel (admin only) */}
      {isAdmin && (
        <div style={{ width: 320, background: '#111', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #222', flexShrink: 0 }}>
            <p style={{ color: '#f97316', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>Admin View</p>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: '4px 0 0' }}>{session.project_name}</p>
            <p style={{ color: '#555', fontSize: 12, margin: '2px 0 0' }}>{comments.length} comment{comments.length !== 1 ? 's' : ''} · {openComments.length} open</p>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {comments.length === 0 && (
              <p style={{ color: '#555', fontSize: 13, textAlign: 'center', marginTop: 32 }}>No comments yet.</p>
            )}
            {openComments.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ color: '#888', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Open</p>
                {openComments.map((c, i) => (
                  <CommentCard
                    key={c.id}
                    comment={c}
                    number={comments.indexOf(c) + 1}
                    isAdmin={isAdmin}
                    onResolve={() => toggleResolve(c.id)}
                    onDelete={() => deleteComment(c.id)}
                    onClick={() => { setPendingClick(null); setActivePin(activePin?.id === c.id ? null : c) }}
                    active={activePin?.id === c.id}
                  />
                ))}
              </div>
            )}
            {resolvedComments.length > 0 && (
              <div>
                <p style={{ color: '#888', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Resolved</p>
                {resolvedComments.map(c => (
                  <CommentCard
                    key={c.id}
                    comment={c}
                    number={comments.indexOf(c) + 1}
                    isAdmin={isAdmin}
                    onResolve={() => toggleResolve(c.id)}
                    onDelete={() => deleteComment(c.id)}
                    onClick={() => { setPendingClick(null); setActivePin(activePin?.id === c.id ? null : c) }}
                    active={activePin?.id === c.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CommentCard({ comment, number, isAdmin, onResolve, onDelete, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? '#1a1a1a' : '#0f0f0f',
        border: `1px solid ${active ? '#f97316' : '#222'}`,
        borderRadius: 4,
        padding: 12,
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{
          width: 20, height: 20, borderRadius: '50%',
          background: comment.resolved ? PIN_COLORS.resolved : PIN_COLORS.open,
          color: '#fff', fontSize: 10, fontWeight: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{number}</span>
        <span style={{ color: '#aaa', fontSize: 12, fontWeight: 700 }}>{comment.author_name}</span>
        <span style={{ color: '#444', fontSize: 11, marginLeft: 'auto' }}>
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p style={{ color: comment.resolved ? '#555' : '#ddd', fontSize: 13, lineHeight: 1.5, margin: '0 0 10px' }}>
        {comment.comment}
      </p>
      {isAdmin && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={e => { e.stopPropagation(); onResolve() }}
            style={{ flex: 1, background: comment.resolved ? '#1a1a1a' : '#166534', color: comment.resolved ? '#555' : '#86efac', border: `1px solid ${comment.resolved ? '#333' : '#166534'}`, padding: '4px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 3 }}
          >
            {comment.resolved ? 'Unresolve' : '✓ Resolve'}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            style={{ background: '#1a0a0a', color: '#dc2626', border: '1px solid #3f0f0f', padding: '4px 8px', fontSize: 11, cursor: 'pointer', borderRadius: 3 }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
