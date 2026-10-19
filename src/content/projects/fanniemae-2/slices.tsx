export default function SlicesSection() {
  return (
    <div className="space-y-6">
      <p>
        The full vision is lender self-service: a lender gets a price without a
        human in the loop. That is a huge leap, and waiting for every upstream
        and downstream dependency to be solved would have meant shipping nothing
        for years.
      </p>
      <p>
        So the strategy was simple to say and hard to do: each iteration removes
        a touchpoint or a dependency. Value ships along the way, and the manual
        process slowly gets replaced instead of rewritten all at once.
      </p>

      <h3>First Slice</h3>
      <ol className="traditionalOrderedList">
        <li>Pull a group of loans in by batch ID</li>
        <li>Normalize missing data fields in the UI</li>
        <li>Delegate tasks to specific people</li>
        <li>Generate a report of pricing scenarios based on a target return</li>
      </ol>

      <h3>What Follows</h3>
      <p>
        Later slices layer on pricing &amp; returns, automated connections to
        the enterprise services, eligibility automation, the new credit &amp;
        eligibility service, and MBS pricing. Each one takes another manual
        handoff off the board.
      </p>
    </div>
  );
}
