import { getCookie, setCookie, getVariant } from './cookies'

beforeEach(() => {
  document.cookie.split(';').forEach(c => {
    document.cookie = c.replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/')
  })
})

describe('getCookie', () => {
  it('returns null when cookie does not exist', () => {
    expect(getCookie('pv_hero')).toBeNull()
  })
  it('returns value when cookie exists', () => {
    document.cookie = 'pv_hero=A; path=/'
    expect(getCookie('pv_hero')).toBe('A')
  })
})

describe('setCookie', () => {
  it('sets a session cookie', () => {
    setCookie('pv_hero', 'B')
    expect(getCookie('pv_hero')).toBe('B')
  })
})

describe('getVariant', () => {
  it('returns existing variant if cookie is already set', () => {
    document.cookie = 'pv_hero=C; path=/'
    expect(getVariant()).toBe('C')
  })
  it('assigns and returns a valid variant when none exists', () => {
    const variant = getVariant()
    expect(['A', 'B', 'C']).toContain(variant)
  })
  it('returns the same variant on repeated calls (session lock)', () => {
    const first = getVariant()
    const second = getVariant()
    expect(first).toBe(second)
  })
})
