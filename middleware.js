import { next } from '@vercel/edge'

export const config = { matcher: ['/'] }

export default function middleware(request) {
  const existing = request.cookies.get('pv_hero')?.value
  if (existing) return next()

  const rand = Math.random()
  const variant = rand < 1/3 ? 'A' : rand < 2/3 ? 'B' : 'C'

  return next({
    headers: {
      'Set-Cookie': `pv_hero=${variant}; Path=/; SameSite=Lax`,
    },
  })
}
