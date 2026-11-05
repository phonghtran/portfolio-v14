/**
 * Contact details and outbound links, shared by the homepage contents, the
 * Contact popover/sheet, the /contact page and the footer.
 */
export const site = {
  name: 'Phong Tran',
  intro: 'Phong Tran · UX designer who codes',
  email: 'phong@phonghtran.com',
  phone: '612-481-4203',
  resumeUrl:
    'https://drive.google.com/file/d/1mV6YmcOtbtGZBgOERzwr5SmDBpGyNkNU/view?usp=sharing',
  linkedinUrl: 'https://www.linkedin.com/in/phonghtran/',
  githubUrl: 'https://github.com/phonghtran/',
  instagramUrl: 'https://www.instagram.com/phonghtran/',
  summary:
    'Phong Tran is a product design leader with 18 years across fintech, enterprise SaaS and agency work, taking products from pitch to release. He built Obviously’s design practice through its acquisition by VMLY&R/WPP, grew Fortune 500 accounts at Designit, and now leads delivery and AI prototyping for Fannie Mae’s Capital Markets pricing.',
} as const;

export type ContactKind =
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'github'
  | 'instagram'
  | 'resume';

export interface ContactLink {
  kind: ContactKind;
  title: string;
  value: string;
  /** Present for links; email and phone copy to the clipboard instead. */
  href?: string;
  /** What gets copied, and how a screen reader names it once copied. */
  copy?: { text: string; announce: string };
}

export const contactLinks: ContactLink[] = [
  {
    kind: 'email',
    title: 'Email',
    value: site.email,
    copy: { text: site.email, announce: 'Email address copied.' },
  },
  {
    kind: 'phone',
    title: 'Phone',
    value: site.phone,
    copy: { text: site.phone, announce: 'Phone number copied.' },
  },
  {
    kind: 'linkedin',
    title: 'LinkedIn',
    value: 'linkedin.com/in/phonghtran',
    href: site.linkedinUrl,
  },
  {
    kind: 'github',
    title: 'GitHub',
    value: 'github.com/phonghtran',
    href: site.githubUrl,
  },
  {
    kind: 'instagram',
    title: 'Instagram',
    value: '@phonghtran',
    href: site.instagramUrl,
  },
];

export const resumeLink: ContactLink = {
  kind: 'resume',
  title: 'Resume',
  value: 'PDF · Google Drive',
  href: site.resumeUrl,
};
