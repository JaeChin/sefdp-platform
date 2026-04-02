/**
 * HTML-escapes a string to prevent XSS when interpolating user input into HTML.
 * Apply to ALL user-controlled values before inserting into HTML email templates.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
