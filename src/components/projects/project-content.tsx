'use client';

import { useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project, ProjectSection } from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import { ExternalLink, Calendar, Clock, User } from 'lucide-react';
import { loadContentComponent } from '@/lib/content-loader';

interface ProjectContentProps {
  project: Project;
  currentSectionId?: string;
  onSectionInView?: (sectionId: string) => void;
  className?: string;
}

interface SectionContentProps {
  section: ProjectSection;
  projectId: string;
  isActive?: boolean;
  onInView?: (sectionId: string) => void;
}

interface DynamicContentRendererProps {
  contentFile: string;
}

function DynamicContentRenderer({ contentFile }: DynamicContentRendererProps) {
  const ContentComponent = loadContentComponent(contentFile);

  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      }
    >
      <ContentComponent />
    </Suspense>
  );
}

function SectionContent({
  section,
  projectId,
  isActive,
  onInView,
}: SectionContentProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !onInView) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onInView(section.id);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [section.id, onInView]);

  return (
    <section
      ref={sectionRef}
      id={`section-${section.id}`}
      className={cn(
        'scroll-m-20 py-8 border-b border-border last:border-b-0',
        isActive && 'bg-accent/20 -mx-6 px-6 rounded-lg'
      )}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
        {section.duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            <span>{Math.floor(section.duration / 60)} min narration</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <DynamicContentRenderer contentFile={section.contentFile} />
      </div>
    </section>
  );
}

export function ProjectContent({
  project,
  currentSectionId,
  onSectionInView,
  className,
}: ProjectContentProps) {
  return (
    <div className={cn('max-w-4xl mx-auto p-6', className)}>
      {/* Project Hero Section */}
      <div className="mb-12">
        {project.heroImage && (
          <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-8 bg-muted">
            <Image
              src={project.heroImage}
              alt={`${project.title} hero image`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Cp/Z"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            {project.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.subtitle}</p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{project.year}</span>
            </div>
            {project.client && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{project.client}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="mb-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p>{project.overview}</p>
      </div>

      {/* Audio Navigation Notice */}
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Audio-Guided Experience Available
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              Use the navigation panel to play audio narrations for each
              section. The content will automatically scroll as you listen.
            </p>
          </div>
        </div>
      </div>

      {/* Project Sections */}
      <div className="space-y-0">
        {project.sections.map(section => (
          <SectionContent
            key={section.id}
            section={section}
            projectId={project.id}
            isActive={currentSectionId === section.id}
            onInView={onSectionInView}
          />
        ))}
      </div>
    </div>
  );
}
