export default function ContextSection() {
  return (
    <div className="space-y-6">
      <p>
        The previous version of this site already had an AI assistant, plus a
        style switcher with four themes: classic, neon, retro and glassy. The
        switcher was fun to build, but it answered a question nobody hiring
        asks. A recruiter doesn&apos;t want to restyle my portfolio; they want
        to know quickly whether my work fits the role they&apos;re filling.
      </p>
      <p>
        So I cut the switcher and turned the idea around. Instead of the visitor
        customizing the site, the site customizes itself for the visitor. The
        homepage is one big question, &ldquo;What are you hiring for?&rdquo;,
        sitting on top of a table of contents. Tell the assistant about the role
        and the contents reorder themselves: the most relevant case studies and
        side projects move to the top, the list gets a new headline (&ldquo;A
        Focus on Fintech&rdquo;), and the summary above it is rewritten around
        what you care about.
      </p>
      <p>
        I also wanted the project itself to be a case study in working with AI,
        not just about it. I designed the whole thing in Figma and built it in
        code with Claude as a collaborator: Claude Code, Anthropic&apos;s coding
        agent, connected to my Figma file through the Figma MCP server. I made
        the calls; Claude did a lot of the hands-on work in both tools, and I
        checked it the way I&apos;d review a teammate&apos;s.
      </p>
    </div>
  );
}
