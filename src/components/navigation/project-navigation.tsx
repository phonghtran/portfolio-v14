'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project, AudioTrack } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

interface ProjectNavigationProps {
  projects: Project[];
  currentProjectId?: string;
  currentSectionId?: string;
  onProjectSelect?: (projectId: string) => void;
  onSectionSelect?: (projectId: string, sectionId: string) => void;
  className?: string;
}

export function ProjectNavigation({
  projects,
  currentProjectId,
  currentSectionId,
  onProjectSelect,
  onSectionSelect,
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

  const handleSectionClick = (projectId: string, sectionId: string) => {
    onSectionSelect?.(projectId, sectionId);
  };

  const currentProject = projects.find(p => p.id === currentProjectId);
  const currentSection = currentProject?.sections.find(
    s => s.id === currentSectionId
  );

  const handleProjectChange = (projectId: string) => {
    onProjectSelect?.(projectId);
    // Only auto-select first section on desktop (lg screens and up)
    // On mobile, just load the project without scrolling to sections
    if (window.innerWidth >= 1024) {
      const project = projects.find(p => p.id === projectId);
      if (project?.sections.length) {
        onSectionSelect?.(projectId, project.sections[0].id);
      }
    }
  };

  const handleSectionChange = (sectionValue: string) => {
    const [projectId, sectionId] = sectionValue.split('.');
    const project = projects.find(p => p.id === projectId);
    const section = project?.sections.find(s => s.id === sectionId);

    if (project && section) {
      onSectionSelect?.(projectId, sectionId);
    }
  };

  // Mobile dropdown view
  const MobileNavigation = () => (
    <div className="lg:hidden p-4 bg-card border-b border-border">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Case Studies</label>
          <Select
            value={currentProjectId || ''}
            onValueChange={handleProjectChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a project">
                {currentProject ? (
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="truncate">{currentProject.title}</span>
                  </div>
                ) : (
                  'Select a project'
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{project.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  // Desktop sidebar view
  const DesktopNavigation = () => (
    <nav
      className={cn(
        'hidden lg:flex bg-card border-r border-border overflow-y-auto overflow-x-hidden',
        'w-80 flex-col',
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
                  const isCurrentSection =
                    currentSectionId === section.id && isCurrentProject;

                  return (
                    <Button
                      key={section.id}
                      variant={isCurrentSection ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start text-xs h-auto p-2"
                      onClick={() => handleSectionClick(project.id, section.id)}
                    >
                      <span
                        className={cn(
                          'text-left flex-1',
                          isCurrentSection && 'font-medium'
                        )}
                      >
                        {section.title}
                      </span>
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

  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
}
