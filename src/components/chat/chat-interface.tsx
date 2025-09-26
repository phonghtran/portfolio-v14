'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import {
  Paperclip,
  SendHorizontal,
  Bot,
  User,
  LoaderCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getAiResponse } from '@/app/actions';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Function to preprocess AI content for better paragraph rendering
const preprocessAIContent = (content: string): string => {
  // Split on sentences ending with colons followed by text (like "Strategic Discovery & Facilitation: He excels...")
  console.log('Original content:', content);
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

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm Phong's AI assistant. What would you like to know about him and his work?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const chatHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const result = await getAiResponse({ message: input, chatHistory });

    setIsLoading(false);

    if (result.success && result.response) {
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'An unknown error occurred.',
      });
      setMessages(prev => prev.slice(0, prev.length - 1));
    }
  };

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-5rem)] bg-background">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
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
                  'max-w-xl p-3 rounded-lg shadow-md',
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
      <div className="border-t bg-card">
        <div className="p-4 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Ask me anything about your UX career..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
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
