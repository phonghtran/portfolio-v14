'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, Lock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { projects, type Project } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

const href = (p: Project) => `/casestudies/${p.id}`;

function LockMark() {
  return (
    <Lock
      className="h-3.5 w-3.5 shrink-0 text-secondary"
      aria-label="Password protected"
    />
  );
}

/**
 * Steps through the case studies in their fixed 1–7 order (tailoring only
 * changes the homepage). At either end the arrow disappears but keeps its
 * space, so the position stays centred.
 */
export function CaseStudySwitcher({ index }: { index: number }) {
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const total = projects.length;

  return (
    <div className="grid grid-cols-[40px_1fr_40px] items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6">
      {/* Previous */}
      <div className="justify-self-start">
        {prev && (
          <Link
            href={href(prev)}
            className="group flex items-center gap-3 rounded-lg no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Previous case study: ${prev.title}${prev.password ? ' (password protected)' : ''}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-strong bg-surface text-primary md:h-auto md:w-auto md:border-0 md:bg-transparent">
              <ArrowLeft
                className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
                aria-hidden
              />
            </span>
            <span className="hidden md:block">
              <span className="block text-overline uppercase text-secondary">
                Previous
              </span>
              <span className="flex items-center gap-1.5 text-label text-primary">
                {prev.password && <LockMark />}
                {prev.title}
              </span>
            </span>
          </Link>
        )}
      </div>

      {/* Position */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1" aria-hidden>
          {projects.map((p, i) => (
            <span
              key={p.id}
              className={cn(
                'h-1 w-5 rounded-full md:w-7',
                i === index
                  ? 'bg-coral-solid'
                  : 'bg-[hsl(var(--border-strong))]'
              )}
            />
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 rounded text-label-sm text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Case study {index + 1} of {total}
            <ChevronDown className="h-4 w-4" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-80 rounded-xl border-border bg-surface p-1.5"
          >
            {projects.map((p, i) => (
              <DropdownMenuItem key={p.id} asChild>
                <Link
                  href={href(p)}
                  aria-current={i === index ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 no-underline',
                    i === index && 'bg-coral-subtle'
                  )}
                >
                  <span className="w-5 text-overline text-secondary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-1 items-center gap-1.5 text-label text-primary">
                    {p.password && <LockMark />}
                    {p.title}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Next */}
      <div className="justify-self-end">
        {next && (
          <Link
            href={href(next)}
            className="group flex items-center gap-3 rounded-lg text-right no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Next case study: ${next.title}${next.password ? ' (password protected)' : ''}`}
          >
            <span className="hidden md:block">
              <span className="block text-overline uppercase text-secondary">
                Next
              </span>
              <span className="flex items-center justify-end gap-1.5 text-label text-primary">
                {next.password && <LockMark />}
                {next.title}
              </span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-strong bg-surface text-primary md:h-auto md:w-auto md:border-0 md:bg-transparent">
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
