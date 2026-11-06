'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useAnalytics } from '@/hooks/use-analytics';
import type { AudioTrack } from '@/lib/projects-data';

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/** One-minute narrated recap. Case studies without a recording skip it. */
export function AudioRecap({ track }: { track: AudioTrack }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const analytics = useAnalytics();

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
    };
  }, []);

  const toggle = () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      analytics.trackAudioPause(track.projectId, track.audioUrl);
    } else {
      el.play();
      analytics.trackAudioPlay(track.projectId, track.audioUrl);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-xl bg-coral-subtle py-4 pl-4 pr-5">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause recap' : 'Play recap'}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-solid text-[hsl(var(--white))] transition-colors hover:bg-coral-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" aria-hidden />
        ) : (
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden />
        )}
      </button>
      <div>
        <p className="text-label text-primary">One-minute recap</p>
        <p className="text-body-sm text-secondary">
          {playing
            ? `Playing · ${formatTime(time)} / ${formatTime(track.duration)}`
            : `Listen while you scroll · ${formatTime(track.duration)}`}
        </p>
      </div>
      <audio ref={audio} src={track.audioUrl} preload="metadata" />
    </div>
  );
}
