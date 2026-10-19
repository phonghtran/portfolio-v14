import Image from 'next/image';

export default function MappingSection() {
  return (
    <div className="space-y-6">
      <p>
        So my first job was to make the invisible process visible. Using the
        same whiteboard and event-storming approach we&apos;d introduced on
        earlier projects, we mapped every actor (lender, AE, Credit, Risk,
        Conduit, and more), every handoff, every system, and every piece of data
        that moved between them.
      </p>
      <p>
        Then we did the important reframe. Instead of asking &quot;which person
        or spreadsheet does this today?&quot; we asked &quot;what capability
        does the future system need to provide?&quot; That turned a tangle of
        people and tools into a clear lifecycle:
      </p>

      <ol className="traditionalOrderedList">
        <li>Loan submission</li>
        <li>Data normalization &amp; enrichment</li>
        <li>Eligibility validation</li>
        <li>Price build</li>
        <li>Price modeling &amp; simulation</li>
        <li>Risk review &amp; approvals</li>
        <li>Negotiation &amp; confirmation</li>
        <li>Delivery &amp; reconciliation</li>
      </ol>

      <p>
        That one shift changed the product from &quot;a set of calculators&quot;
        into a workflow product. It also gave business, design, and engineering
        one shared map to argue over, which is exactly what they had been
        missing. Downstream securitization was drawn on the map too, but
        explicitly marked out of scope so the project had clear edges.
      </p>

      <Image
        src="/images/projects/fanniemae-2/whiteboard-pricing-scenarios.png"
        alt="Whiteboard section mapping pricing scenarios: loan-level pricing and ROCET1, deal summary, export collateral summary, and import conduit pricing"
        width={2604}
        height={1266}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        A corner of the working whiteboard: each scenario pairs screens with the
        business rules and open questions behind them.
      </small>
    </div>
  );
}
