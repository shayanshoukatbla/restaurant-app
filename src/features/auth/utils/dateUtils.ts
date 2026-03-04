/**
 * Converts an ISO 8601 date string to DD/MM/YYYY display format.
 * Returns an empty string if the input is missing or invalid.
 */
export function isoToDisplay(iso?: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()}`;
  } catch {
    return '';
  }
}

/**
 * Parses a DD/MM/YYYY string into a JavaScript Date object.
 * Falls back to 01/01/1990 if parsing fails.
 */
export function displayToDate(display: string): Date {
  const [dd, mm, yyyy] = display.split('/').map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  return isNaN(d.getTime()) ? new Date(1990, 0, 1) : d;
}

/**
 * Formats a JavaScript Date object as DD/MM/YYYY.
 */
export function dateToDisplay(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${date.getFullYear()}`;
}
