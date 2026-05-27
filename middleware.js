import { next } from '@vercel/edge'

export const config = { matcher: ['/'] }

export default function middleware(request) {
  // Standard Request object — must read cookies from the header directly
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(/(?:^|;\s*)pv_hero=([^;]*)/)
  const existing = match?.[1]

  if (existing) return next()

  const rand = Math.random()
  const variant = rand < 1/3 ? 'A' : rand < 2/3 ? 'B' : 'C'

  return next({
    headers: {
      'Set-Cookie': `pv_hero=${variant}; Path=/; SameSite=Lax`,
    },
  })
}
