import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/analytics/google-analytics';
import { ContactProvider } from '@/components/site/contact-panel';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Phong Tran · UX designer who codes',
  description:
    'Portfolio of Phong Tran, a product design leader across fintech, enterprise SaaS and agency work. Tell the assistant what you are hiring for and the contents reorder themselves.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f1e7' },
    { media: '(prefers-color-scheme: dark)', color: '#1c2628' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
      </head>
      <body>
        <GoogleAnalytics />
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
