export function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function setCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`
}

export function getVariant() {
  const existing = getCookie('pv_hero')
  if (existing) return existing
  const rand = Math.random()
  const variant = rand < 1/3 ? 'A' : rand < 2/3 ? 'B' : 'C'
  setCookie('pv_hero', variant)
  return variant
}
