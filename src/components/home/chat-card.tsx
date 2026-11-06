'use client';

import { useId } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import {
  MAX_MESSAGES_PER_DAY,
  type ChatMessage,
  type PortfolioChat,
} from './use-portfolio-chat';

export const QUESTION = 'What are you hiring for?';

const suggestions = [
  {
    label: 'Fintech',
    tone: 'bg-coral-muted text-coral-text-strong',
    prompt: 'I’m hiring a product designer for a fintech team.',
  },
  {
    label: 'AI products',
    tone: 'bg-teal-muted text-teal-text-strong',
    prompt: 'We’re building AI products. Has Phong designed or built with AI?',
  },
  {
    label: 'Design systems',
    tone: 'bg-marigold-soft text-marigold-text-strong',
    prompt: 'We need someone to lead our design system.',
  },
  {
    label: 'Workshops & facilitation',
    tone: 'bg-media text-primary',
    prompt: 'We need someone who can run workshops and align stakeholders.',
  },
];

/**
 * The homepage chat. "full" is the hero; "condensed" is the pinned version
 * shown once the visitor scrolls past it: the big question becomes the input's
 * label, the intro steps down, and the suggestion tags hide on phones.
 */
export function ChatCard({
  chat,
  condensed = false,
}: {
  chat: PortfolioChat;
  condensed?: boolean;
}) {
  const inputId = useId();
  const threadId = useId();
  const {
    messages,
    status,
    input,
    setInput,
    error,
    cooldownSeconds,
    limitReached,
    historyOpen,
    setHistoryOpen,
    hydrated,
    send,
    startOver,
  } = chat;
  const busy = status !== 'idle';
  const hasHistory = messages.length > 0;
  const canSend =
    !busy && !limitReached && cooldownSeconds === 0 && !!input.trim();

  return (
    <div
      className={cn(
        'mx-auto flex flex-col rounded-2xl border border-border bg-surface',
        condensed
          ? 'gap-2 px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.12)] md:gap-3 md:px-6 md:py-5'
          : 'gap-4 p-4 md:p-8'
      )}
    >
      <p
        className={cn(
          'text-center text-coral-text',
          condensed ? 'text-label-sm md:text-label' : 'text-body-lg'
        )}
      >
        {site.intro}
      </p>

      {condensed ? (
        <label htmlFor={inputId} className="text-h4 text-primary">
          {QUESTION}
        </label>
      ) : (
        <h1>
          <label
            htmlFor={inputId}
            className="mx-auto block max-w-[11ch] text-center text-[3.25rem] font-black leading-none text-primary md:text-display"
          >
            {QUESTION}
          </label>
        </h1>
      )}

      <form
        onSubmit={e => {
          e.preventDefault();
          send(input);
        }}
        className="flex flex-col gap-1.5"
      >
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border bg-surface py-1.5 pl-3 pr-1.5 transition-shadow focus-within:ring-2 focus-within:ring-ring',
            error ? 'border-red-strong' : 'border-strong',
            limitReached && 'bg-subtle'
          )}
        >
          <input
            id={inputId}
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={limitReached}
            autoComplete="off"
            placeholder={
              hasHistory
                ? 'Ask a follow-up…'
                : 'Describe the role, or ask about Phong’s work'
            }
            aria-describedby={cooldownSeconds ? `${inputId}-help` : undefined}
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-primary outline-none placeholder:text-secondary disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-md bg-action px-3.5 py-2 text-body-sm font-semibold text-action-on transition-colors hover:bg-action-hover disabled:bg-action-disabled disabled:text-action-on-disabled"
          >
            Send
          </button>
        </div>
        {cooldownSeconds > 0 && (
          <p id={`${inputId}-help`} className="text-caption text-secondary">
            One moment. You can send again in {cooldownSeconds} second
            {cooldownSeconds === 1 ? '' : 's'}.
          </p>
        )}
      </form>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-soft bg-red-subtle px-4 py-3"
        >
          <p className="text-label text-red-text">Your message didn’t send</p>
          <p className="text-body-sm text-red-text">
            Something went wrong on our end. Your text is still in the box, so
            try sending it again.
          </p>
        </div>
      )}

      {limitReached && (
        <div className="rounded-xl border border-blue-soft bg-blue-subtle px-4 py-3">
          <p className="text-label text-blue-text">
            That’s today’s {MAX_MESSAGES_PER_DAY} messages
          </p>
          <p className="text-body-sm text-blue-text">
            Your tailored contents stay as they are. To keep talking, email{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      {/* Suggestions until there's a conversation, then the history toggle.
          Hidden until saved state is restored so it doesn't flicker. */}
      <div className={cn(!hydrated && 'invisible')}>
        {!hasHistory ? (
          <div
            className={cn(
              'flex flex-wrap items-center gap-2',
              condensed && 'hidden md:flex'
            )}
          >
            <span className="text-label text-secondary">Try</span>
            {suggestions.map(s => (
              <button
                key={s.label}
                type="button"
                disabled={busy || limitReached}
                onClick={() => send(s.prompt)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-label-sm transition-[filter] hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60',
                  s.tone
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-expanded={historyOpen}
                aria-controls={threadId}
                onClick={() => setHistoryOpen(!historyOpen)}
                className="flex items-center gap-1 rounded text-label text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {historyOpen
                  ? 'Hide chat history'
                  : `Chat history (${messages.length})`}
                {historyOpen ? (
                  <ChevronUp className="h-4 w-4" aria-hidden />
                ) : (
                  <ChevronDown className="h-4 w-4" aria-hidden />
                )}
              </button>
              {!busy && (
                <button
                  type="button"
                  onClick={startOver}
                  className="rounded text-label text-coral-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Start over
                </button>
              )}
            </div>
            {historyOpen && (
              <Thread
                id={threadId}
                messages={messages}
                thinking={
                  status === 'thinking' &&
                  messages[messages.length - 1]?.role === 'user'
                }
                className={condensed ? 'max-h-[45vh] overflow-y-auto' : ''}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Thread({
  id,
  messages,
  thinking,
  className,
}: {
  id: string;
  messages: ChatMessage[];
  thinking: boolean;
  className?: string;
}) {
  return (
    <div id={id} className={cn('flex flex-col gap-3', className)}>
      {messages.map((m, i) =>
        m.role === 'user' ? (
          <p
            key={i}
            className="ml-auto max-w-[min(480px,85%)] whitespace-pre-wrap rounded-xl bg-coral-muted px-4 py-3 text-base text-primary"
          >
            {m.content}
          </p>
        ) : (
          <div key={i} className="flex flex-col items-start gap-3">
            {m.customizing && <CustomizingStatus {...m.customizing} />}
            {m.content && (
              <div className="max-w-[min(640px,100%)] rounded-xl bg-page px-4 py-3 text-base text-primary [&_a]:text-coral-text [&_a]:underline [&_li]:ml-5 [&_ol]:list-decimal [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:mt-1 [&_ul]:list-disc">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )
      )}
      {thinking && (
        <p
          className="max-w-[640px] animate-pulse rounded-xl bg-page px-4 py-3 text-base text-secondary"
          aria-live="polite"
        >
          Looking through Phong’s projects…
        </p>
      )}
    </div>
  );
}

/**
 * Opens the first reply of a visit: "Customizing the website…" while the site
 * tailors itself, then what it did (or that there was nothing to tailor).
 */
function CustomizingStatus({
  state,
  topic,
  moved = 0,
}: NonNullable<ChatMessage['customizing']>) {
  const working = state === 'working';
  const [label, detail] =
    state === 'working'
      ? ['Customizing the website…', 'Reading what you’re hiring for']
      : state === 'done'
        ? [
            `Customized for ${topic}`,
            `Moved ${moved} project${moved === 1 ? '' : 's'} to the top`,
          ]
        : [
            'Nothing to customize yet',
            'Tell me about the role and I’ll tailor the contents',
          ];

  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-3 rounded-xl border py-3 pl-3.5 pr-[18px]',
        working ? 'border-coral-soft bg-coral-subtle' : 'border-border bg-page'
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          state === 'done' && 'bg-teal-muted text-teal-text',
          state === 'skipped' && 'bg-media text-secondary'
        )}
        aria-hidden
      >
        {working ? (
          <Sparkles className="h-5 w-5 animate-pulse text-coral-solid" />
        ) : state === 'done' ? (
          <Check className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </span>
      <span>
        <span className="block text-label text-primary">{label}</span>
        <span className="block text-body-sm text-secondary">{detail}</span>
      </span>
      {state === 'done' && (
        <button
          type="button"
          onClick={() => {
            const heading = document.getElementById('contents-heading');
            heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            heading?.focus({ preventScroll: true });
          }}
          className="ml-2 flex shrink-0 items-center gap-1 rounded-md bg-action px-3 py-2 text-body-sm font-semibold text-action-on transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          See your contents
          <ArrowDown className="h-4 w-4" aria-hidden />
        </button>
      )}
      {working && (
        <span className="ml-1 flex gap-1" aria-hidden>
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-[dot_1.2s_ease-in-out_infinite] rounded-full bg-coral-solid"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      )}
    </div>
  );
}
