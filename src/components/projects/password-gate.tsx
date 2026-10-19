'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
}

export function PasswordGate({ password, onUnlock }: PasswordGateProps) {
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
    <div className="p-6 bg-chart-1 text-background rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <Lock className="h-5 w-5 shrink-0" />
        <h2 className="text-2xl font-bold">Password Protected</h2>
      </div>
      <p className="mb-6">
        This project is ongoing, so the case study is password protected. Reach
        out if you&apos;d like access.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
        <Input
          type="password"
          value={value}
          onChange={e => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          aria-label="Password"
          aria-invalid={error}
          className="text-foreground"
          autoComplete="off"
        />
        <Button
          type="submit"
          className="bg-chart-2 text-background border-0 shrink-0"
        >
          Unlock
        </Button>
      </form>
      {error && (
        <p className="text-sm mt-3" role="alert">
          That password didn&apos;t work. Try again.
        </p>
      )}
    </div>
  );
}
