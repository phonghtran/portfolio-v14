import { projects } from '@/lib/projects-data';
import { featuredTools } from '@/content/workshop';
import { contactLinks, resumeLink, type ContactLink } from '@/lib/site';

/**
 * The homepage "Contents" list. The assistant can only reorder the case
 * studies and side projects (the rankable items); resume and contact rows keep
 * their place.
 */
export type ContentsKind = 'resume' | 'case-study' | 'side-project' | 'contact';

export interface ContentsItem {
  id: string;
  kind: ContentsKind;
  title: string;
  subtitle: string;
  meta?: string;
  href?: string;
  external?: boolean;
  thumbnail?: string;
  /** Password-protected case study (ongoing work). */
  locked?: boolean;
  contact?: ContactLink;
}

export const resumeItem: ContentsItem = {
  id: 'resume',
  kind: 'resume',
  title: 'Resume',
  subtitle: 'Experience, skills and education on one page.',
  meta: resumeLink.value,
  href: resumeLink.href,
  external: true,
};

export const caseStudyItems: ContentsItem[] = projects.map(p => ({
  id: p.id,
  kind: 'case-study',
  title: p.title,
  subtitle: p.subtitle,
  meta: [p.client, p.year].filter(Boolean).join(' · '),
  href: `/casestudies/${p.id}`,
  thumbnail: p.heroImage,
  locked: Boolean(p.password),
}));

export const sideProjectItems: ContentsItem[] = featuredTools.map(t => ({
  id: t.id,
  kind: 'side-project',
  title: t.name,
  subtitle: t.tagline,
  meta: [t.stack[0], t.runsOn].filter(Boolean).join(', '),
  href: `/side-projects#${t.id}`,
  thumbnail: t.image?.src,
}));

// The homepage lists the four ways to reach Phong directly; Instagram lives in
// the Contact popover only.
export const contactItems: ContentsItem[] = contactLinks
  .filter(c => c.kind !== 'instagram')
  .map(c => ({
    id: `contact-${c.kind}`,
    kind: 'contact',
    title: c.title,
    subtitle: c.value,
    href: c.kind === 'email' ? `mailto:${c.value}` : c.href,
    external: c.kind !== 'phone',
    contact: c,
  }));

/** Everything the assistant may move to the top. */
export const rankableItems: ContentsItem[] = [
  ...caseStudyItems,
  ...sideProjectItems,
];

export const rankableIds = new Set(rankableItems.map(i => i.id));
