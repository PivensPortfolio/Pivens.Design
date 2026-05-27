import { render, screen } from '@testing-library/react'
import Hero from './Hero'

beforeEach(() => {
  document.cookie = 'pv_hero=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
})

it('renders HeroA when variant is A', () => {
  document.cookie = 'pv_hero=A; path=/'
  render(<Hero />)
  expect(screen.getByText(/Done in Days/i)).toBeInTheDocument()
})

it('renders HeroB when variant is B', () => {
  document.cookie = 'pv_hero=B; path=/'
  render(<Hero />)
  expect(screen.getByText(/You Don't/i)).toBeInTheDocument()
})

it('renders HeroC when variant is C', () => {
  document.cookie = 'pv_hero=C; path=/'
  render(<Hero />)
  expect(screen.getByText(/Done Fast/i)).toBeInTheDocument()
})

it('renders a valid hero when no cookie is set', () => {
  render(<Hero />)
  const hasHero =
    screen.queryByText(/Done in Days/i) ||
    screen.queryByText(/You Don't/i) ||
    screen.queryByText(/Done Fast/i)
  expect(hasHero).not.toBeNull()
})
