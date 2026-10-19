import Image from 'next/image';

export default function DecisionsSection() {
  return (
    <div className="space-y-6">
      <p>
        With the map in hand, the design work became a series of decisions about
        what the product should be. A few of the big ones:
      </p>
      <ol className="traditionalOrderedList">
        <li>
          <b>Why fix the data first?</b>
          <p>
            Eligibility and pricing are worthless if the inputs are wrong. So
            data normalization became a first-class feature, not a back-office
            chore. Users see enrichment progress for each data source (float
            income, property value, MTMLTV, credit &amp; FICO) and can filter
            straight to the loans with errors.
          </p>
        </li>
        <li>
          <b>Why show the guts of the price?</b>
          <p>
            Capital Markets users are experts. They need to validate and
            challenge a number, not just accept it. So pricing is broken into
            its components, with loan-level and deal-level views and return
            calculations alongside. And before anyone commits to a bid, they can
            simulate different return targets to see the economic impact.
          </p>
        </li>
        <li>
          <b>Why not automate everything?</b>
          <p>
            Some steps are deterministic and should be automated. Others are
            real judgment calls. The Credit Risk team still approves which loans
            Fannie Mae will actually buy. Designing that control in on purpose
            was more valuable than automating for automation&apos;s sake.
          </p>
        </li>
        <li>
          <b>Why not build it all from scratch?</b>
          <p>
            Fannie Mae already has authoritative systems for credit data,
            property valuation, pricing, and capital calculations. Rather than
            duplicate them, the new module reuses an existing bid-tape workflow
            and orchestrates those services. Where a capability was missing, we
            proposed a new reusable credit &amp; eligibility service that other
            applications could also use.
          </p>
        </li>
        <li>
          <b>Why make ownership explicit?</b>
          <p>
            Delegating tasks to specific people (like the Credit team), tracking
            status, and notifying whoever owns the next step replaces the
            &quot;did anyone send that email?&quot; style of coordination.
          </p>
        </li>
      </ol>

      <Image
        src="/images/projects/fanniemae-2/batch-pricing-loan-data.png"
        alt="Batch Pricing screen showing data enrichment status and a table of loans with eligibility, float income, property value, and MTMLTV"
        width={3330}
        height={1736}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        The Loan Data view: enrichment status per data source, eligibility per
        loan, and a quick filter to only show errors.
      </small>

      <p>
        Orchestrating real enterprise services also means designing for their
        quirks. Some calls are fast; the CET1 calculation can take up to ten
        minutes. So every service gets its own panel with explicit states:
        missing inputs, warnings, pending, running in parallel, and a
        timestamped last successful run. Users always know what&apos;s blocking
        the price and can keep working while slow calls finish.
      </p>

      <Image
        src="/images/projects/fanniemae-2/pricing-panel-states.png"
        alt="Pricing screen alongside a sequence of side-panel states for MTMLTV, CET1, Pricing Engine, and Target ROCET1 service calls"
        width={2062}
        height={964}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Walking through the pricing panel state by state, from missing values to
        every service call completed.
      </small>
    </div>
  );
}
