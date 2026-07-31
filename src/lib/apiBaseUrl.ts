/**
 * Resolves the axios base URL for backend API calls.
 * When NEXT_PUBLIC_API_BASE_URL is unset, uses an internal Next.js proxy so
 * paths like /products/random never collide with App Router page routes.
 */
export function resolveApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
  if (configured) return configured;

  if (typeof window !== 'undefined') {
    return '/api/backend';
  }

  const port = process.env.PORT || '3000';
  const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://127.0.0.1:${port}`;

  return `${host}/api/backend`;
}
