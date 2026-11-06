# This Portfolio — "Designed with Claude" (2026)

**Client:** Phong's own site (phonghtran.com)
**Role:** Designer & developer
**One-liner:** A portfolio that tailors itself to what a visitor is hiring for, designed in Figma and built in code with Claude Code (Anthropic's coding agent) connected to Figma through the Figma MCP server.

## Why
The previous site had an AI chatbot and a style switcher with four themes
(classic, neon, retro, glassy). Phong cut the switcher: recruiters don't want
to restyle a portfolio, they want to know quickly whether the work fits their
role. The new homepage is one question, "What are you hiring for?", over a
table of contents that reorders itself for each visitor.

## How the site works
- Before any reply, a structured model call (Genkit + Gemini) decides whether
  to tailor the page: which case studies and side projects move to the top
  (with short factual reasons like "Payments · Mastercard"), a new headline
  ("A Focus on Fintech"), and a rewritten summary that uses only facts from
  the portfolio.
- The server sends that first; the contents reorder with a short slide
  animation. The tailored order is saved in a one-day cookie so returning
  visitors land on their version, rendered on the server with no flash.
- On the first message the chat shows "Customizing the website…" while the
  contents dim, then "Customized for {topic}" with a "Jump to contents" button.
  When the page changed, there is no written chat reply: the site is the
  answer. The chat replies only when nothing changed or for follow-up
  questions.
- The assistant runs on Gemini 3.5 Flash via Genkit, grounded in Phong's
  resume, experience and a case study index; a getProjectDetails tool loads a
  case study's full write-up on demand.
- Model output is validated before it reaches the page: unknown project ids
  are dropped, reasons are capped at 48 characters, and a headline over 32
  characters or a summary over 420 falls back to the default. The summary is
  written only from portfolio facts at low temperature. A follow-up landing on
  the same projects doesn't count as a change, so it gets a written answer.
- Password-protected projects can be discussed, but the assistant never hints
  at a password and sends access requests to Phong.
- Case study pages follow the visitor's tailored order in their
  previous/next switcher. Limits: 16 messages per visitor per day, 3 seconds
  between messages.
- Stack: Next.js and React, Tailwind CSS with design tokens generated from the
  Figma variables, light and dark mode following the system setting, Genkit and
  Gemini for the assistant.

## How it was designed with Claude and the Figma MCP
- The Figma MCP server lets the agent read and edit the Figma file. Claude
  wrote plugin-API scripts, ran them, and checked its work with screenshots.
- From one coral (#E76E50) it generated eight 11-step color scales (90 color
  styles), a 15-style Outfit type scale, components, and the screens (homepage
  default/fintech/AI, desktop and mobile, case studies, side projects, contact).
- Working rhythm: Phong edited frames himself, then had Claude read his
  changes and propagate them across every other frame.
- Phong rejected several of Claude's proposals (an "order" badge, a reset
  link, a status line); the AI-written headline was enough signal.
- Claude drafted all the missing states (thinking, streaming, errors, rate
  limits, locked case studies, tablet) on a review page; Phong approved them
  into the main design.
- A contrast audit found secondary text below WCAG AA (as low as ~2:1). The
  fix: secondary text uses a darker ink. For buttons Phong rejected a darker
  coral and chose marigold with a dark label (8.5:1): "marigold is for doing,
  coral is for pointing."
- Figma variables: a Primitives collection (90 colors) and a Theme collection
  (86 semantic tokens, Light and Dark). About 1,300 layers were bound to the
  tokens, so dark mode is a mode switch. Eight new style guide boards cover
  tokens, contrast, actions, layout, motion, content, icons and accessibility.
- Code and Figma were kept in sync in both directions: code tokens generated
  from Figma, and Figma updated whenever the build changed.

## What Phong learned
- Design direction stays human: the decisions that made it feel like his were
  things he chose to leave out.
- Verify visually: screenshots caught problems no type check would (styles
  not applying inside components, a stale dev stylesheet, a class-merging
  helper dropping custom font sizes).
- One source of truth, kept honest by syncing both ways.
- Give the AI one job at a time: separating "tailor the page" from "write a
  reply" made both better.
