'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Project, ProjectSection } from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import { ExternalLink, Calendar, Clock, User } from 'lucide-react';

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

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <p className="text-lg leading-relaxed">{section.content}</p>
      </div>

      {section.images && section.images.length > 0 && (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Visual Documentation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.images.map((imagePath, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-muted">
                    <Image
                      src={imagePath}
                      alt={`${section.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Cp/Z"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function ProjectContent({
  project,
  currentSectionId,
  onSectionInView,
  className,
}: ProjectContentProps) {
  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      'ux-design':
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      development:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      branding:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      research:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return (
      colors[category] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    );
  };

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
            <Badge
              variant="secondary"
              className={cn('text-sm', getCategoryColor(project.category))}
            >
              {project.category.replace('-', ' ')}
            </Badge>
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
        <p className="text-lg leading-relaxed">{project.overview}</p>
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

      {/* Project Summary */}
      <div className="mt-16 p-6 bg-card border rounded-lg">
        <h3 className="text-xl font-bold mb-4">Project Impact & Learnings</h3>
        <p className="text-muted-foreground leading-relaxed">
          This case study demonstrates the comprehensive design and development
          process, from initial research through final implementation. Each
          section includes detailed documentation and insights gained throughout
          the project timeline.
        </p>
      </div>
    </div>
  );
}
