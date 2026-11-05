'use client';

import { createContext, useContext, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCopy } from '@/hooks/use-copy';
import { useIsDesktop } from '@/hooks/use-media-query';
import { useAnalytics } from '@/hooks/use-analytics';
import {
  contactLinks,
  resumeLink,
  type ContactKind,
  type ContactLink,
} from '@/lib/site';
import { cn } from '@/lib/utils';

const icons: Record<ContactKind, LucideIcon> = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  resume: FileText,
};

export const CONTACT_HEADING = 'Get in touch';
export const CONTACT_DESCRIPTION =
  'Copy an address or open a profile in a new tab.';

/**
 * Lets anything on the page ("Ask Phong for access", the mobile menu) open the
 * contact overlay. The header's desktop popover manages its own state.
 */
const ContactContext = createContext<{ openContact: () => void }>({
  openContact: () => {},
});

export const useContactPanel = () => useContext(ContactContext);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  return (
    <ContactContext.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm gap-0 rounded-2xl border-border bg-surface p-3">
            <ContactHeader />
            <ContactRows />
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="rounded-t-3xl border-0 bg-surface px-4 pb-8 pt-2"
          >
            <div
              aria-hidden
              className="mx-auto mb-2 h-1 w-9 rounded-full bg-media"
            />
            <SheetTitle className="px-3 pb-1 pt-2 text-h3 text-primary">
              {CONTACT_HEADING}
            </SheetTitle>
            <SheetDescription className="px-3 pb-2 text-body-sm text-secondary">
              {CONTACT_DESCRIPTION}
            </SheetDescription>
            <ContactRows />
          </SheetContent>
        </Sheet>
      )}
    </ContactContext.Provider>
  );
}

function ContactHeader() {
  return (
    <div className="px-3 pb-2 pt-2">
      <DialogTitle className="text-h4 text-primary">
        {CONTACT_HEADING}
      </DialogTitle>
      <DialogDescription className="mt-0.5 text-body-sm text-secondary">
        {CONTACT_DESCRIPTION}
      </DialogDescription>
    </div>
  );
}

/** Email and phone copy to the clipboard; profiles open in a new tab. */
export function ContactRows({ className }: { className?: string }) {
  const { copiedKey, copy } = useCopy();
  const analytics = useAnalytics();
  const copied = contactLinks.find(c => c.kind === copiedKey);

  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      {contactLinks.map(link => (
        <ContactRow
          key={link.kind}
          link={link}
          copied={copiedKey === link.kind}
          onCopy={() => link.copy && copy(link.kind, link.copy.text)}
          onOpen={() => analytics.trackExternalLink(link.href!, link.title)}
        />
      ))}
      <hr className="mx-3 my-1.5 border-border" />
      <ContactRow
        link={resumeLink}
        copied={false}
        onOpen={() => analytics.trackExternalLink(resumeLink.href!, 'Resume')}
      />
      <p aria-live="polite" className="sr-only">
        {copied?.copy?.announce ?? ''}
      </p>
    </div>
  );
}

function ContactRow({
  link,
  copied,
  onCopy,
  onOpen,
}: {
  link: ContactLink;
  copied: boolean;
  onCopy?: () => void;
  onOpen?: () => void;
}) {
  const Icon = icons[link.kind];
  const isCopy = Boolean(link.copy);
  const body = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-coral-subtle text-coral-strong">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-label text-primary">{link.title}</span>
        <span className="block truncate text-body-sm text-secondary">
          {link.value}
        </span>
      </span>
      <span className="flex items-center gap-1.5 text-secondary">
        <span
          className={cn(
            'text-label-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
            copied && 'text-teal-text opacity-100'
          )}
        >
          {copied ? 'Copied' : isCopy ? 'Copy' : 'Open'}
        </span>
        {copied ? (
          <Check className="h-5 w-5 text-teal-text" aria-hidden />
        ) : isCopy ? (
          <Copy className="h-5 w-5" aria-hidden />
        ) : (
          <ExternalLink className="h-5 w-5" aria-hidden />
        )}
      </span>
    </>
  );
  const rowClass =
    'group flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left no-underline transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return isCopy ? (
    <button
      type="button"
      className={rowClass}
      onClick={onCopy}
      aria-label={`Copy ${link.title.toLowerCase()}: ${link.value}`}
    >
      {body}
    </button>
  ) : (
    <a
      className={rowClass}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      onClick={onOpen}
      aria-label={`${link.title}: ${link.value} (opens in a new tab)`}
    >
      {body}
    </a>
  );
}
