# Obviously — Flexibility into a Rigid System ("Attributes") (2022, ~6 months)

**Client:** Obviously (influencer-marketing SaaS; acquired by WPP/VML in 2022)
**Role:** Director of Design (was Lead Designer)
**One-liner:** Solved deep platform rigidity with a deceptively humble "attributes" concept — unlocking 100x scale and millions in value without a costly re-architecture.

## The situation
The platform's campaign workflow was becoming a bottleneck:

1. Campaigns were growing more diverse and deviating from the standard workflow.
2. Team members were **secretly resorting to spreadsheets** to track the unique
   aspects of each campaign.
3. The software was so rigidly built that adding any new workflow aspect was slow
   and costly.

The "selfish" designer solution — an infinitely flexible modular architecture —
would have carried a cost and risk the business had no appetite for. Phong
deliberately avoided that trap.

## What Phong did — "attributes"
At the heart of every piece of software is its data structure: each object is
essentially a table of rows and columns. Phong's solution was a simple UI that
lets users **add a "column" (an attribute) to any object in a campaign** —
unlocking enormous flexibility without corrupting the underlying functionality.

Each attribute is composed of:
- A **name**
- A user-facing **label**
- A **component type** (text box, dropdown, media uploader, etc.)
- **Permissions** for who can view or edit it
- A **short code** the system recognizes anywhere to output the value (e.g.
  `#payment#` renders the payment)

## Outcome / impact
- **Eliminated third-party vendors (MVP):** adding attributes to the campaign
  application process let them drop SurveyMonkey and ask creators about
  preferences directly — quickly extended to collecting creators' concepts,
  which clients loved so much it became **standard practice**. All from adding
  the attribute concept to one object, with no major technical refactoring.
- **Scaled 100x in volume:** putting attributes on the hired creators themselves
  enabled creative briefs per-user (not just per-campaign), scaling from tens to
  **thousands of content pieces per user**. Example: assigning each creator a
  city and a topic (two attributes) let the system filter travel-tip videos down
  to "the Bronx Zoo in NYC."
- **Linear → non-linear workflows:** stood up an MVP skeleton for multi-person
  content approval (some clients wanted 5–6 approvers and 100% oversight) — not
  a full audited workflow, but enough to track approval status within the
  existing flow.
- **Bottom line:** a humble idea, unglamorous in both tech and UI terms,
  **unlocked millions of dollars** for the business.

## Skills demonstrated
Systems thinking, data-model-driven design, pragmatic architecture (business-
appropriate, not gold-plated), scalable configuration design, MVP sequencing.

## Good questions this answers
- "Example of designing for scale and configurability?"
- "How does he balance an ideal solution against real business constraints?"
- "Can he think at the data-structure / systems level, not just the UI?"
