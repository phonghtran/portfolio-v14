'use client';

import { PageHeader } from '@/components/layout/page-header';
import { ProjectNavigation } from '@/components/navigation/project-navigation';
import { ProjectContent } from '@/components/projects/project-content';
import { AudioPlayer } from '@/components/audio/audio-player';
import {
  AudioNavigationProvider,
  useAudioNavigation,
} from '@/contexts/audio-navigation-context';

function WorkContent() {
  const {
    projects,
    audioTracks,
    currentProject,
    currentProjectId,
    currentSectionId,
    currentAudioTrackId,
    isPlaying,
    setCurrentProject,
    setCurrentSection,
    setCurrentAudioTrack,
    setIsPlaying,
  } = useAudioNavigation();

  const handleSectionInView = (sectionId: string) => {
    if (currentProjectId && sectionId !== currentSectionId) {
      setCurrentSection(currentProjectId, sectionId);
    }
  };

  const handleAudioTrackChange = (trackId: string) => {
    setCurrentAudioTrack(trackId);
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
      <div className="flex-1 flex items-center justify-center">
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
    <div className="flex-1 flex overflow-y-hidden">
      {/* Project Navigation Sidebar */}
      <ProjectNavigation
        projects={projects}
        currentProjectId={currentProjectId || undefined}
        currentSectionId={currentSectionId || undefined}
        currentAudioTrackId={currentAudioTrackId || undefined}
        isPlaying={isPlaying}
        onProjectSelect={setCurrentProject}
        onSectionSelect={setCurrentSection}
        onAudioTrackSelect={setCurrentAudioTrack}
        className="shrink-0"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <ProjectContent
            project={currentProject}
            currentSectionId={currentSectionId || undefined}
            onSectionInView={handleSectionInView}
          />
        </main>

        {/* Persistent Audio Player */}
        {currentAudioTrackId && (
          <AudioPlayer
            tracks={audioTracks}
            currentTrackId={currentAudioTrackId}
            onTrackChange={handleAudioTrackChange}
            onSectionNavigate={handleSectionNavigate}
          />
        )}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Case Studies - phonghtran" />
      <AudioNavigationProvider>
        <WorkContent />
      </AudioNavigationProvider>
    </div>
  );
}
