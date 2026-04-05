/**
 * Validates if the email belongs to an allowed college domain.
 */
export function isAllowedCollegeDomain(email: string): boolean {
  const allowedDomains = process.env.ALLOWED_COLLEGE_DOMAINS?.split(',') || []
  const domain = email.split('@')[1]
  return allowedDomains.includes(domain)
}

/**
 * Sanitizes message content before storing in DB.
 */
export function sanitizeContent(content: string): string {
  if (!content) return ''
  return content
    .replace(/<[^>]*>?/gm, '') // Strip HTML
    .trim()
}

/**
 * Basic email format validation.
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
