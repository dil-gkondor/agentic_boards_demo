export function parseHash() {
  const raw = (window.location.hash || '#/').replace(/^#/, '') || '/';
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  if (path === '/' || path === '/dashboard') return { view: 'dashboard' };
  const match = path.match(/^\/cases\/([^/]+)$/);
  if (match) return { view: 'case', caseSlug: match[1] };
  return { view: 'dashboard' };
}

export function setHash(path) {
  const next = path.startsWith('/') ? path : `/${path}`;
  if (window.location.hash !== `#${next}`) window.location.hash = next;
}
