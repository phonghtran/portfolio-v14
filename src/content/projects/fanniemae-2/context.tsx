export default function ContextSection() {
  return (
    <div className="space-y-6">
      <p>
        Seasoned Bulk is how Fannie Mae buys large batches of existing mortgages
        from lenders. A lender sends over a &quot;tape&quot; of loans, and then
        a relay race begins: pull updated credit, figure out which loans are
        eligible, toss the ones that aren&apos;t, build a bid price, run risk
        checks, send the bid back, negotiate, wait for delivery, and finally
        reconcile whatever showed up against what was priced.
      </p>
      <p>
        Every one of those steps lived with a different person, spreadsheet, or
        system. A single deal touched roughly six business teams, and pricing
        alone could need seven to nine people to calculate and approve. Most of
        the actual process lived in people&apos;s heads and in email threads.
      </p>
      <p>
        The tempting request was &quot;put the spreadsheet in an app.&quot; But
        that would have just digitized the relay race. The real problem was that
        nobody had ever written down the race itself.
      </p>

      <h3>Problems</h3>

      <ol className="traditionalOrderedList">
        <li>
          No shared picture of the end-to-end workflow. Each team only saw its
          own leg.
        </li>
        <li>
          Lender data came in incomplete, so everything downstream (eligibility,
          pricing) was only as good as someone&apos;s manual cleanup.
        </li>
        <li>
          Price was an opaque number. Hard to explain, hard to challenge, and
          impossible to test &quot;what if&quot; scenarios on.
        </li>
        <li>
          Handoffs were informal. Who owns the next step? Usually whoever
          remembered to send the email.
        </li>
      </ol>
    </div>
  );
}
