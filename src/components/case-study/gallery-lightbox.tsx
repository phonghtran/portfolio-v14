'use client';

import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

interface Shot {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Wraps a chapter's content. Clicking an image inside an .imageGrid opens it
 * full screen with its caption; arrow keys step through, Escape closes.
 */
export function GalleryLightbox({ children }: { children: React.ReactNode }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = (e.target as HTMLElement).closest('img');
    const grid = img?.closest('.imageGrid');
    if (!img || !grid) return;
    const imgs = Array.from(grid.querySelectorAll('img'));
    setShots(
      imgs.map(i => ({
        src: i.currentSrc || i.src,
        alt: i.alt,
        caption:
          i.closest('figure')?.querySelector('figcaption')?.textContent ?? '',
      }))
    );
    setIndex(imgs.indexOf(img));
  }, []);

  const step = (d: number) =>
    setIndex(i => (i === null ? i : (i + d + shots.length) % shots.length));
  const shot = index === null ? null : shots[index];

  return (
    <div onClick={onClick}>
      {children}
      <Dialog open={shot !== null} onOpenChange={o => !o && setIndex(null)}>
        <DialogContent
          className="max-w-[min(1200px,95vw)] gap-3 border-0 bg-inverse p-4 text-inverse sm:rounded-2xl"
          onKeyDown={e => {
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
        >
          {shot && (
            <>
              <DialogTitle className="sr-only">
                Image {index! + 1} of {shots.length}
              </DialogTitle>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                className="max-h-[78vh] w-full rounded-lg object-contain"
              />
              <div className="flex items-center justify-between gap-4">
                <DialogDescription className="text-body-sm text-inverse-secondary">
                  {shot.caption}
                </DialogDescription>
                {shots.length > 1 && (
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                      className="rounded-full p-2 hover:bg-white/10"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-label-sm text-inverse-secondary">
                      {index! + 1} / {shots.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next image"
                      className="rounded-full p-2 hover:bg-white/10"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
