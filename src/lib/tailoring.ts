/**
 * The tailored homepage: what the assistant returns after each reply, and how
 * it persists. Shared by the API route, the server-rendered homepage and the
 * client, so all three agree on limits and validation.
 */

export const HEADLINE_MAX = 32;
export const TOPIC_MAX = 24;
export const REASON_MAX = 48;
export const MAX_PICKS = 4;

/** First-party cookie holding the tailored order; lasts one day. */
export const TAILORING_COOKIE = 'pt_tailored';
export const TAILORING_MAX_AGE = 60 * 60 * 24;

/** Separates the streamed reply from the JSON trailer in /api/chat. */
export const TRAILER_SEPARATOR = '\u001e';

export interface TailoringPick {
  id: string;
  reason: string;
}

export interface Tailoring {
  /** AI-written contents heading; null falls back to "Contents". */
  headline: string | null;
  /** Short lowercase topic for "Most relevant to {topic}". */
  topic: string;
  picks: TailoringPick[];
}

const clip = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max).trim() : '';

/**
 * Validates untrusted tailoring (model output or a cookie). Unknown ids are
 * dropped, text is clipped to the limits, and an over-long headline falls back
 * to null rather than being cut mid-word. Returns null when nothing usable is
 * left.
 */
export function sanitizeTailoring(
  input: unknown,
  validIds: ReadonlySet<string>
): Tailoring | null {
  if (!input || typeof input !== 'object') return null;
  const raw = input as Record<string, unknown>;

  const seen = new Set<string>();
  const picks: TailoringPick[] = [];
  for (const p of Array.isArray(raw.picks) ? raw.picks : []) {
    const id = typeof p?.id === 'string' ? p.id : '';
    if (!validIds.has(id) || seen.has(id)) continue;
    seen.add(id);
    picks.push({ id, reason: clip(p.reason, REASON_MAX) });
    if (picks.length === MAX_PICKS) break;
  }
  if (picks.length === 0) return null;

  const headline =
    typeof raw.headline === 'string' &&
    raw.headline.trim().length > 0 &&
    raw.headline.trim().length <= HEADLINE_MAX
      ? raw.headline.trim()
      : null;

  return {
    headline,
    topic: clip(raw.topic, TOPIC_MAX).toLowerCase() || 'this role',
    picks,
  };
}

export function serializeTailoring(t: Tailoring): string {
  return encodeURIComponent(JSON.stringify(t));
}

export function parseTailoring(
  value: string | undefined,
  validIds: ReadonlySet<string>
): Tailoring | null {
  if (!value) return null;
  // Some cookie readers decode values already (Next's cookies() does).
  for (const candidate of [value, safeDecode(value)]) {
    try {
      return sanitizeTailoring(JSON.parse(candidate), validIds);
    } catch {
      // try the next form
    }
  }
  return null;
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
