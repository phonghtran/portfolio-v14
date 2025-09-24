'use client';

import { useTheme } from '@/contexts/theme-context';

export function ThemeDebug() {
  const { theme, themeConfig } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 text-xs font-mono shadow-lg z-50">
      <div>Theme: <span className="text-primary font-bold">{theme}</span></div>
      <div>Class: <span className="text-accent">{themeConfig.className}</span></div>
      <div className="flex gap-2 mt-2">
        <div className="w-4 h-4 rounded bg-background border"></div>
        <div className="w-4 h-4 rounded bg-primary"></div>
        <div className="w-4 h-4 rounded bg-accent"></div>
      </div>
    </div>
  );
}