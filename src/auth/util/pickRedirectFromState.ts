const ALLOWED_HOSTS = new Set(['localhost:3000', 'talktodo-client.vercel.app']);
const FALLBACK = 'http://localhost:3000/'; // 맘에 드는 기본값

export const pickRedirectFromState = (stateRaw?: string) => {
  if (!stateRaw) return FALLBACK;

  try {
    const s = decodeURIComponent(stateRaw);
    const u = new URL(s);

    if (!ALLOWED_HOSTS.has(u.host)) return FALLBACK;

    return u.toString();
  } catch {
    return FALLBACK;
  }
};
