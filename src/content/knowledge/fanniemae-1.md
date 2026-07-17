# Fannie Mae — "Stealth Refactor" (2024, ~4 months)

**Client:** Fannie Mae (mortgage finance) — Pricing software teams within Capital Markets
**Role:** Lead Associate, UX Designer + organizational-change coach
**One-liner:** Turning a narrow feature request into a flexible, API-driven backend — while loosening a rigid, tech-debt-bound culture.

## The situation
Fannie Mae was stuck in a vicious cycle of churn and tech debt, with a culture
that adapted *around* the debt instead of tackling it. Phong's operating
principle: every project should deliver a bit more than the original request —
bringing more value per project while jarring the rigid culture loose.

BUBD is a mechanism that adjusts loan pricing very minutely to entice banks to
transfer loans to Fannie Mae; one revenue stream packages those loans into more
attractive pools resold to the broader market. The problem brought to Product:
business users could only price loans in broad buckets (e.g. 30-year vs
15-year). There was no way to differentiate a loan from New York versus Texas.

## What Phong did differently
The team's default was the most minimal effort to shoehorn the feature in —
never assessing whether there was a bigger opportunity or any real ROI. Phong
instead:

- **Ran cross-discipline discovery** across product, design, and technology,
  using journey mapping (called "event storming" internally) and user
  interviews to find root issues and where they fit in the broader business
  process.
- **Assessed the tech honestly.** The heart of the pricing platform was a
  monolithic mess of tech debt owned by *another* team — changing it directly
  meant timelines of months to years.
- **Reframed the request as modular APIs** instead of a one-off feature. The new
  APIs (e.g. a generic "product identification" system) could be reused by any
  business unit to build a product catalog and send it to any niche pricing
  system, and let the team sunset third-party software that took months to
  update.
- **Skipped a smaller front-end MVP on purpose.** Because the core logic became
  API calls, admin users could be dropped into the easiest temporary UI home;
  if Fannie Mae ever trashed its stack, the functionality could stand up in any
  front-end environment.

## Outcome / impact
- The **original single-dimension request was estimated to save Fannie Mae ~$20M/year.**
- The delivered system can price to **any of the hundreds of dimensions of a loan**,
  and the business team can add or modify dimensions without an engineering team.
- Crucially, it **did not add tech/product debt** — it converted a significant
  part of the process chain into a modular, flexible stack. It **unlocked tens
  of millions in revenue while reducing millions in recurring backend costs.**

## Skills demonstrated
Cross-functional discovery & facilitation, event storming / journey mapping,
stakeholder alignment across product/design/engineering, systems thinking,
organizational-change coaching, pragmatic architecture reframing.

## Good questions this answers
- "Tell me about a time he influenced technical direction, not just UI."
- "How does he handle legacy systems and tech debt?"
- "Example of business impact / ROI from his work?"
