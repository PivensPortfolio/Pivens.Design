import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQ from './FAQ'

it('shows all questions, hides all answers initially', () => {
  render(<FAQ />)
  expect(screen.getByText(/How long does it take/i)).toBeInTheDocument()
  expect(screen.queryByText(/typically within/i)).not.toBeInTheDocument()
})

it('reveals answer when question is clicked', async () => {
  render(<FAQ />)
  await userEvent.click(screen.getByText(/How long does it take/i))
  expect(screen.getByText(/typically within/i)).toBeInTheDocument()
})

it('collapses open answer when clicked again', async () => {
  render(<FAQ />)
  await userEvent.click(screen.getByText(/How long does it take/i))
  await userEvent.click(screen.getByText(/How long does it take/i))
  expect(screen.queryByText(/typically within/i)).not.toBeInTheDocument()
})
