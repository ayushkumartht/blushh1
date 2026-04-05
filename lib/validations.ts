import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

/**
 * Validates if the email belongs to an allowed college domain.
 */
export function isAllowedCollegeDomain(email: string): boolean {
  const allowedDomains = process.env.ALLOWED_COLLEGE_DOMAINS?.split(',') || []
  const domain = email.split('@')[1]
  return allowedDomains.includes(domain)
}

/**
 * Sanitizes any string content using DOMPurify for XSS protection.
 */
export function sanitizeContent(content: string): string {
  if (!content) return ''
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [], // No HTML allowed
    KEEP_CONTENT: true,
  }).trim()
}

/**
 * Basic email format validation.
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
