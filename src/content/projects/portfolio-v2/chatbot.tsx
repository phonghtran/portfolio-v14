import Image from 'next/image';

const example = `{
  "headline": "Fintech Experience",
  "topic": "fintech",
  "picks": [
    { "id": "fanniemae-2", "reason": "Fannie Mae · Financial services" },
    { "id": "fanniemae-1", "reason": "Fannie Mae · Backend refactor" },
    { "id": "mastercard-1", "reason": "Mastercard · Payments" },
    { "id": "worldpay-1", "reason": "Worldpay · Payments" }
  ],
  "summary": "Phong Tran is a product design leader with deep experience in fintech and enterprise SaaS…"
}`;

export default function ChatbotSection() {
  return (
    <div className="space-y-6">
      <p>
        The assistant runs on Google&apos;s Gemini (Gemini 3.5 Flash), wired up
        with Genkit. It only knows what I give it: my resume, my experience, and
        an index of the case studies. When a visitor asks about one project in
        depth, it calls a tool that loads that case study&apos;s full write-up
        instead of guessing. If something isn&apos;t in the portfolio, it says
        so and points to my email.
      </p>

      <h3>Two jobs, kept apart</h3>
      <p>
        Every message goes through two separate steps, and the order matters.
      </p>
      <ol className="traditionalOrderedList">
        <li>
          <strong>Tailor the page.</strong> A first Gemini call reads the
          conversation and answers with structured data, not prose: should the
          page change at all, which four (or fewer) projects best fit and why, a
          short headline for the contents, and a rewritten summary.
        </li>
        <li>
          <strong>Reply, only if needed.</strong> If the page changed, there is
          no chat reply; the reordered contents are the answer. The chat only
          writes back when nothing changed, like a greeting or a follow-up
          question about one project.
        </li>
      </ol>
      <p>
        Abridged, this is the kind of data the first step returns for
        &ldquo;I&apos;m hiring a product designer for a fintech team&rdquo;:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-inverse p-4 text-xs leading-relaxed text-inverse">
        <code>{example}</code>
      </pre>
      <p>
        The page turns that into the &ldquo;Most relevant to fintech&rdquo;
        group with a reason tag on each row, the headline above the list, and
        the new summary beneath it. The rows slide into place once, and screen
        readers hear &ldquo;Contents reordered: Fintech Experience&rdquo;.
      </p>

      <h3>Customizing, not chatting</h3>
      <p>
        On a visitor&apos;s first message the chat shows &ldquo;Customizing the
        website…&rdquo; straight away, while the contents dim and a soft
        highlight sweeps across them, so it&apos;s clear the page itself is
        changing. When the data arrives the card turns into &ldquo;Customized
        for fintech · Moved 4 projects to the top&rdquo; with a button to jump
        to the contents. If the message gave nothing to tailor, it says
        &ldquo;Nothing to customize yet&rdquo; and the assistant asks about the
        role.
      </p>
      <Image
        src="/images/projects/portfolio-v2/first-reply.jpg"
        alt="Three homepage states: customizing, customized for fintech, and nothing to customize"
        width={2400}
        height={786}
        className="h-auto w-full rounded object-contain"
      />
      <small>
        The first reply as designed in Figma: customizing, customized, and
        nothing to customize. The written reply under &ldquo;Customized&rdquo;
        was dropped once I saw it compete with the contents in the browser.
      </small>

      <h3>Trusting what the model returns</h3>
      <ul className="traditionalBulletedList">
        <li>
          Nothing from the model reaches the page unchecked. Unknown project ids
          are dropped, reasons are capped at 48 characters, and a headline over
          32 characters or a summary over 420 falls back to the defaults.
        </li>
        <li>
          The summary is written only from facts in my portfolio, at a low
          temperature, so it reframes my experience rather than inventing it.
        </li>
        <li>
          A follow-up that lands on the same projects doesn&apos;t count as a
          change, so asking &ldquo;tell me more about Worldpay&rdquo; gets an
          answer instead of a silent reshuffle.
        </li>
        <li>
          Password-protected work stays protected: the assistant can discuss
          those projects, but never hints at a password and sends access
          requests to me.
        </li>
        <li>
          Each visitor gets 16 messages a day, three seconds apart, enforced in
          the browser and again on the server.
        </li>
      </ul>

      <h3>The whole site follows along</h3>
      <p>
        The tailored order, headline and summary are saved in a cookie for a
        day, so the server renders a returning visitor&apos;s homepage in their
        order with no flash of the default. The case study pages use the same
        order: previous and next, &ldquo;Case study 1 of 8&rdquo;, and the Case
        Studies menu all lead with the projects the assistant picked.
        &ldquo;Start over&rdquo; clears it all and puts the site back to its
        default.
      </p>
    </div>
  );
}
