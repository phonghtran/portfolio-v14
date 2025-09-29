'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'classic' | 'cyberpunk' | 'vintage';

// 🎨 CUSTOMIZATION: Change this to set the default theme for development/new users
// This makes it easier to work on a specific theme during customization
const DEFAULT_THEME: Theme = 'classic';

// Set to true to always use the default theme (ignores localStorage)
// Useful when developing/customizing a specific theme
const FORCE_DEFAULT_THEME = false;

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
    displayName: 'Classic B2B',
    description: 'Enterprise-level MVP',
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

// 🛠️ DEVELOPMENT HELPER: Quickly test different themes
// Usage in browser console: window.setDevTheme('cyberpunk')
if (typeof window !== 'undefined') {
  (window as any).setDevTheme = (themeName: Theme) => {
    if (themes[themeName]) {
      localStorage.setItem('portfolio-theme', themeName);
      window.location.reload();
      console.log(`🎨 Dev theme set to: ${themeName}`);
    } else {
      console.error(
        `❌ Invalid theme: ${themeName}. Available: ${Object.keys(themes).join(', ')}`
      );
    }
  };
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (FORCE_DEFAULT_THEME) {
      // Always use the default theme (useful for development/customization)
      setThemeState(DEFAULT_THEME);
      return;
    }

    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    } else {
      // No saved theme found, use default
      setThemeState(DEFAULT_THEME);
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

    // Add current theme class - don't add classic since it's the default CSS
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
    // Prevent theme changes if forcing default theme
    if (FORCE_DEFAULT_THEME) {
      console.log('Theme switching disabled - FORCE_DEFAULT_THEME is enabled');
      return;
    }

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
