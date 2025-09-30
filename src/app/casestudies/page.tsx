'use client';

import { PageHeader } from '@/components/layout/page-header';
import { ProjectNavigation } from '@/components/navigation/project-navigation';
import { ProjectContent } from '@/components/projects/project-content';
import {
  AudioNavigationProvider,
  useAudioNavigation,
} from '@/contexts/audio-navigation-context';

function WorkContent() {
  const {
    projects,
    currentProject,
    currentProjectId,
    currentSectionId,
    setCurrentProject,
    setCurrentSection,
  } = useAudioNavigation();

  const handleSectionInView = (sectionId: string) => {
    if (currentProjectId && sectionId !== currentSectionId) {
      setCurrentSection(currentProjectId, sectionId);
    }
  };

  const handleSectionNavigate = (projectId: string, sectionId: string) => {
    setCurrentSection(projectId, sectionId);
    // Auto-scroll to section
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  if (!currentProject) {
    return (
      <div className="flex-1 flex items-center justify-center ">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Project Selected</h2>
          <p className="text-muted-foreground">
            Select a project from the navigation to view its case study.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Project Navigation Sidebar - Fixed positioned outside of main flow */}
      <ProjectNavigation
        projects={projects}
        currentProjectId={currentProjectId || undefined}
        currentSectionId={currentSectionId || undefined}
        onProjectSelect={setCurrentProject}
        onSectionSelect={handleSectionNavigate}
        className="shrink-0"
      />

      {/* Main Content Area */}
      <div className="min-w-0 mt-28 lg:mt-0 lg:ml-[21rem] lg:mr-4">
        <main className=" ">
          <ProjectContent
            project={currentProject}
            currentSectionId={currentSectionId || undefined}
            onSectionInView={handleSectionInView}
          />
        </main>
      </div>
    </>
  );
}

export default function Work() {
  return (
    <div className="bg-textureThemed">
      <PageHeader title="phonghtran" />
      <div className="">
        <AudioNavigationProvider>
          <WorkContent />
        </AudioNavigationProvider>
      </div>
    </div>
  );
}
