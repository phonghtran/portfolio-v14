/**
 * Server-side rate limiter for /api/chat, mirroring the client-side limits in
 * chat-interface.tsx: a per-session message cap, a per-message cooldown, and a
 * rolling 24h session window. Keyed by client IP.
 *
 * This is a simple in-memory limiter. App Hosting runs the backend with
 * maxInstances: 1 (see apphosting.yaml), so a single process-local Map is an
 * adequate abuse/cost safety valve. Note the state is per-instance and resets on
 * restart/redeploy — use a shared store (Redis/Firestore) if you ever need hard,
 * durable guarantees or scale past one instance.
 */

// Keep in sync with the client constants in chat-interface.tsx.
export const MAX_MESSAGES_PER_SESSION = 16;
export const COOLDOWN_MS = 3000;
export const SESSION_WINDOW_MS = 24 * 60 * 60 * 1000;

interface Bucket {
  count: number;
  sessionStart: number;
  lastMessage: number;
}

const buckets = new Map<string, Bucket>();

// Prune fully-expired buckets once the map grows, to bound memory.
function pruneIfNeeded(now: number) {
  if (buckets.size < 5000) return;
  for (const [ip, b] of buckets) {
    if (now - b.sessionStart > SESSION_WINDOW_MS) buckets.delete(ip);
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: string; retryAfterSeconds: number };

/**
 * Checks the limit for `key` and, when allowed, records the message (increments
 * the count and updates the cooldown timestamp). Call once per accepted request.
 */
export function consumeRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  pruneIfNeeded(now);

  let b = buckets.get(key);
  if (!b || now - b.sessionStart > SESSION_WINDOW_MS) {
    // New or expired session window.
    b = { count: 0, sessionStart: now, lastMessage: 0 };
    buckets.set(key, b);
  }

  if (b.count >= MAX_MESSAGES_PER_SESSION) {
    const msLeft = SESSION_WINDOW_MS - (now - b.sessionStart);
    const hoursLeft = Math.ceil(msLeft / (60 * 60 * 1000));
    return {
      allowed: false,
      reason: `You've reached the maximum of ${MAX_MESSAGES_PER_SESSION} messages. Please try again in ${hoursLeft} hour(s).`,
      retryAfterSeconds: Math.ceil(msLeft / 1000),
    };
  }

  if (b.lastMessage > 0 && now - b.lastMessage < COOLDOWN_MS) {
    const waitMs = COOLDOWN_MS - (now - b.lastMessage);
    const waitSeconds = Math.ceil(waitMs / 1000);
    return {
      allowed: false,
      reason: `Please wait ${waitSeconds} second(s) before sending another message.`,
      retryAfterSeconds: waitSeconds,
    };
  }

  b.count += 1;
  b.lastMessage = now;
  return { allowed: true };
}

/**
 * Best-effort client IP from proxy headers. App Hosting sits behind Google's
 * load balancer, which sets x-forwarded-for with the client IP first.
 */
export function getClientKey(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}
