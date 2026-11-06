'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';
import { rankableIds } from '@/lib/contents';
import {
  HEADER_SEPARATOR,
  TAILORING_COOKIE,
  TAILORING_MAX_AGE,
  TRAILER_SEPARATOR,
  sanitizeTailoring,
  serializeTailoring,
  type Tailoring,
} from '@/lib/tailoring';

export type CustomizingState = 'working' | 'done' | 'skipped';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  /**
   * Set on the first reply of a visit: the "Customizing the website" card
   * shown above the answer, and what it ended up doing.
   */
  customizing?: {
    state: CustomizingState;
    topic?: string;
    moved?: number;
  };
}

export type ChatStatus = 'idle' | 'thinking' | 'streaming';

// Keep in sync with the server limits in src/app/api/chat/rate-limit.ts.
export const MAX_MESSAGES_PER_DAY = 16;
const COOLDOWN_MS = 3000;
const DAY_MS = 24 * 60 * 60 * 1000;

const THREAD_KEY = 'pt_chat_thread';
const LIMIT_KEY = 'pt_chat_limit';

interface LimitState {
  count: number;
  windowStart: number;
  lastMessage: number;
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode): the chat still works for this visit.
  }
}

function writeTailoringCookie(t: Tailoring | null) {
  document.cookie = t
    ? `${TAILORING_COOKIE}=${serializeTailoring(t)}; Max-Age=${TAILORING_MAX_AGE}; Path=/; SameSite=Lax`
    : `${TAILORING_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
}

/**
 * Chat state for the homepage. The tailored order and headline persist in a
 * 1-day cookie (so the server renders the page already tailored); the thread
 * persists in localStorage with the same expiry, so "Chat history" still
 * explains the order it produced.
 */
export function usePortfolioChat(initialTailoring: Tailoring | null) {
  const analytics = useAnalytics();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [tailoring, setTailoring] = useState(initialTailoring);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const limit = useRef<LimitState>({
    count: 0,
    windowStart: 0,
    lastMessage: 0,
  });
  const cooldownTimer = useRef<ReturnType<typeof setInterval>>();

  // Restore the thread and limit counters saved in this browser.
  useEffect(() => {
    const now = Date.now();
    const saved = readJSON<{ expires: number; messages: ChatMessage[] }>(
      THREAD_KEY
    );
    if (saved && saved.expires > now && Array.isArray(saved.messages)) {
      setMessages(saved.messages);
    } else {
      writeJSON(THREAD_KEY, null);
    }
    const l = readJSON<LimitState>(LIMIT_KEY);
    if (l && now - l.windowStart < DAY_MS) {
      limit.current = l;
      setLimitReached(l.count >= MAX_MESSAGES_PER_DAY);
    }
    setHydrated(true);
    return () => clearInterval(cooldownTimer.current);
  }, []);

  // Save the thread once a reply has finished.
  useEffect(() => {
    if (!hydrated || status !== 'idle') return;
    writeJSON(
      THREAD_KEY,
      messages.length ? { expires: Date.now() + DAY_MS, messages } : null
    );
  }, [messages, status, hydrated]);

  const startCooldown = useCallback((ms: number) => {
    clearInterval(cooldownTimer.current);
    const until = Date.now() + ms;
    const tick = () => {
      const left = Math.ceil((until - Date.now()) / 1000);
      setCooldownSeconds(Math.max(0, left));
      if (left <= 0) clearInterval(cooldownTimer.current);
    };
    tick();
    cooldownTimer.current = setInterval(tick, 250);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || status !== 'idle' || limitReached) return;

      const now = Date.now();
      const l = limit.current;
      if (now - l.windowStart >= DAY_MS) {
        limit.current = { count: 0, windowStart: now, lastMessage: 0 };
      }
      if (limit.current.count >= MAX_MESSAGES_PER_DAY) {
        setLimitReached(true);
        analytics.trackChatRateLimit(0);
        return;
      }
      if (now - limit.current.lastMessage < COOLDOWN_MS) {
        startCooldown(COOLDOWN_MS - (now - limit.current.lastMessage));
        return;
      }

      const history = messages;
      limit.current = {
        ...limit.current,
        count: limit.current.count + 1,
        lastMessage: now,
      };
      writeJSON(LIMIT_KEY, limit.current);
      analytics.trackChatMessage(limit.current.count);

      setError(false);
      setInput('');
      setHistoryOpen(true);

      // The first message of a visit customizes the site before the answer.
      const first = history.length === 0;
      const userTurn: ChatMessage = { role: 'user', content: message };
      let customizing: ChatMessage['customizing'] = first
        ? { state: 'working' }
        : undefined;
      const show = (reply: string) =>
        setMessages([
          ...history,
          userTurn,
          ...(customizing || reply
            ? [{ role: 'assistant' as const, content: reply, customizing }]
            : []),
        ]);
      show('');
      setStatus('thinking');

      const applyTailoring = (raw: unknown) => {
        const next = sanitizeTailoring(raw, rankableIds);
        if (next) {
          setTailoring(next);
          writeTailoringCookie(next);
        }
        return next;
      };

      let started = false;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            chatHistory: history.map(m => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (res.status === 429) {
          const reason = await res.text().catch(() => '');
          if (/maximum/i.test(reason)) {
            limit.current.count = MAX_MESSAGES_PER_DAY;
            writeJSON(LIMIT_KEY, limit.current);
            setLimitReached(true);
          } else {
            const retry = Number(res.headers.get('Retry-After')) || 3;
            startCooldown(retry * 1000);
          }
          analytics.trackChatRateLimit(
            MAX_MESSAGES_PER_DAY - limit.current.count
          );
          setMessages(history);
          setInput(message);
          setStatus('idle');
          return;
        }
        if (!res.ok || !res.body) throw new Error(`Status ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';
        let bodyStart = 0;
        let streaming = false;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });

          // First reply: wait for the header, customize, then show the answer.
          if (customizing?.state === 'working') {
            if (!acc.startsWith(HEADER_SEPARATOR)) {
              customizing = { state: 'skipped' };
            } else {
              const end = acc.indexOf(HEADER_SEPARATOR, 1);
              if (end < 0) continue;
              let next = null;
              try {
                next = applyTailoring(JSON.parse(acc.slice(1, end)).tailoring);
              } catch {
                // Malformed header: keep the current order.
              }
              customizing = next
                ? { state: 'done', topic: next.topic, moved: next.picks.length }
                : { state: 'skipped' };
              bodyStart = end + 1;
              started = true;
              show('');
            }
          }

          const body = acc.slice(bodyStart);
          const cut = body.indexOf(TRAILER_SEPARATOR);
          const reply = (cut >= 0 ? body.slice(0, cut) : body).trimStart();
          if (!reply) continue;
          if (!streaming) {
            started = streaming = true;
            setStatus('streaming');
          }
          show(reply);
        }
        if (!started) throw new Error('Empty response');

        // Follow-ups: the trailer arrives after the reply; reorder once, at
        // the end.
        const body = acc.slice(bodyStart);
        const cut = body.indexOf(TRAILER_SEPARATOR);
        if (cut >= 0) {
          try {
            applyTailoring(JSON.parse(body.slice(cut + 1)).tailoring);
          } catch {
            // Malformed trailer: keep the current order.
          }
        }
      } catch (err) {
        console.error('Chat request failed:', err);
        if (!started) {
          // Nothing arrived: put the text back and refund the message.
          setMessages(history);
          setInput(message);
          setError(true);
          limit.current.count = Math.max(0, limit.current.count - 1);
          writeJSON(LIMIT_KEY, limit.current);
        }
      } finally {
        setStatus('idle');
      }
    },
    [analytics, limitReached, messages, startCooldown, status]
  );

  const startOver = useCallback(() => {
    setMessages([]);
    setTailoring(null);
    setError(false);
    setHistoryOpen(false);
    writeTailoringCookie(null);
    writeJSON(THREAD_KEY, null);
  }, []);

  return {
    messages,
    status,
    input,
    setInput,
    error,
    cooldownSeconds,
    limitReached,
    tailoring,
    historyOpen,
    setHistoryOpen,
    hydrated,
    send,
    startOver,
  };
}

export type PortfolioChat = ReturnType<typeof usePortfolioChat>;
