import { Router } from 'express'
import { randomBytes } from 'crypto'
import db from '../db.js'

const router = Router()

// POST /sessions — create a review session (admin only)
router.post('/', async (req, res) => {
  const secret = req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' })

  const { client_name, project_name, preview_url } = req.body
  if (!client_name || !project_name || !preview_url) {
    return res.status(400).json({ error: 'client_name, project_name, and preview_url are required' })
  }

  const token = randomBytes(6).toString('hex')

  await db.query(
    'INSERT INTO review_sessions (token, client_name, project_name, preview_url) VALUES ($1, $2, $3, $4)',
    [token, client_name, project_name, preview_url]
  )

  res.json({ token, url: `${process.env.FRONTEND_URL}/review/${token}` })
})

// GET /sessions — list all sessions (admin only)
router.get('/', async (req, res) => {
  const secret = req.headers['x-admin-key']
  if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' })

  const { rows } = await db.query(
    'SELECT s.*, COUNT(c.id) AS comment_count FROM review_sessions s LEFT JOIN review_comments c ON c.session_token = s.token GROUP BY s.token ORDER BY s.created_at DESC'
  )
  res.json(rows)
})

// GET /sessions/:token — get session + all comments (public)
router.get('/:token', async (req, res) => {
  const { token } = req.params
  const { rows: sessions } = await db.query('SELECT * FROM review_sessions WHERE token = $1', [token])
  if (!sessions.length) return res.status(404).json({ error: 'Session not found' })

  const { rows: comments } = await db.query(
    'SELECT * FROM review_comments WHERE session_token = $1 ORDER BY created_at ASC',
    [token]
  )

  res.json({ session: sessions[0], comments })
})

export default router
