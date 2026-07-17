'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import {
  projects,
  audioTracks,
  AudioTrack,
  Project,
} from '@/lib/projects-data';

interface AudioNavigationState {
  currentProjectId: string | null;
  currentSectionId: string | null;
  currentAudioTrackId: string | null;
  isPlaying: boolean;
}

interface AudioNavigationContextValue extends AudioNavigationState {
  // Project navigation
  setCurrentProject: (projectId: string) => void;
  setCurrentSection: (projectId: string, sectionId: string) => void;

  // Audio controls
  setCurrentAudioTrack: (trackId: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;

  // Auto-scroll functionality
  scrollToSection: (projectId: string, sectionId: string) => void;

  // Data
  projects: Project[];
  audioTracks: AudioTrack[];
  currentProject: Project | null;
}

const AudioNavigationContext =
  createContext<AudioNavigationContextValue | null>(null);

export function useAudioNavigation() {
  const context = useContext(AudioNavigationContext);
  if (!context) {
    throw new Error(
      'useAudioNavigation must be used within AudioNavigationProvider'
    );
  }
  return context;
}

interface AudioNavigationProviderProps {
  children: React.ReactNode;
  initialProjectId?: string;
}

export function AudioNavigationProvider({
  children,
  initialProjectId,
}: AudioNavigationProviderProps) {
  const [state, setState] = useState<AudioNavigationState>({
    currentProjectId: initialProjectId || projects[0]?.id || null,
    currentSectionId: null,
    currentAudioTrackId: null,
    isPlaying: false,
  });

  const currentProject = state.currentProjectId
    ? projects.find(p => p.id === state.currentProjectId) || null
    : null;

  const setCurrentProject = useCallback((projectId: string) => {
    setState(prev => ({
      ...prev,
      currentProjectId: projectId,
      currentSectionId: null,
      currentAudioTrackId: null,
      isPlaying: false,
    }));
  }, []);

  const setCurrentSection = useCallback(
    (projectId: string, sectionId: string) => {
      setState(prev => ({
        ...prev,
        currentProjectId: projectId,
        currentSectionId: sectionId,
      }));
    },
    []
  );

  const setCurrentAudioTrack = useCallback((trackId: string) => {
    const track = audioTracks.find(t => t.id === trackId);
    if (track) {
      setState(prev => ({
        ...prev,
        currentProjectId: track.projectId,
        // Tracks are per-project (no section mapping), so clear the section.
        currentSectionId: null,
        currentAudioTrackId: trackId,
        isPlaying: true,
      }));
    }
  }, []);

  const setIsPlaying = useCallback((isPlaying: boolean) => {
    setState(prev => ({ ...prev, isPlaying }));
  }, []);

  const scrollToSection = useCallback(
    (projectId: string, sectionId: string) => {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }, 100);
    },
    []
  );

  const contextValue: AudioNavigationContextValue = {
    ...state,
    setCurrentProject,
    setCurrentSection,
    setCurrentAudioTrack,
    setIsPlaying,
    scrollToSection,
    projects,
    audioTracks,
    currentProject,
  };

  return (
    <AudioNavigationContext.Provider value={contextValue}>
      {children}
    </AudioNavigationContext.Provider>
  );
}
