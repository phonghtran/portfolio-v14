import { cn } from '@/lib/utils';

export type TagTone = 'coral' | 'teal' | 'marigold' | 'neutral';

// Tags use the 100–200 tints with 800 text, so a marigold tag never reads as a
// (marigold) primary button.
const tones: Record<TagTone, string> = {
  coral: 'bg-coral-muted text-coral-text-strong',
  teal: 'bg-teal-muted text-teal-text-strong',
  marigold: 'bg-marigold-soft text-marigold-text-strong',
  neutral: 'bg-media text-primary',
};

export const tagToneCycle: TagTone[] = ['coral', 'teal', 'marigold', 'neutral'];

export function Tag({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: TagTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-label-sm',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
