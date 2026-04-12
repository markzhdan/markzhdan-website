// In-memory fixed-window rate limiter.
// NOTE: This resets per server instance. For multi-instance/serverless deployments
// (e.g. Vercel), replace with @upstash/ratelimit + @upstash/redis.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Prefer x-real-ip (set by Vercel/trusted proxy, not spoofable by the client).
// Falls back to the LAST entry in x-forwarded-for, which is added by the
// outermost proxy you control — not the first entry, which the client can forge.
// Returns null when IP cannot be determined; the caller skips limiting.
function getIP(request: Request): string | null {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const last = forwarded.split(",").at(-1)?.trim();
    if (last) return last;
  }

  return null;
}

// Normalize the dynamic slug under /api/daily-blogs/ so all blog reads (both
// date slugs like 04-11-2026 and article slugs like my-post) share one bucket.
// Scoped narrowly to avoid accidentally merging static routes like /api/daily-blogs/list.
function normalizePathname(pathname: string): string {
  return pathname.replace(
    /^(\/api\/daily-blogs\/)(?!list$)[a-zA-Z0-9_-]+$/,
    "$1[slug]"
  );
}

// Sweep expired entries when the store grows large to prevent unbounded memory
// growth from IPs that hit the API once and never return.
const MAX_ENTRIES = 5_000;

export function checkRateLimit(
  request: Request,
  limit: number,
  windowSeconds: number
): void {
  if (windowSeconds <= 0) return;
  const ip = getIP(request);

  // In production the reverse proxy (Vercel) always sets x-real-ip, so null
  // only occurs in local dev with no proxy. Block in production; skip in dev
  // so local testing isn't disrupted.
  if (!ip) {
    if (process.env.NODE_ENV === "production") {
      const error = new Error("Too many requests") as Error & {
        status: number;
      };
      error.status = 429;
      throw error;
    }
    return;
  }

  const routeKey = normalizePathname(new URL(request.url).pathname);
  const key = `${routeKey}:${ip}`;
  const now = Date.now();

  if (store.size >= MAX_ENTRIES) {
    for (const [k, v] of store) {
      if (now >= v.resetAt) store.delete(k);
      // Stop once we're back under the limit — no need to scan the whole map
      if (store.size < MAX_ENTRIES) break;
    }
  }

  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return;
  }

  if (entry.count >= limit) {
    console.warn(`[rate-limit] blocked ip=${ip} route=${routeKey}`);
    const error = new Error("Too many requests") as Error & { status: number };
    error.status = 429;
    throw error;
  }

  entry.count++;
}
