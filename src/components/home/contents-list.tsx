'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';
import { useCopy } from '@/hooks/use-copy';
import {
  caseStudyItems,
  contactItems,
  resumeItem,
  sideProjectItems,
  type ContentsItem,
} from '@/lib/contents';
import { site } from '@/lib/site';
import type { Tailoring } from '@/lib/tailoring';
import { ContentsRow } from './contents-row';

interface Group {
  label: string;
  items: { item: ContentsItem; reason?: string }[];
}

const byId = new Map(
  [...caseStudyItems, ...sideProjectItems].map(i => [i.id, i])
);

function buildGroups(t: Tailoring | null): Group[] {
  const wrap = (items: ContentsItem[]) => items.map(item => ({ item }));
  if (!t) {
    return [
      { label: 'Resume', items: wrap([resumeItem]) },
      { label: 'Case studies', items: wrap(caseStudyItems) },
      { label: 'Side projects', items: wrap(sideProjectItems) },
      { label: 'Contact', items: wrap(contactItems) },
    ];
  }
  const picked = new Set(t.picks.map(p => p.id));
  return [
    {
      label: `Most relevant to ${t.topic}`,
      items: t.picks.map(p => ({ item: byId.get(p.id)!, reason: p.reason })),
    },
    { label: 'Resume', items: wrap([resumeItem]) },
    {
      label: 'More case studies',
      items: wrap(caseStudyItems.filter(i => !picked.has(i.id))),
    },
    {
      label: 'Side projects',
      items: wrap(sideProjectItems.filter(i => !picked.has(i.id))),
    },
    { label: 'Contact', items: wrap(contactItems) },
  ].filter(g => g.items.length > 0);
}

/**
 * Slides rows from their old position to their new one when the order changes
 * (FLIP: measure, invert, play). Runs once per reorder, not on scroll.
 */
function useReorderAnimation(orderKey: string, disabled: boolean) {
  const container = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-row-id]'));
    const next = new Map<string, number>();
    for (const row of rows) {
      next.set(
        row.dataset.rowId!,
        row.getBoundingClientRect().top + window.scrollY
      );
    }
    const prev = positions.current;
    positions.current = next;
    if (disabled || prev.size === 0) return;

    for (const row of rows) {
      const before = prev.get(row.dataset.rowId!);
      const after = next.get(row.dataset.rowId!);
      if (before === undefined || after === undefined || before === after)
        continue;
      row.style.transition = 'none';
      row.style.transform = `translateY(${before - after}px)`;
      row.getBoundingClientRect(); // commit the inverted position
      row.style.transition = 'transform 300ms ease-out';
      row.style.transform = '';
    }
  }, [orderKey, disabled]);

  return container;
}

export function ContentsList({ tailoring }: { tailoring: Tailoring | null }) {
  const reducedMotion = usePrefersReducedMotion();
  const { copiedKey, copy } = useCopy();
  const groups = useMemo(() => buildGroups(tailoring), [tailoring]);
  const orderKey = groups.flatMap(g => g.items.map(i => i.item.id)).join(',');
  const container = useReorderAnimation(orderKey, reducedMotion);
  const headline = tailoring?.headline ?? 'Contents';
  const first = tailoring?.picks[0] && byId.get(tailoring.picks[0].id);
  const copiedItem = contactItems.find(i => i.id === copiedKey);

  let number = 0;
  return (
    <section aria-labelledby="contents-heading" className="mx-auto">
      <h2
        id="contents-heading"
        key={headline}
        className="text-center text-[2.5rem] font-black leading-[1.05] text-primary duration-300 animate-in fade-in md:text-h1"
      >
        {headline}
      </h2>
      <p className="mx-auto mt-6 max-w-[1000px] text-center text-body-lg text-secondary">
        {site.summary}
      </p>

      <p aria-live="polite" className="sr-only">
        {tailoring && first
          ? `Contents reordered: ${headline}. ${first.title} is first.`
          : ''}
        {copiedItem?.contact?.copy?.announce ?? ''}
      </p>

      <div ref={container} className="mt-10 flex flex-col gap-8">
        {groups.map(group => (
          <div key={group.label}>
            <h3
              className={
                group.label.startsWith('Most relevant')
                  ? 'mb-2 text-overline uppercase text-coral-text'
                  : 'mb-1 text-overline uppercase text-secondary'
              }
            >
              {group.label}
            </h3>
            <ul
              className={
                group.items[0]?.reason !== undefined
                  ? 'flex flex-col gap-1'
                  : ''
              }
            >
              {group.items.map(({ item, reason }) => {
                number += 1;
                return (
                  <li key={item.id} data-row-id={item.id}>
                    <ContentsRow
                      item={item}
                      number={number}
                      reason={reason}
                      copied={copiedKey === item.id}
                      onCopy={() =>
                        item.contact?.copy &&
                        copy(item.id, item.contact.copy.text)
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
