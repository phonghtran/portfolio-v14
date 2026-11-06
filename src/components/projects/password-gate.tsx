'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Client-side only. This is a courtesy gate for in-progress work, not real
// access control: the content still ships in the JS bundle and /public images.
const STORAGE_KEY = 'unlocked-projects';

function readUnlocked(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useProjectUnlock(projectId: string, password?: string) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    setUnlockedIds(readUnlocked());
  }, []);

  const unlock = () => {
    const ids = unlockedIds.includes(projectId)
      ? unlockedIds
      : [...unlockedIds, projectId];
    setUnlockedIds(ids);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage unavailable; unlock lasts until the page reloads.
    }
  };

  return { unlocked: !password || unlockedIds.includes(projectId), unlock };
}

interface PasswordGateProps {
  password: string;
  onUnlock: () => void;
  onAskForAccess: () => void;
}

export function PasswordGate({
  password,
  onUnlock,
  onAskForAccess,
}: PasswordGateProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-subtle">
        <Lock className="h-5 w-5 text-secondary" aria-hidden />
      </span>
      <h2 className="text-h3 text-primary">
        This case study is password protected
      </h2>
      <p className="text-base text-body">
        This project is ongoing, so the case study is password protected. Reach
        out if you&apos;d like access.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border bg-surface py-1.5 pl-3 pr-1.5 focus-within:ring-2 focus-within:ring-ring',
            error ? 'border-red-strong' : 'border-strong'
          )}
        >
          <label htmlFor="case-study-password" className="sr-only">
            Password
          </label>
          <input
            id="case-study-password"
            type="password"
            value={value}
            onChange={e => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            aria-invalid={error}
            aria-describedby={error ? 'case-study-password-error' : undefined}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-primary outline-none placeholder:text-secondary"
          />
          <button
            type="submit"
            className="rounded-md bg-action px-3.5 py-2 text-body-sm font-semibold text-action-on transition-colors hover:bg-action-hover"
          >
            Unlock
          </button>
        </div>
        {error && (
          <p
            id="case-study-password-error"
            role="alert"
            className="text-caption text-red-text"
          >
            That password didn&apos;t work. Try again.
          </p>
        )}
      </form>
      <button
        type="button"
        onClick={onAskForAccess}
        className="self-start rounded text-label text-coral-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Ask Phong for access →
      </button>
    </div>
  );
}
