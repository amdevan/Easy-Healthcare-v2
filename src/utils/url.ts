
export const resolveSrc = (p: string): string => {
  const s = String(p || '').trim();
  if (!s) return '';
  
  // Use VITE_API_BASE_URL to determine the backend root
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  let base = '';
  
  if (apiBase) {
      // If apiBase is "https://admin.example.com/api", we want "https://admin.example.com"
      base = apiBase.replace(/\/api\/?$/, '');
  } else {
      // Fallback for dev mode if not set
      base = import.meta.env.DEV ? 'http://127.0.0.1:8000' : '';
  }

  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith('/storage/')) return `${base}${s}`;
  if (s.startsWith('storage/')) return `${base}/${s}`;
  if (s.startsWith('/')) return s;
  return `${base}/storage/${s}`;
};
