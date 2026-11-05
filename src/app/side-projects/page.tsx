import type { Metadata } from 'next';
import Image from 'next/image';
import { Hammer, Sparkles } from 'lucide-react';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { Tag } from '@/components/site/tag';
import {
  benchTools,
  featuredTools,
  type WorkshopArea,
  type WorkshopImage,
  type WorkshopTool,
} from '@/content/workshop';

export const metadata: Metadata = {
  title: 'Side projects · Phong Tran',
  description:
    'Small tools Phong Tran built for his own life, each with one design decision called out.',
};

const areaOrder: WorkshopArea[] = [
  'Family & home',
  'Training',
  'Everyday AI',
  'Ambient',
  'Music & data',
];

function formatStarted(started: string) {
  const [year, month] = started.split('-').map(Number);
  return new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

// Fixed 4:3 frame so cards line up. Phone captures show as a centred "peek" of
// the screen; device screens sit whole in a bezel; desktop captures fill it.
function ToolImage({ image }: { image: WorkshopImage }) {
  const objectPosition = image.focus ?? '50% 0%';

  if (image.kind === 'phone') {
    return (
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-media">
        <div className="absolute inset-x-0 bottom-0 top-5 mx-auto w-[58%] overflow-hidden rounded-t-2xl border border-b-0 border-strong shadow-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 220px, 60vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
      </div>
    );
  }

  if (image.kind === 'device') {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-border bg-media p-5">
        <div
          className="relative w-full rounded-md border-[6px] border-[hsl(var(--ink-900))] bg-[hsl(var(--white))] shadow-lg"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 380px, 90vw"
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-media">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

function ToolCard({ tool }: { tool: WorkshopTool }) {
  return (
    <article
      id={tool.id}
      className="flex scroll-mt-8 flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {tool.image && <ToolImage image={tool.image} />}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-caption text-secondary">{tool.area}</p>
            <h2 className="text-h3">{tool.name}</h2>
          </div>
          <span className="whitespace-nowrap pt-0.5 text-label-sm text-secondary">
            {tool.audience}
          </span>
        </header>

        <p className="text-base text-body">{tool.need}</p>

        <div className="border-l-2 border-coral-solid pl-3">
          <p className="mb-1 text-overline uppercase text-secondary">
            Design decision
          </p>
          <p className="text-body-sm text-body">{tool.decision}</p>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          {(tool.builtWith || tool.runsOn) && (
            <div className="flex flex-wrap gap-2">
              {tool.builtWith && <Tag>Built with {tool.builtWith}</Tag>}
              {tool.runsOn && <Tag tone="coral">Runs on {tool.runsOn}</Tag>}
            </div>
          )}
          <p className="text-caption text-secondary">
            {tool.stack.join(' · ')} · since {formatStarted(tool.started)}
          </p>
          {tool.usage && (
            <p className="text-label-sm text-body">{tool.usage}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SideProjects() {
  const benchByArea = areaOrder
    .map(area => ({
      area,
      tools: benchTools.filter(tool => tool.area === area),
    }))
    .filter(group => group.tools.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="px-4 md:px-10 lg:px-[120px]">
        <header className="flex flex-col gap-4 pb-8 pt-10 md:gap-6 md:pb-12 md:pt-[72px]">
          <h1 className="text-h1 md:text-display">Side projects</h1>
          <p className="max-w-[720px] text-body-lg text-body">
            Small tools I&rsquo;ve built for my own life. Each one started as
            something annoying at home, at the gym, or out the door, and I still
            use most of them. They aren&rsquo;t case studies, just the habit of
            noticing a need and shipping a fix.
          </p>
          <div className="grid max-w-[800px] gap-4 pt-2 md:grid-cols-2 md:gap-8">
            <div className="flex gap-3">
              <Hammer
                className="mt-0.5 h-5 w-5 shrink-0 text-coral-solid"
                aria-hidden
              />
              <p className="text-body-sm text-body">
                <span className="font-semibold text-primary">
                  Built with AI.
                </span>{' '}
                I write the spec and prototype, direct a coding agent, and
                review what it produces before I trust it.
              </p>
            </div>
            <div className="flex gap-3">
              <Sparkles
                className="mt-0.5 h-5 w-5 shrink-0 text-coral-solid"
                aria-hidden
              />
              <p className="text-body-sm text-body">
                <span className="font-semibold text-primary">Runs on AI.</span>{' '}
                Some tools use a model as a feature, which means deciding when
                it acts, when it asks, and what it&rsquo;s allowed to cost.
              </p>
            </div>
          </div>
        </header>

        <section aria-label="Featured side projects" className="pb-10 md:pb-16">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <p className="mt-3 text-caption text-secondary">
            Baby Timeline and Keepsake are real screens. The others use made-up
            data, since the real ones hold my family&rsquo;s details.
          </p>
        </section>

        <section className="mb-16 rounded-2xl border border-border bg-surface px-5 py-6 md:mb-28 md:p-10">
          <h2 className="text-h2">Also on the bench</h2>
          <p className="mt-1 text-base text-secondary">
            Smaller builds, same habit.
          </p>
          <div className="mt-6 grid gap-x-16 gap-y-8 md:mt-8 md:grid-cols-2">
            {benchByArea.map(({ area, tools }) => (
              <div key={area}>
                <h3 className="mb-3 text-overline uppercase text-coral-text">
                  {area}
                </h3>
                <ul className="flex flex-col gap-3">
                  {tools.map(tool => (
                    <li key={tool.name}>
                      <span className="flex items-center gap-2">
                        <span className="text-label text-primary">
                          {tool.name}
                        </span>
                        {tool.runsOn && (
                          <Tag tone="coral">Runs on {tool.runsOn}</Tag>
                        )}
                      </span>
                      <span className="block text-body-sm text-secondary">
                        {tool.line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
