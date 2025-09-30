'use client';

import { useEffect, useRef, Suspense, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import {
  Project,
  ProjectSection,
  getAudioTrackByProjectId,
} from '@/lib/projects-data';
import { cn } from '@/lib/utils';
import { Headphones, Calendar, Clock, User, Play, Pause } from 'lucide-react';
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
      className="scroll-m-20 py-8 border-b border-border last:border-b-0 mx-4"
    >
      <div className="mb-3">
        <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
      </div>

      <div className="mb-3">
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioTrack = getAudioTrackByProjectId(project.id);

  const toggleAudio = () => {
    if (!audioRef.current || !audioTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-load track when project changes
  useEffect(() => {
    if (audioTrack) {
      setCurrentTime(0);
      setIsPlaying(false);
      // Preload the new track
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
  }, [audioTrack?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, [audioTrack]);

  return (
    <div
      className={cn(
        'max-w-4xl mx-auto p-6 mb-[12rem] bg-card my-4  ',
        className
      )}
    >
      {/* Project Hero Section */}
      <div className="mb-12 ">
        {/* Audio Player - Always Visible */}
        {audioTrack && (
          <div className="mb-8 p-4 bg-chart-1    rounded-lg">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-background dark:text-blue-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h6 className="text-sm font-medium text-background ">
                    Audio: One-Minute Recap
                  </h6>

                  {audioTrack && isPlaying ? (
                    <p className="text-xs text-background mt-2">
                      Playing: {formatTime(currentTime)} /{' '}
                      {formatTime(audioTrack.duration)}
                    </p>
                  ) : (
                    <p className="text-sm text-background dark:text-blue-200 mt-1">
                      Listen to while you scroll
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={toggleAudio}
                variant="outline"
                size="sm"
                disabled={!audioTrack}
                className="bg-chart-2 text-background border-0 shrink-0 disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>

            {/* Audio element */}
            {audioTrack && (
              <audio
                ref={audioRef}
                src={audioTrack.audioUrl}
                preload="metadata"
              />
            )}
          </div>
        )}

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
      <div className=" p-6 bg-chart-1 text-background rounded-lg">
        <h2 className="text-2xl font-bold mb-4 ">Project Overview</h2>
        <p>{project.overview}</p>
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
