'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'classic' | 'cyberpunk' | 'vintage';

export interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  className: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  classic: {
    name: 'classic',
    displayName: 'Classic',
    description: 'Clean and professional design',
    icon: '🎨',
    className: 'theme-classic',
  },
  cyberpunk: {
    name: 'cyberpunk',
    displayName: 'Cyberpunk',
    description: 'Neon-lit futuristic aesthetic',
    icon: '🌆',
    className: 'theme-cyberpunk',
  },
  vintage: {
    name: 'vintage',
    displayName: 'Vintage',
    description: 'Retro-inspired warmth',
    icon: '📻',
    className: 'theme-vintage',
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('classic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    const html = document.documentElement;

    // Remove all theme classes
    Object.values(themes).forEach(({ className }) => {
      html.classList.remove(className);
    });

    // Add current theme class - don't add classic since it's the default
    if (theme !== 'classic') {
      html.classList.add(themes[theme].className);
    }

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);

    // Debug logging
    console.log('Theme applied:', theme, themes[theme].className);
    console.log('HTML classes:', html.className);
    console.log(
      'CSS variables:',
      getComputedStyle(html).getPropertyValue('--background')
    );
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const themeConfig = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
