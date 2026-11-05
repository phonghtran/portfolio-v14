'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Copy, ExternalLink, Lock } from 'lucide-react';
import { Tag } from '@/components/site/tag';
import type { ContentsItem } from '@/lib/contents';
import { cn } from '@/lib/utils';

export function ContentsRow({
  item,
  number,
  reason,
  copied,
  onCopy,
}: {
  item: ContentsItem;
  number: number;
  /** Set when the assistant moved this row up; shows the "why" tag. */
  reason?: string;
  copied?: boolean;
  onCopy?: () => void;
}) {
  const relevant = reason !== undefined;
  const showThumb = item.kind === 'case-study' || item.kind === 'side-project';
  const isCopy = !item.href && item.contact?.copy;
  const TrailingIcon = isCopy
    ? copied
      ? Check
      : Copy
    : item.external
      ? ExternalLink
      : ArrowRight;

  const body = (
    <>
      <span
        className={cn(
          'w-8 shrink-0 text-[1.125rem] font-semibold leading-tight md:w-12 md:text-h3',
          relevant ? 'text-coral-text' : 'text-secondary md:text-number'
        )}
        aria-hidden
      >
        {String(number).padStart(2, '0')}
      </span>
      {showThumb && (
        <span className="relative hidden h-20 w-[120px] shrink-0 overflow-hidden rounded-md bg-media md:block">
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes="120px"
              className="object-cover object-top"
            />
          )}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-h4 text-primary md:text-h3">
          {item.title}
          {item.locked && (
            <Lock
              className="h-4 w-4 shrink-0 text-secondary"
              aria-label="Password protected"
            />
          )}
        </span>
        <span className="mt-0.5 block text-body-sm text-secondary">
          {copied ? 'Copied to clipboard' : item.subtitle}
        </span>
        {relevant && reason && (
          <Tag tone="coral" className="mt-2">
            {reason}
          </Tag>
        )}
      </span>
      {item.meta && (
        <span className="hidden w-[220px] shrink-0 text-label-sm text-secondary lg:block">
          {item.meta}
        </span>
      )}
      <TrailingIcon
        className={cn(
          'h-5 w-5 shrink-0 text-secondary transition-transform group-hover:translate-x-0.5',
          copied && 'text-teal-text'
        )}
        aria-hidden
      />
    </>
  );

  const className = cn(
    'group flex w-full items-center gap-4 px-2 py-4 text-left no-underline transition-colors md:gap-6 md:px-4',
    relevant
      ? 'rounded-lg bg-coral-subtle hover:bg-coral-muted'
      : 'border-b border-border hover:bg-subtle',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  );

  if (isCopy) {
    return (
      <button
        type="button"
        className={className}
        onClick={onCopy}
        aria-label={`Copy ${item.title.toLowerCase()}: ${item.subtitle}`}
      >
        {body}
      </button>
    );
  }
  if (item.external) {
    return (
      <a
        className={className}
        href={item.href}
        target={item.href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
      >
        {body}
        {item.href?.startsWith('http') && (
          <span className="sr-only"> (opens in a new tab)</span>
        )}
      </a>
    );
  }
  return (
    <Link className={className} href={item.href ?? '#'}>
      {body}
    </Link>
  );
}
