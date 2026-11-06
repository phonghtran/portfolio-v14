import Image from 'next/image';

export default function BuildSection() {
  return (
    <div className="space-y-6">
      <p>
        With the design approved, Claude Code built it on a new branch of the
        existing site. The stack:
      </p>
      <ul className="traditionalBulletedList">
        <li>
          <strong>Next.js and React</strong>, with one page per case study and
          the homepage rendered on the server.
        </li>
        <li>
          <strong>Tailwind CSS with tokens generated from Figma.</strong> The
          palette and the Light/Dark theme were turned into CSS variables
          straight from the Figma variables, so the code and the file share the
          same names. Dark mode follows the visitor&apos;s system setting.
        </li>
        <li>
          <strong>Genkit and Gemini</strong> for the assistant, grounded in my
          resume and case study write-ups, with a per-visitor limit of 16
          messages a day.
        </li>
      </ul>
      <p>
        The interesting part is how the page tailors itself. Before the
        assistant writes anything, a second model call reads the conversation
        and returns structured data: whether to change the page at all, which
        projects to move up and why (&ldquo;Payments · Mastercard&rdquo;), a
        headline, and a rewritten summary built only from facts in my portfolio.
        The server sends that first; the page reorders with a short slide, and
        the order is saved for a day so a returning visitor lands on their
        version straight away.
      </p>
      <p>
        If the page changed, there&apos;s no chat reply at all. An early build
        answered every message with a paragraph, and it competed with the very
        contents it had just rearranged. Now the first message shows
        &ldquo;Customizing the website…&rdquo; while the contents dim, then
        &ldquo;Customized for fintech&rdquo; with a button to jump to them. The
        site is the answer; the chat only replies when nothing changed, or when
        you ask a follow-up.
      </p>
      <Image
        src="/images/projects/portfolio-v2/first-reply.jpg"
        alt="Three homepage states: customizing, customized for fintech, and nothing to customize"
        width={2400}
        height={786}
        className="h-auto w-full rounded object-contain"
      />
      <small>
        The first reply, designed in Figma before it was built: customizing,
        customized, and nothing to customize. The written reply under
        &ldquo;Customized&rdquo; was dropped once we saw it in the browser.
      </small>
      <p>
        We kept the two tools in sync in both directions. When code drifted from
        the design (a sixth side project, sentence-case labels, a copy icon on
        the phone row), Claude updated the Figma file to match, so the file
        stayed the source of truth rather than a picture of an earlier idea.
      </p>
    </div>
  );
}
