import type { Metadata } from 'next';
import {
  CONTACT_DESCRIPTION,
  CONTACT_HEADING,
  ContactRows,
} from '@/components/site/contact-panel';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';

export const metadata: Metadata = {
  title: 'Contact · Phong Tran',
  description: 'Email, phone and profiles for Phong Tran.',
};

// The nav's Contact button opens a popover; this page is for anyone who lands
// on /contact directly. Same rows, no map.
export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-16 pt-10 md:pb-28 md:pt-[72px]">
        <div className="mx-auto max-w-[480px]">
          <h1 className="text-h1">{CONTACT_HEADING}</h1>
          <p className="mt-3 text-body-lg text-secondary">
            {CONTACT_DESCRIPTION}
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-3">
            <ContactRows />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
