import type { Config } from 'tailwindcss';

// Semantic tokens live in globals.css as HSL channels (see the Figma "Theme"
// variable collection). These helpers expose them to Tailwind with alpha.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const accentRoles = [
  'subtle',
  'muted',
  'soft',
  'border',
  'bright',
  'solid',
  'strong',
  'text',
  'text-strong',
  'deep',
  'deepest',
];
const accent = (family: string) =>
  Object.fromEntries(
    accentRoles.map(role => [role, token(`${family}-${role}`)])
  );

export default {
  // Dark mode follows the visitor's system setting (prefers-color-scheme).
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        code: ['monospace'],
      },
      // Type scale from the Figma "2026/*" text styles.
      fontSize: {
        display: ['6rem', { lineHeight: '1', fontWeight: '900' }],
        h1: ['3.5rem', { lineHeight: '1.05', fontWeight: '900' }],
        h2: ['2.25rem', { lineHeight: '1.15', fontWeight: '900' }],
        h3: ['1.5rem', { lineHeight: '1.25', fontWeight: '600' }],
        h4: ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.55' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        label: ['0.875rem', { lineHeight: '1.3', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.3', fontWeight: '500' }],
        overline: [
          '0.75rem',
          { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.08em' },
        ],
        caption: ['0.75rem', { lineHeight: '1.4' }],
      },
      colors: {
        // shadcn/ui aliases (mapped onto the semantic tokens in globals.css)
        background: token('background'),
        foreground: token('foreground'),
        card: {
          DEFAULT: token('card'),
          foreground: token('card-foreground'),
        },
        popover: {
          DEFAULT: token('popover'),
          foreground: token('popover-foreground'),
        },
        primary: {
          DEFAULT: token('primary'),
          foreground: token('primary-foreground'),
        },
        secondary: {
          DEFAULT: token('secondary'),
          foreground: token('secondary-foreground'),
        },
        muted: {
          DEFAULT: token('muted'),
          foreground: token('muted-foreground'),
        },
        accent: {
          DEFAULT: token('accent'),
          foreground: token('accent-foreground'),
        },
        destructive: {
          DEFAULT: token('destructive'),
          foreground: token('destructive-foreground'),
        },
        border: token('border'),
        input: token('input'),
        ring: token('ring'),
        chart: {
          '1': token('chart-1'),
          '2': token('chart-2'),
          '3': token('chart-3'),
          '4': token('chart-4'),
          '5': token('chart-5'),
        },

        // Theme tokens
        action: {
          DEFAULT: token('action-primary'),
          hover: token('action-primary-hover'),
          on: token('action-on-primary'),
          disabled: token('action-disabled'),
          'on-disabled': token('action-on-disabled'),
        },
        coral: accent('coral'),
        teal: accent('teal'),
        marigold: accent('marigold'),
        green: accent('green'),
        red: accent('red'),
        blue: accent('blue'),
      },
      backgroundColor: {
        page: token('bg-page'),
        surface: token('bg-surface'),
        subtle: token('bg-subtle'),
        media: token('bg-media'),
        inverse: token('bg-inverse'),
      },
      textColor: {
        primary: token('text-primary'),
        body: token('text-body'),
        secondary: token('text-secondary'),
        number: token('text-number'),
        inverse: token('text-inverse'),
        'inverse-secondary': token('text-inverse-secondary'),
      },
      borderColor: {
        strong: token('border-strong'),
        stronger: token('border-stronger'),
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
