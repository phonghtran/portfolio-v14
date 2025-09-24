'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Project, AudioTrack } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

interface ProjectNavigationProps {
  projects: Project[];
  currentProjectId?: string;
  currentSectionId?: string;
  currentAudioTrackId?: string;
  isPlaying?: boolean;
  onProjectSelect?: (projectId: string) => void;
  onSectionSelect?: (projectId: string, sectionId: string) => void;
  onAudioTrackSelect?: (trackId: string) => void;
  className?: string;
}

export function ProjectNavigation({
  projects,
  currentProjectId,
  currentSectionId,
  currentAudioTrackId,
  isPlaying,
  onProjectSelect,
  onSectionSelect,
  onAudioTrackSelect,
  className,
}: ProjectNavigationProps) {
  const [openProjects, setOpenProjects] = useState<string[]>([
    currentProjectId || projects[0]?.id,
  ]);

  const toggleProject = (projectId: string) => {
    setOpenProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSectionClick = (
    projectId: string,
    sectionId: string,
    audioTrackId?: string
  ) => {
    onSectionSelect?.(projectId, sectionId);
    if (audioTrackId) {
      onAudioTrackSelect?.(audioTrackId);
    }
  };

  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      'ux-design':
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      development:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      technologist:
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
    <nav
      className={cn(
        'bg-card border-r border-border overflow-y-auto overflow-x-hidden',
        'w-80 flex flex-col',
        className
      )}
    >
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Case Studies</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select a project to explore the design process
        </p>
      </div>

      <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden">
        {projects.map(project => {
          const isProjectOpen = openProjects.includes(project.id);
          const isCurrentProject = currentProjectId === project.id;

          return (
            <Collapsible
              key={project.id}
              open={isProjectOpen}
              onOpenChange={() => toggleProject(project.id)}
              className="mb-2"
            >
              <CollapsibleTrigger asChild>
                <div
                  className={cn(
                    'w-full justify-between p-3 h-auto flex hover:cursor-pointer rounded-md transition-colors',
                    isCurrentProject
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => onProjectSelect?.(project.id)}
                >
                  <div className="text-left flex-1 w-min-0">
                    <div className="mb-0">
                      <span className="font-medium text-sm flex items-center ">
                        <Target className="h-4 w-4 text-primary mr-2" />
                        {project.title}
                      </span>
                    </div>
                  </div>
                  {isProjectOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-2 mt-1 space-y-1">
                {project.sections.map(section => {
                  const audioTrackId = `${project.id}-${section.id}`;
                  const isCurrentSection =
                    currentSectionId === section.id && isCurrentProject;
                  const isCurrentAudio = currentAudioTrackId === audioTrackId;
                  const hasAudio = !!section.audioTrack;

                  return (
                    <Button
                      key={section.id}
                      variant={isCurrentSection ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2"
                      onClick={() =>
                        handleSectionClick(
                          project.id,
                          section.id,
                          hasAudio ? audioTrackId : undefined
                        )
                      }
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span
                          className={cn(
                            'text-left flex-1',
                            isCurrentSection && 'font-medium'
                          )}
                        >
                          {section.title}
                        </span>
                        {section.duration && (
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(section.duration / 60)}:
                            {String(section.duration % 60).padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      <div className="px-4 py-[1.62rem] border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          {projects.length} projects •{' '}
          {projects.reduce((acc, p) => acc + p.sections.length, 0)} sections
        </div>
      </div>
    </nav>
  );
}
