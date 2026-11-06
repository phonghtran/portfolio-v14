import Image from 'next/image';

export default function FigmaSection() {
  return (
    <div className="space-y-6">
      <p>
        The Figma MCP server lets an agent read and edit a Figma file directly.
        Claude writes small scripts against Figma&apos;s plugin API, runs them,
        then takes screenshots of the result to check its own work. That last
        part mattered more than I expected: most of the mistakes it made, it
        caught by looking.
      </p>
      <p>We built the file up in layers:</p>
      <ul className="traditionalBulletedList">
        <li>
          <strong>A color system from one hex code.</strong> Starting from my
          coral (#E76E50), Claude generated eight 11-step scales (coral, sand,
          marigold, teal, ink, plus green, red and blue for status), saved them
          as 90 color styles, and laid out usage and contrast guidance.
        </li>
        <li>
          <strong>Type and components.</strong> Outfit for everything, a
          15-style type scale, then the basic components: buttons, tags, inputs,
          nav, table of contents rows, a case study switcher, chapter links.
        </li>
        <li>
          <strong>Screens.</strong> The homepage in its default, fintech and AI
          versions, desktop and mobile, then case studies, side projects and a
          contact panel.
        </li>
      </ul>
      <p>
        The working rhythm was the part I&apos;d recommend. I&apos;d edit a
        frame myself (move the send button into the input, hide the nav on the
        homepage, collapse the chat into a &ldquo;Chat history&rdquo; toggle),
        then ask Claude to read what I&apos;d changed and carry it across every
        other frame. My taste set the direction; Claude did the propagation that
        normally eats an afternoon.
      </p>
      <p>
        Plenty of its ideas didn&apos;t survive. It proposed an
        &ldquo;order&rdquo; badge, a reset link and a status line to explain the
        reordering. I cut all three: the AI-written headline above the contents
        was signal enough. Later it drafted every state I hadn&apos;t designed
        yet (thinking, streaming, errors, rate limits, password-locked case
        studies, tablet layouts) on a separate review page, and I approved them
        into the main design in one pass.
      </p>
      <Image
        src="/images/projects/portfolio-v2/chat-states.jpg"
        alt="Figma board of chat card states: thinking, streaming, off-topic, error, cooldown, daily limit and start over"
        width={2091}
        height={2400}
        className="h-auto w-full rounded object-contain"
      />
      <small>
        The chat states Claude drafted for review: every in-between moment of
        the homepage chat, designed before any code.
      </small>
    </div>
  );
}
