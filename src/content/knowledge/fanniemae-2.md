# Fannie Mae — "Seasoned Bulk" (Dec 2025 – ongoing)

**Client:** Fannie Mae (mortgage finance) — Capital Markets, MarketPoint Batch Pricing
**Role:** Product Owner & Designer
**One-liner:** Turning a fragmented, expert-driven loan acquisition process into a sequenced product model that engineering could build and the business could progressively automate.

## The situation
Seasoned Bulk is how Fannie Mae buys large batches of existing mortgages from
lenders. A lender submits a loan "tape," then multiple teams and systems pull
updated credit, determine eligibility, filter ineligible loans, build a bid
price, run risk checks, communicate and negotiate the bid, wait for delivery,
and reconcile fees and mismatched deliveries.

The process touched roughly six business teams; pricing alone could take 7–9
people to calculate and approve. Much of it lived in people's heads,
spreadsheets, and email.

## What Phong did
- **Mapped the end-to-end workflow** (actors, handoffs, systems, data
  dependencies) using whiteboarding / event storming, giving business, design,
  and engineering one shared model.
- **Reframed people/tools into capabilities:** submission, normalization &
  enrichment, eligibility, price build, price modeling & simulation, risk &
  approvals, negotiation, delivery & reconciliation. Downstream
  securitization was explicitly scoped out.
- **Made data normalization first-class:** UI shows enrichment status per
  source (float income, property value, MTMLTV, credit report & FICO) and
  filters to loans with errors.
- **Designed explainable pricing:** components, loan-level and deal-level
  pricing, return (ROCET1) calculations, and simulation of different return
  targets before committing to a bid.
- **Kept human judgment where it matters:** the Credit Risk team still approves
  the population of loans Fannie Mae will purchase.
- **Reused enterprise systems** (credit data, AVM/property value, PCS pricing,
  CET1, etc.) and an existing bid-tape workflow rather than rebuilding;
  proposed a new reusable credit & eligibility service other apps could use.
- **Made ownership explicit:** task delegation, status tracking, notifications.
- **Sliced delivery:** each iteration removes a touchpoint or dependency, toward
  the long-term goal of lender self-service pricing without human intervention.
  First slice: load loans by batch ID, normalize missing data, delegate tasks,
  generate pricing-scenario reports by target return. Later slices: pricing &
  returns, automated connections, eligibility, new credit/eligibility service,
  MBS pricing.

## Intended impact
- **Business goal: enable $5 billion in additional Seasoned Bulk volume.**
  (This is the target the business set; the project is ongoing, so it is not
  yet a realized result.)

Product direction: less specialist labor per deal so the business can scale
volume, fewer handoffs and faster cycle time, less
spreadsheet/reconciliation risk, transparent pricing, and reusable enterprise
services.

## Skills demonstrated
Service design, workflow/systems mapping, product decomposition and sequencing,
decision architecture (automation vs. human control), cross-functional
alignment, data-dense enterprise UI design.

## Good questions this answers
- "How does he handle large, ambiguous initiatives?"
- "Example of product management or roadmap slicing?"
- "How does he decide what to automate vs. keep human?"
