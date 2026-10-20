'use client';

import Image from 'next/image';
import { Bot, Hammer, Sparkles, Users, User, Home } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';
import {
  benchTools,
  featuredTools,
  type WorkshopArea,
  type WorkshopAudience,
  type WorkshopImage,
  type WorkshopTool,
} from '@/content/workshop';

const audienceIcon: Record<WorkshopAudience, typeof User> = {
  'For me': User,
  'For us two': Users,
  'For family': Home,
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

// Fixed 4:3 frame so cards line up. Phone captures are tall, so they show as a
// centred "peek" of the screen; device screens are shown whole in a bezel;
// desktop captures fill the frame.
function ToolImage({ image }: { image: WorkshopImage }) {
  const objectPosition = image.focus ?? '50% 0%';

  if (image.kind === 'phone') {
    return (
      <div className="relative aspect-[4/3] overflow-hidden border-b bg-muted">
        <div className="absolute inset-x-0 top-5 bottom-0 mx-auto w-[58%] overflow-hidden rounded-t-2xl border border-b-0 shadow-lg">
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
      <div className="relative aspect-[4/3] overflow-hidden border-b bg-muted flex items-center justify-center p-5">
        <div
          className="relative w-full rounded-md border-[6px] border-neutral-800 bg-white shadow-lg"
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
    <div className="relative aspect-[4/3] overflow-hidden border-b bg-muted">
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
  const AudienceIcon = audienceIcon[tool.audience];

  return (
    <article className="flex flex-col border bg-card text-card-foreground rounded-lg overflow-hidden">
      {tool.image && <ToolImage image={tool.image} />}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{tool.area}</p>
            <h3 className="text-xl">{tool.name}</h3>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap pt-1">
            <AudienceIcon className="h-3.5 w-3.5" />
            {tool.audience}
          </span>
        </header>

        <p>{tool.need}</p>

        <div className="border-l-2 border-primary pl-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Design decision
          </p>
          <p className="text-sm">{tool.decision}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          {(tool.builtWith || tool.runsOn) && (
            <div className="flex flex-wrap gap-2">
              {tool.builtWith && (
                <Badge variant="secondary" className="gap-1">
                  <Hammer className="h-3 w-3" />
                  Built with {tool.builtWith}
                </Badge>
              )}
              {tool.runsOn && (
                <Badge className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Runs on {tool.runsOn}
                </Badge>
              )}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {tool.stack.join(' · ')} · since {formatStarted(tool.started)}
          </p>
          {tool.usage && <p className="text-xs font-medium">{tool.usage}</p>}
        </div>
      </div>
    </article>
  );
}

export default function Workshop() {
  const { theme } = useTheme();
  const backgroundClasses = theme === 'glassy' ? 'bg-frosty' : '';

  const benchByArea = areaOrder
    .map(area => ({
      area,
      tools: benchTools.filter(tool => tool.area === area),
    }))
    .filter(group => group.tools.length > 0);

  return (
    <div className={cn('min-h-screen', backgroundClasses)}>
      <PageHeader title="phonghtran" />
      <main className="bg-textureThemed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
          {/* Intro */}
          <section className="border bg-card rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="text-3xl mb-3">Workshop</h2>
            <p className="text-lg max-w-3xl mb-6">
              Small tools I&rsquo;ve built for my own life. Each one started as
              something annoying at home, at the gym, or out the door, and I
              still use most of them. They aren&rsquo;t case studies, just the
              habit of noticing a need and shipping a fix.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              <div className="flex gap-3">
                <Hammer className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p className="text-sm">
                  <span className="font-semibold">Built with AI.</span> I write
                  the spec and prototype, direct a coding agent, and review what
                  it produces before I trust it.
                </p>
              </div>
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-1" />
                <p className="text-sm">
                  <span className="font-semibold">Runs on AI.</span> Some tools
                  use a model as a feature, which means deciding when it acts,
                  when it asks, and what it&rsquo;s allowed to cost.
                </p>
              </div>
            </div>
          </section>

          {/* Featured */}
          <section aria-labelledby="featured-heading" className="mb-10">
            <h2 id="featured-heading" className="sr-only">
              Featured tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Baby Timeline and Keepsake are real screens. The others use
              made-up data, since the real ones hold my family&rsquo;s details.
            </p>
          </section>

          {/* Bench */}
          <section className="border bg-card rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl mb-1">Also on the bench</h2>
            <p className="text-muted-foreground mb-6">
              Smaller builds, same habit.
            </p>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {benchByArea.map(({ area, tools }) => (
                <div key={area}>
                  <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">
                    {area}
                  </h3>
                  <ul className="space-y-3">
                    {tools.map(tool => (
                      <li key={tool.name} className="text-sm">
                        <span className="font-semibold">{tool.name}</span>
                        {tool.runsOn && (
                          <span className="inline-flex items-center gap-1 ml-2 text-xs text-primary">
                            <Bot className="h-3 w-3" />
                            {tool.runsOn}
                          </span>
                        )}
                        <span className="block text-muted-foreground">
                          {tool.line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
