'use client';

import { useEffect, useRef, useState } from 'react';
import { SiteFooter } from '@/components/site/site-footer';
import { cn } from '@/lib/utils';
import type { Tailoring } from '@/lib/tailoring';
import { ChatCard } from './chat-card';
import { ContentsList } from './contents-list';
import { usePortfolioChat } from './use-portfolio-chat';

/**
 * The homepage has no nav bar: the chat is the call to action and the contents
 * list is the navigation. Once the hero chat scrolls out of view, a condensed
 * copy pins to the top (same state, so typing carries over).
 */
export function HomeView({
  initialTailoring,
}: {
  initialTailoring: Tailoring | null;
}) {
  const chat = usePortfolioChat(initialTailoring);
  const heroEnd = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  // Only one copy of the chat is interactive at a time.
  useEffect(() => {
    if (bar.current) bar.current.inert = !pinned;
    if (hero.current) hero.current.inert = pinned;
  }, [pinned]);

  useEffect(() => {
    const el = heroEnd.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: '-120px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-40 bg-page/95 px-4 py-2 backdrop-blur transition-[opacity,transform] duration-200 ease-out md:px-[120px] md:py-4',
          pinned
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        )}
        ref={bar}
        aria-hidden={!pinned}
      >
        <ChatCard chat={chat} condensed />
      </div>

      <main>
        <section
          aria-label="Ask about Phong"
          ref={hero}
          className="px-4 pb-10 pt-6 md:px-[120px] md:pb-[72px] md:pt-[72px]"
        >
          <ChatCard chat={chat} />
          <div ref={heroEnd} aria-hidden />
        </section>

        <div className="px-4 pb-16 md:px-[120px] md:pb-28">
          <ContentsList tailoring={chat.tailoring} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
