import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function runMigrations() {
  const sql = readFileSync(join(__dirname, '../migrations/001_initial.sql'), 'utf8')
  await pool.query(sql)
  console.log('Migrations applied')
}

export default pool
