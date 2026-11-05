'use client';

import { Suspense, useEffect } from 'react';
import Image from 'next/image';
import { ContentsRow } from '@/components/home/contents-row';
import {
  PasswordGate,
  useProjectUnlock,
} from '@/components/projects/password-gate';
import { useContactPanel } from '@/components/site/contact-panel';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { Tag, tagToneCycle } from '@/components/site/tag';
import { useAnalytics } from '@/hooks/use-analytics';
import { caseStudyItems } from '@/lib/contents';
import { loadContentComponent } from '@/lib/content-loader';
import {
  getAudioTrackByProjectId,
  projects,
  type ProjectSection,
} from '@/lib/projects-data';
import { AudioRecap } from './audio-recap';
import { CaseStudySwitcher } from './case-study-switcher';
import { GalleryLightbox } from './gallery-lightbox';

const pad = (n: number) => String(n).padStart(2, '0');

export function CaseStudyView({ index }: { index: number }) {
  const project = projects[index];
  const { unlocked, unlock } = useProjectUnlock(project.id, project.password);
  const { openContact } = useContactPanel();
  const analytics = useAnalytics();
  const track = getAudioTrackByProjectId(project.id);
  const nextIndex = (index + 1) % projects.length;
  const meta = [project.year, project.client, project.duration, project.role]
    .filter(Boolean)
    .join('  ·  ');

  useEffect(() => {
    analytics.trackProjectView(project.id, project.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  return (
    <>
      <SiteHeader />

      {/* The switcher is the only sticky band on the page. */}
      <div className="sticky top-0 z-30 border-b border-border bg-page/95 px-4 py-4 backdrop-blur md:px-[120px] md:py-6">
        <CaseStudySwitcher index={index} />
      </div>

      <main className="px-4 pb-16 pt-8 md:px-10 md:pb-28 md:pt-16">
        <article className="mx-auto flex max-w-[800px] flex-col gap-8 md:gap-12">
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag, i) => (
                <Tag key={tag} tone={tagToneCycle[i % tagToneCycle.length]}>
                  {tag}
                </Tag>
              ))}
            </div>
            <h1 className="text-h2 md:text-h1">{project.title}</h1>
            <p className="text-body-lg text-secondary">{project.subtitle}</p>
            <p className="whitespace-pre-wrap text-label text-secondary">
              {meta}
            </p>
          </header>

          {!unlocked && project.password ? (
            <PasswordGate
              password={project.password}
              onUnlock={unlock}
              onAskForAccess={openContact}
            />
          ) : (
            <>
              <Chapters sections={project.sections} />
              {track && <AudioRecap track={track} />}
              {project.heroImage && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-media">
                  <Image
                    src={project.heroImage}
                    alt={`${project.title} hero image`}
                    fill
                    priority
                    sizes="(max-width: 840px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-overline uppercase text-coral-text">
                  Overview
                </p>
                <p className="mt-3 text-body-lg text-body">
                  {project.overview}
                </p>
              </div>
              {project.sections.map((section, i) => (
                <Chapter key={section.id} section={section} number={i + 1} />
              ))}
            </>
          )}

          <div className="flex flex-col gap-2">
            <p className="text-overline uppercase text-secondary">
              {nextIndex === 0 ? 'Back to the first case study' : 'Up next'}
            </p>
            <ContentsRow
              item={caseStudyItems[nextIndex]}
              number={nextIndex + 1}
            />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

/** Anchor links to each chapter. No active or sticky state. */
function Chapters({ sections }: { sections: ProjectSection[] }) {
  return (
    <nav aria-labelledby="chapters-heading" className="flex flex-col gap-3">
      <h2
        id="chapters-heading"
        className="text-overline uppercase text-secondary"
      >
        Chapters
      </h2>
      <ol className="flex w-full flex-col md:w-[400px]">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#section-${s.id}`}
              className="group flex items-center gap-3 rounded-r-lg border-l-2 border-coral-solid bg-coral-subtle px-4 py-2.5 no-underline transition-colors hover:border-coral-strong hover:bg-coral-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-overline text-coral-text">
                {pad(i + 1)}
              </span>
              <span className="text-label text-primary group-hover:underline">
                {s.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Chapter({
  section,
  number,
}: {
  section: ProjectSection;
  number: number;
}) {
  const Content = loadContentComponent(section.contentFile);
  return (
    <section id={`section-${section.id}`} className="flex flex-col gap-5">
      <div>
        <p className="text-overline text-coral-text">{pad(number)}</p>
        <h2 className="text-h2">{section.title}</h2>
      </div>
      <GalleryLightbox>
        <div className="case-copy">
          <Suspense
            fallback={
              <div className="h-24 animate-pulse rounded-lg bg-subtle" />
            }
          >
            <Content />
          </Suspense>
        </div>
      </GalleryLightbox>
    </section>
  );
}
