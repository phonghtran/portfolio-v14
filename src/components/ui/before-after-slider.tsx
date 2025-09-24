'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number; // 0-100 percentage
  autoPlay?: boolean;
  autoPlayDuration?: number; // in seconds
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'Before image',
  afterAlt = 'After image',
  className,
  initialPosition = 50,
  autoPlay = false,
  autoPlayDuration = 3,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Auto-play animation
  useEffect(() => {
    if (autoPlay && !isDragging && !isHovered) {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = (elapsed % (autoPlayDuration * 2)) / autoPlayDuration;

        // Ping-pong animation (0 -> 100 -> 0)
        const position = progress <= 1 ? progress * 100 : (2 - progress) * 100;

        setSliderPosition(Math.max(0, Math.min(100, position)));
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoPlay, autoPlayDuration, isDragging, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  // Global mouse events for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-video overflow-hidden rounded-lg bg-muted cursor-col-resize select-none',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* After Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Slider Line */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-opacity duration-200',
          'before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2',
          'before:w-8 before:h-8 before:bg-white before:rounded-full before:shadow-lg',
          'before:flex before:items-center before:justify-center',
          'after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2',
          'after:w-4 after:h-4 after:border-2 after:border-gray-400 after:rounded-full',
          isDragging && 'before:scale-110',
          !isDragging && isHovered && 'before:scale-105'
        )}
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />

      {/* Labels */}
      <div className="absolute top-4 left-4">
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
          Before
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
          After
        </div>
      </div>

      {/* Instructions */}
      {!isDragging && isHovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/70 text-white text-xs px-3 py-1 rounded animate-pulse">
            Drag to compare
          </div>
        </div>
      )}
    </div>
  );
}
