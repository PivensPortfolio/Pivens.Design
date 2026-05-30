import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { runMigrations } from './db.js'
import sessionsRouter from './routes/sessions.js'
import commentsRouter from './routes/comments.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-key'],
}))
app.use(express.json())

app.get('/health', (_, res) => res.json({ ok: true }))
app.use('/sessions', sessionsRouter)
app.use('/comments', commentsRouter)

runMigrations()
  .then(() => {
    app.listen(PORT, () => console.log(`Pivens Review API listening on port ${PORT}`))
  })
  .catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
