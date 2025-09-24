'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/theme-context';

export function ThemeDiagnostics() {
  const { theme, themeConfig } = useTheme();

  useEffect(() => {
    console.log('=== Theme Diagnostics ===');
    console.log('Current theme:', theme);
    console.log('Theme config:', themeConfig);

    const html = document.documentElement;
    console.log('HTML classes:', html.className);

    // Check CSS custom properties
    const styles = getComputedStyle(html);
    console.log('CSS Variables:');
    console.log('  --background:', styles.getPropertyValue('--background'));
    console.log('  --primary:', styles.getPropertyValue('--primary'));
    console.log('  --card:', styles.getPropertyValue('--card'));

    // Force a visual change test
    const testElement = document.createElement('div');
    testElement.style.cssText =
      'position: fixed; top: 10px; left: 10px; width: 100px; height: 100px; background: hsl(var(--primary)); z-index: 9999; pointer-events: none;';
    document.body.appendChild(testElement);

    return () => {
      document.body.removeChild(testElement);
    };
  }, [theme, themeConfig]);

  return null;
}
