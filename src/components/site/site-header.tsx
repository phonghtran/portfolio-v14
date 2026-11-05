'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Lock, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
  ContactRows,
  useContactPanel,
} from '@/components/site/contact-panel';
import { projects } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

const linkBase =
  'relative py-2 text-label no-underline transition-colors hover:text-primary';
const activeLine =
  'after:absolute after:inset-x-0 after:-bottom-[13px] after:h-0.5 after:bg-coral-solid';

/**
 * Header for every page except the homepage, where the contents list is the
 * navigation.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const inCaseStudies = pathname.startsWith('/casestudies');
  const inSideProjects = pathname.startsWith('/side-projects');

  return (
    <header className="border-b border-border bg-page">
      <div className="mx-auto flex h-[68px] items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-h4 font-semibold text-primary no-underline"
        >
          phonghtran
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <Link href="/" className={cn(linkBase, 'text-secondary')}>
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                linkBase,
                'flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring',
                inCaseStudies
                  ? cn('text-primary', activeLine)
                  : 'text-secondary'
              )}
            >
              Case Studies
              <ChevronDown className="h-4 w-4" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-80 rounded-xl border-border bg-surface p-1.5"
            >
              {projects.map((p, i) => (
                <DropdownMenuItem key={p.id} asChild>
                  <Link
                    href={`/casestudies/${p.id}`}
                    className="flex items-start gap-3 rounded-lg px-3 py-2 no-underline"
                  >
                    <span className="w-5 pt-0.5 text-overline text-secondary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-1.5 text-label text-primary">
                        {p.password && (
                          <Lock
                            className="h-3.5 w-3.5 text-secondary"
                            aria-label="Password protected"
                          />
                        )}
                        {p.title}
                      </span>
                      <span className="block text-body-sm text-secondary">
                        {p.client} · {p.year}
                      </span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/side-projects"
            className={cn(
              linkBase,
              inSideProjects ? cn('text-primary', activeLine) : 'text-secondary'
            )}
            aria-current={inSideProjects ? 'page' : undefined}
          >
            Side Projects
          </Link>
          <Popover>
            <PopoverTrigger className="rounded-lg bg-action px-4 py-2.5 text-[1rem] font-semibold leading-none text-action-on transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              Contact
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-[360px] rounded-2xl border-border bg-surface p-3 shadow-xl"
            >
              <div className="px-3 pb-2 pt-2">
                <h2 className="text-h4 text-primary">{CONTACT_HEADING}</h2>
                <p className="mt-0.5 text-body-sm text-secondary">
                  {CONTACT_DESCRIPTION}
                </p>
              </div>
              <ContactRows />
            </PopoverContent>
          </Popover>
        </nav>

        {/* Mobile */}
        <MobileMenu inSideProjects={inSideProjects} />
      </div>
    </header>
  );
}

function MobileMenu({ inSideProjects }: { inSideProjects: boolean }) {
  const [open, setOpen] = useState(false);
  const { openContact } = useContactPanel();
  const item = (active: boolean) =>
    cn(
      'block rounded-lg px-3 py-3 text-h4 no-underline',
      active ? 'bg-coral-subtle text-primary' : 'text-primary'
    );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="-mr-2 rounded-lg p-2 text-primary md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] bg-page px-4 pt-14">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Main" className="flex flex-col gap-1">
          <Link href="/" className={item(false)} onClick={() => setOpen(false)}>
            Home
          </Link>
          <p className="px-3 pb-1 pt-4 text-overline uppercase text-secondary">
            Case studies
          </p>
          {projects.map(p => (
            <Link
              key={p.id}
              href={`/casestudies/${p.id}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-label text-body no-underline"
              onClick={() => setOpen(false)}
            >
              {p.password && (
                <Lock
                  className="h-3.5 w-3.5 text-secondary"
                  aria-label="Password protected"
                />
              )}
              {p.title}
            </Link>
          ))}
          <Link
            href="/side-projects"
            className={cn(item(inSideProjects), 'mt-3')}
            onClick={() => setOpen(false)}
          >
            Side Projects
          </Link>
          <button
            type="button"
            className="mt-4 rounded-lg bg-action px-4 py-3 text-[1rem] font-semibold text-action-on"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
          >
            Contact
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
