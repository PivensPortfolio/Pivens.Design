import { Router } from 'express'
import db from '../db.js'

const router = Router()

const NTFY_TOPIC = process.env.NTFY_TOPIC
const FRONTEND_URL = process.env.FRONTEND_URL

// POST /sessions/:token/comments — add a comment (public)
router.post('/:token/comments', async (req, res) => {
  const { token } = req.params
  const { x_percent, y_percent, comment, author_name } = req.body

  if (x_percent == null || y_percent == null || !comment?.trim()) {
    return res.status(400).json({ error: 'x_percent, y_percent, and comment are required' })
  }

  const { rows: sessions } = await db.query('SELECT * FROM review_sessions WHERE token = $1', [token])
  if (!sessions.length) return res.status(404).json({ error: 'Session not found' })
  const session = sessions[0]

  const { rows } = await db.query(
    'INSERT INTO review_comments (session_token, x_percent, y_percent, comment, author_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [token, x_percent, y_percent, comment.trim(), author_name?.trim() || 'Client']
  )
  const newComment = rows[0]

  // Notify via ntfy
  if (NTFY_TOPIC) {
    const body = `${newComment.author_name}: ${newComment.comment}\n\nProject: ${session.project_name}\nView: ${FRONTEND_URL}/review/${token}`
    fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': `Review Comment — ${session.project_name}`,
        'Priority': 'high',
        'Tags': 'speech_balloon,pivens',
        'Content-Type': 'text/plain',
      },
      body,
    }).catch(() => {}) // fire and forget
  }

  res.status(201).json(newComment)
})

// PATCH /comments/:id/resolve — toggle resolved (admin only)
router.patch('/:id/resolve', async (req, res) => {
  const secret = req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params
  const { rows } = await db.query(
    'UPDATE review_comments SET resolved = NOT resolved WHERE id = $1 RETURNING *',
    [id]
  )
  if (!rows.length) return res.status(404).json({ error: 'Comment not found' })
  res.json(rows[0])
})

// DELETE /comments/:id — delete a comment (admin only)
router.delete('/:id', async (req, res) => {
  const secret = req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' })

  const { id } = req.params
  await db.query('DELETE FROM review_comments WHERE id = $1', [id])
  res.json({ deleted: true })
})

export default router
