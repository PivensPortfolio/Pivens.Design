import { next } from '@vercel/edge'

export const config = { matcher: ['/'] }

export default function middleware(request) {
  const existing = request.cookies.get('pv_hero')?.value
  if (existing) return next()

  const rand = Math.random()
  const variant = rand < 0.333 ? 'A' : rand < 0.666 ? 'B' : 'C'

  const response = next()
  response.headers.append(
    'Set-Cookie',
    `pv_hero=${variant}; Path=/; SameSite=Lax`,
  )
  return response
}
