export function withBase(path: string): string {
  const trimmed = path.replace(/^\/+/, '');
  const base = import.meta.env?.BASE_URL ?? '/';
  return base.endsWith('/') ? `${base}${trimmed}` : `${base}/${trimmed}`;
}
