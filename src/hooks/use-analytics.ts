import { event } from '@/components/analytics/google-analytics';

// Custom hook for tracking portfolio-specific events
export const useAnalytics = () => {
  // Track project views
  const trackProjectView = (projectId: string, projectTitle: string) => {
    event({
      action: 'view_project',
      category: 'Portfolio',
      label: `${projectId}: ${projectTitle}`,
    });
  };

  // Track audio interactions
  const trackAudioPlay = (projectId: string, audioFile: string) => {
    event({
      action: 'play_audio',
      category: 'Audio',
      label: `${projectId}: ${audioFile}`,
    });
  };

  const trackAudioPause = (projectId: string, audioFile: string) => {
    event({
      action: 'pause_audio',
      category: 'Audio',
      label: `${projectId}: ${audioFile}`,
    });
  };

  // Track chat interactions
  const trackChatMessage = (messageCount: number) => {
    event({
      action: 'send_message',
      category: 'AI Chat',
      label: 'User Message',
      value: messageCount,
    });
  };

  const trackChatRateLimit = (remainingMessages: number) => {
    event({
      action: 'rate_limit_hit',
      category: 'AI Chat',
      label: 'Rate Limit Reached',
      value: remainingMessages,
    });
  };

  // Track navigation
  const trackSectionOpen = (sectionId: string) => {
    event({
      action: 'open_section',
      category: 'Navigation',
      label: sectionId,
    });
  };

  const trackSectionClose = (sectionId: string) => {
    event({
      action: 'close_section',
      category: 'Navigation',
      label: sectionId,
    });
  };

  // Track theme changes
  const trackThemeChange = (theme: string) => {
    event({
      action: 'change_theme',
      category: 'UI',
      label: theme,
    });
  };

  // Track contact interactions
  const trackContactView = () => {
    event({
      action: 'view_contact',
      category: 'Contact',
      label: 'Contact Page View',
    });
  };

  // Track external link clicks
  const trackExternalLink = (url: string, linkText: string) => {
    event({
      action: 'click_external_link',
      category: 'Engagement',
      label: `${linkText}: ${url}`,
    });
  };

  return {
    trackProjectView,
    trackAudioPlay,
    trackAudioPause,
    trackChatMessage,
    trackChatRateLimit,
    trackSectionOpen,
    trackSectionClose,
    trackThemeChange,
    trackContactView,
    trackExternalLink,
  };
};
