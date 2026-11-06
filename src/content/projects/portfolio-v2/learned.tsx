export default function LearnedSection() {
  return (
    <div className="space-y-6">
      <h3>Design direction stays human</h3>
      <p>
        Claude was fast and thorough, and it was right more often than not, but
        the decisions that made the site feel like mine were small refusals: no
        reorder badges, no style switcher, marigold instead of a darker coral,
        no chat paragraph when the page already answered. An agent will happily
        add things. The design work was deciding what to leave out.
      </p>
      <h3>Look at the result, every time</h3>
      <p>
        The most useful habit was verifying visually. Screenshots caught
        problems that passed every type check: text colors that silently
        didn&apos;t apply inside components, a stale stylesheet in the dev
        server, and a class-merging helper that quietly dropped custom font
        sizes, so tags rendered larger than the text beside them. None of those
        were &ldquo;bugs&rdquo; to a compiler.
      </p>
      <h3>One source of truth, kept honest</h3>
      <p>
        Generating the CSS tokens from the Figma variables, and syncing the file
        back whenever the build changed, meant I never had to decide which one
        was right. For a solo designer who codes, that is the difference between
        a design file and a design system.
      </p>
      <h3>Give the AI one job at a time</h3>
      <p>
        Splitting &ldquo;decide how to tailor the page&rdquo; from &ldquo;write
        a reply&rdquo; made both better. The tailoring call returns small,
        validated data the page can trust; the chat call only runs when
        there&apos;s actually something to say.
      </p>
    </div>
  );
}
