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
          <strong>Tailwind CSS</strong>, with tokens generated from Figma: the
          palette and the Light/Dark theme became CSS variables straight from
          the Figma variables, so the code and the file share the same names.
          Dark mode follows the visitor&apos;s system setting.
        </li>
        <li>
          <strong>Genkit and Gemini</strong> for the assistant, grounded in my
          resume and case study write-ups, with a per-visitor limit of 16
          messages a day.
        </li>
      </ul>
      <p>
        The part that makes the site different, the Gemini assistant that
        tailors the page, gets its own chapter next.
      </p>
      <p>
        We kept the two tools in sync in both directions. When code drifted from
        the design (a sixth side project, sentence-case labels, a copy icon on
        the phone row), Claude updated the Figma file to match, so the file
        stayed the source of truth rather than a picture of an earlier idea.
      </p>
    </div>
  );
}
