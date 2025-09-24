'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AudioTrack } from '@/lib/projects-data';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  tracks: AudioTrack[];
  currentTrackId?: string;
  onTrackChange?: (trackId: string) => void;
  onSectionNavigate?: (projectId: string, sectionId: string) => void;
  className?: string;
}

export function AudioPlayer({
  tracks,
  currentTrackId,
  onTrackChange,
  onSectionNavigate,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks.find(track => track.id === currentTrackId);
  const currentIndex = tracks.findIndex(track => track.id === currentTrackId);

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Load and play audio track
  const loadTrack = useCallback(async (track: AudioTrack) => {
    if (!audioRef.current) return;

    setIsLoading(true);
    audioRef.current.src = track.audioUrl;

    try {
      await audioRef.current.load();
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading audio track:', error);
      setIsLoading(false);
    }
  }, []);

  // Play/pause functionality
  const togglePlayPause = async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Skip to previous track
  const skipToPrevious = () => {
    if (currentIndex > 0) {
      const previousTrack = tracks[currentIndex - 1];
      onTrackChange?.(previousTrack.id);
      onSectionNavigate?.(previousTrack.projectId, previousTrack.sectionId);
    }
  };

  // Skip to next track
  const skipToNext = () => {
    if (currentIndex < tracks.length - 1) {
      const nextTrack = tracks[currentIndex + 1];
      onTrackChange?.(nextTrack.id);
      onSectionNavigate?.(nextTrack.projectId, nextTrack.sectionId);
    }
  };

  // Seek to specific time
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  // Volume control
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Load new track when currentTrackId changes
  useEffect(() => {
    if (currentTrack) {
      loadTrack(currentTrack);
    }
  }, [currentTrack, loadTrack]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-play next track if available
      if (currentIndex < tracks.length - 1) {
        skipToNext();
      }
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentIndex, tracks.length, skipToNext]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-card border-t shadow-lg p-4 flex items-center gap-4',
        'sticky bottom-0 z-50 backdrop-blur-sm bg-card/95',
        className
      )}
    >
      <audio ref={audioRef} preload="metadata" />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{currentTrack.title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={skipToPrevious}
          disabled={currentIndex === 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={togglePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={skipToNext}
          disabled={currentIndex === tracks.length - 1}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 max-w-md">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSeek}
          className="w-full"
        />
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 min-w-0">
        <Button variant="ghost" size="sm" onClick={toggleMute}>
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.1}
          onValueChange={handleVolumeChange}
          className="w-20"
        />
      </div>
    </div>
  );
}
