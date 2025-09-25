'use client';

import { useState } from 'react';
import { ChevronDown, Palette } from 'lucide-react';
import { useTheme, themes, type Theme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Debug: log current theme
  console.log('Current theme in toggle:', theme, themeConfig);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
          'bg-card border border-border hover:border-primary/50',
          'text-sm font-medium text-foreground',
          'hover:shadow-lg hover:scale-105 active:scale-95'
        )}
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{themeConfig.displayName}</span>
        <span className="text-lg">{themeConfig.icon}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 9998 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className={cn(
              'absolute top-full right-0 mt-2',
              'bg-card border border-border rounded-xl shadow-xl',
              'min-w-[280px] p-2',
              'animate-in fade-in-0 zoom-in-95 duration-200'
            )}
            style={{ zIndex: 9999 }}
          >
            <div className="grid gap-1">
              {Object.entries(themes).map(([key, config]) => {
                const isActive = theme === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key as Theme);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200',
                      'text-left hover:bg-accent/50',
                      isActive && 'bg-primary/10 border border-primary/20'
                    )}
                  >
                    <div className="text-2xl">{config.icon}</div>
                    <div className="flex-1">
                      <div
                        className={cn(
                          'font-medium',
                          isActive ? 'text-primary' : 'text-foreground'
                        )}
                      >
                        {config.displayName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {config.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border mt-2 pt-2">
              <div className="text-xs text-muted-foreground text-center px-3 py-1">
                Choose your visual experience
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
