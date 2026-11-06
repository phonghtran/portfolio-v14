import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge only knows Tailwind's default font sizes. Without this it
// reads our type scale (text-label-sm, text-h3, …) as text colors and drops
// it whenever a color class is also present, e.g. a Tag's
// `text-label-sm text-coral-text-strong`. Keep in sync with
// theme.extend.fontSize in tailwind.config.ts.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
            'h1',
            'h2',
            'h3',
            'h4',
            'body-lg',
            'body-sm',
            'label',
            'label-sm',
            'overline',
            'caption',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
