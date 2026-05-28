/**
 * Format a phone number as the user types: (555) 555-5555
 * Strips non-digits, caps at 10, applies mask progressively.
 */
export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * Returns 'valid', 'invalid', or 'empty' for an email string.
 */
export function emailStatus(value) {
  if (!value) return 'empty'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'valid' : 'invalid'
}
