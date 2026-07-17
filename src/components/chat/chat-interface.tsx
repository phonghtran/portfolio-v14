'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { SendHorizontal, Bot, User, LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/use-analytics';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/contexts/theme-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Function to preprocess AI content for better paragraph rendering
const preprocessAIContent = (content: string): string => {
  // Split on sentences ending with colons followed by text (like "Strategic Discovery & Facilitation: He excels...")

  const processedContent = content
    // First, handle section headers (text ending with colon followed by space)
    .replace(
      /([^.!?:]\s*):(\s*)([A-Z])/g,
      (match, beforeColon, spaces, afterColon) => {
        return `**${beforeColon.trim()}:**\n\n${afterColon}`;
      }
    )
    // Add double line breaks before sentences that start with capital letters after periods
    .replace(/(\.)(\s+)([A-Z][^A-Z])/g, '$1\n\n$3')
    // Clean up any triple+ line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Trim whitespace
    .trim();

  return processedContent;
};

// Rate limiting configuration
const MAX_MESSAGES_PER_SESSION = 16;
const COOLDOWN_DURATION_MS = 3000; // 3 seconds between messages
const SESSION_RESET_HOURS = 24; // Reset limits every 24 hours

interface RateLimitState {
  messageCount: number;
  lastMessageTime: number;
  sessionStartTime: number;
}

export default function ChatInterface() {
  const { theme } = useTheme();
  const backgroundClasses = theme === 'glassy' ? 'bg-frosty' : 'bg-card';

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm Phong's AI assistant. What would you like to know about him and his work?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>({
    messageCount: 0,
    lastMessageTime: 0,
    sessionStartTime: Date.now(),
  });
  const { toast } = useToast();
  const analytics = useAnalytics();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load rate limit state from session storage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('chatRateLimit');
    if (savedState) {
      try {
        const parsed: RateLimitState = JSON.parse(savedState);
        const now = Date.now();
        const sessionAge = now - parsed.sessionStartTime;

        // Reset if session is older than the configured hours
        if (sessionAge > SESSION_RESET_HOURS * 60 * 60 * 1000) {
          const newState: RateLimitState = {
            messageCount: 0,
            lastMessageTime: 0,
            sessionStartTime: now,
          };
          setRateLimitState(newState);
          sessionStorage.setItem('chatRateLimit', JSON.stringify(newState));
        } else {
          setRateLimitState(parsed);
        }
      } catch (error) {
        console.error('Error loading rate limit state:', error);
      }
    }
  }, []);

  // Save rate limit state to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('chatRateLimit', JSON.stringify(rateLimitState));
  }, [rateLimitState]);

  const scrollToEnd = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  // Check if user can send a message
  const canSendMessage = (): {
    allowed: boolean;
    reason?: string;
    waitTime?: number;
  } => {
    const now = Date.now();

    // Check message count limit
    if (rateLimitState.messageCount >= MAX_MESSAGES_PER_SESSION) {
      const timeUntilReset =
        SESSION_RESET_HOURS * 60 * 60 * 1000 -
        (now - rateLimitState.sessionStartTime);
      const hoursUntilReset = Math.ceil(timeUntilReset / (60 * 60 * 1000));
      return {
        allowed: false,
        reason: `You've reached the maximum of ${MAX_MESSAGES_PER_SESSION} messages per session. Please try again in ${hoursUntilReset} hour(s).`,
      };
    }

    // Check cooldown
    const timeSinceLastMessage = now - rateLimitState.lastMessageTime;
    if (
      rateLimitState.lastMessageTime > 0 &&
      timeSinceLastMessage < COOLDOWN_DURATION_MS
    ) {
      const waitTime = Math.ceil(
        (COOLDOWN_DURATION_MS - timeSinceLastMessage) / 1000
      );
      return {
        allowed: false,
        reason: `Please wait ${waitTime} seconds before sending another message.`,
        waitTime,
      };
    }

    return { allowed: true };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Check rate limits
    const limitCheck = canSendMessage();
    if (!limitCheck.allowed) {
      // Track rate limit hits
      analytics.trackChatRateLimit(
        MAX_MESSAGES_PER_SESSION - rateLimitState.messageCount
      );
      toast({
        variant: 'destructive',
        title: 'Rate Limited',
        description: limitCheck.reason,
      });
      return;
    }

    const currentInput = input;
    const userMessage: Message = { role: 'user', content: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Update rate limit state
    const now = Date.now();
    const newMessageCount = rateLimitState.messageCount + 1;
    setRateLimitState(prev => ({
      ...prev,
      messageCount: newMessageCount,
      lastMessageTime: now,
    }));

    // Track chat message
    analytics.trackChatMessage(newMessageCount);

    // History excludes the message we just added (sent separately).
    const chatHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Tracks whether the assistant bubble has been created (first token in).
    let started = false;
    // Message from a server rate-limit (429), surfaced in the error toast.
    let rateLimitMessage = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput, chatHistory }),
      });

      if (res.status === 429) {
        rateLimitMessage =
          (await res.text().catch(() => '')).trim() ||
          'You are sending messages too quickly. Please slow down.';
        analytics.trackChatRateLimit(
          MAX_MESSAGES_PER_SESSION - newMessageCount
        );
        throw new Error(rateLimitMessage);
      }

      if (!res.ok || !res.body) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      // Stream chunks, appending to the assistant message as they arrive.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        if (!acc) continue;

        if (!started) {
          started = true;
          setIsLoading(false);
          setMessages(prev => [...prev, { role: 'assistant', content: acc }]);
        } else {
          setMessages(prev => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: acc };
            return next;
          });
        }
      }

      if (!started || !acc.trim()) {
        throw new Error('Empty response from server');
      }
    } catch (error) {
      console.error('Chat request failed:', error);
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: rateLimitMessage ? 'Rate Limited' : 'Error',
        description:
          rateLimitMessage || 'Sorry, I encountered an error. Please try again.',
      });

      if (!started) {
        // Nothing streamed: drop the user message, restore the input, and
        // refund the rate-limit count so the turn can be retried cleanly.
        setMessages(prev => prev.slice(0, prev.length - 1));
        setInput(currentInput);
        setRateLimitState(prev => ({
          ...prev,
          messageCount: Math.max(0, prev.messageCount - 1),
        }));
      }
      // If streaming already started, keep the partial reply as-is.
    }
  };

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-5rem)] bg-background ">
      <ScrollArea className="flex-1 p-4 bg-textureThemed" ref={scrollAreaRef}>
        <div className="space-y-6 max-w-4xl mx-auto pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9 border-2 border-primary shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xl p-3 rounded-lg shadow-md ',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                )}
              >
                {message.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom styling for markdown elements
                        h1: ({ children }) => (
                          <h1 className="text-base font-semibold mb-2 text-foreground">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-sm font-semibold mb-2 text-foreground">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-medium mb-1 text-foreground">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 text-foreground leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-2 space-y-1 text-foreground">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-2 space-y-1 text-foreground">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-foreground">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-foreground">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-foreground">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto mb-2">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {preprocessAIContent(message.content)}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-9 w-9 border-2 border-muted shrink-0">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 justify-start">
              <Avatar className="h-9 w-9 border-2 border-primary shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-lg p-3 rounded-lg shadow-md bg-card text-card-foreground rounded-bl-none flex items-center space-x-2">
                <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                  Thinking...
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div
        className={cn(
          'border-t sticky bottom-0 pb-4 md:pb-0',
          backgroundClasses
        )}
      >
        <div className="p-4 max-w-4xl mx-auto">
          {/* Rate limit indicator */}
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
            <span>
              Messages remaining:{' '}
              {MAX_MESSAGES_PER_SESSION - rateLimitState.messageCount}
            </span>
            {rateLimitState.messageCount > 0 && (
              <span>
                Session resets in{' '}
                {Math.ceil(
                  (SESSION_RESET_HOURS * 60 * 60 * 1000 -
                    (Date.now() - rateLimitState.sessionStartTime)) /
                    (60 * 60 * 1000)
                )}{' '}
                hours
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input
              type="text"
              placeholder={
                rateLimitState.messageCount >= MAX_MESSAGES_PER_SESSION
                  ? 'Message limit reached. Try again later.'
                  : "Ask me about Phong's work"
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1"
              disabled={
                isLoading ||
                rateLimitState.messageCount >= MAX_MESSAGES_PER_SESSION
              }
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={
                isLoading ||
                !input.trim() ||
                rateLimitState.messageCount >= MAX_MESSAGES_PER_SESSION ||
                !canSendMessage().allowed
              }
            >
              <SendHorizontal className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
