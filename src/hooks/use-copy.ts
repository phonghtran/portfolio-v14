'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const COPIED_MS = 2000;

/**
 * Copies text and reports which key was copied for ~2s, so a row can show its
 * "Copied" state and a live region can announce it.
 */
export function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }
    setCopiedKey(key);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiedKey(null), COPIED_MS);
    return true;
  }, []);

  return { copiedKey, copy };
}
