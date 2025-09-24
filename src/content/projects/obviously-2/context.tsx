import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h2>Obviously #2</h2>
      <h3>Flexibility into a Rigid System</h3>

      <p>
        I like this project because solved many business problems while avoiding
        things that businesses tend to have no appetite for.
      </p>

      <h3>Problems</h3>

      <ol className="traditionalOrderedList">
        <li>
          Campaigns were getting increasingly diverse and deviating from the
          standard campaign workflow.
        </li>
        <li>
          Team members were secretly resorting to spreadsheets to track all the
          unique aspects of the campaign.
        </li>
        <li>
          The software was built so rigidly that adding any new aspects to the
          workflow was slow and costly.
        </li>
      </ol>

      <p>
        The selfish design solution would be to build a flexible modular
        architecture that could scale infinitely into whatever the client
        wanted. But the cost and risk of that would be unacceptable to the
        business.
      </p>

      <h3>Solution</h3>

      <p>
        Enter "attributes." At the heart of every software is the data
        structure. Which means every concept or object in the system is a
        glorified table with columns and rows. By building a simple UI for users
        to effectively just add a column for any given object in a campaign, we
        unlocked a magnitude of flexibility without corrupting the underlying
        functionality.
      </p>
      <p>Each attribute is composed of a few elements:</p>

      <ol className="traditionalOrderedList">
        <li>A name</li>
        <li>A label that the end user would see</li>
        <li>
          The component type (this could be a simple text box, a dropdown or
          even a media uploader)
        </li>
        <li>Permissions of who could view or edit this attribute</li>
        <li>
          A "short code", this code could be recognized by the system anywhere
          and output the value e.g. #payment# would render your payment.
        </li>
      </ol>

      <h3>Outcomes Examples</h3>

      <h4>MVP: Eliminate 3rd-Party Vendors</h4>

      <p>
        The first MVP was to add attributes to the "campaign application
        process." This was powerful as we could eliminate the use of
        SurveyMonkey while integrating the survey directly into the campaign
        itself. We could now directly ask the creators about their preferences
        and needs to be hired.
      </p>
      <p>
        This was immediately extended into asking creators for their concepts
        for consideration. Clients found this so appealing that this is now
        standard practice within the campaign flow. Both capabilities were
        unlocked by just adding this attribute concept to one object in the
        system without major refactoring of anything technological.
      </p>

      <h4>Scaling 100x in Volume</h4>

      <p>
        As we added attributes to each object in the system, this unlocked new
        categories of services we could sell and scale up.
      </p>
      <p>
        When we added attributes to the hired creators themselves, we could now
        track specific creative briefs per user and not just per campaign. This
        means it was trivial to scale up from tens of pieces of content to
        thousands of pieces of content per user. An example is before we could
        request videos about travel tips from our creators. But with attributes,
        we could assign every creator a city and a topic (two attributes), and
        the system could filter and sort track travel tip videos down to "The
        Bronx Zoo in NYC."
      </p>

      <h4>Linear to Non-Linear</h4>

      <p>
        At the limits of attributes is unlocking more complex and non-linear
        workflows. As stated before, each campaign is rigidly coded in a linear
        flow and never anticipated the need to repeat a phase or even revert to
        a previous phase.
      </p>
      <p>
        A new need that came in was for multiple people to approve the same
        piece of content. A certain class of clients wanted no mistakes and 100%
        oversight over every piece of content. This meant before we may have
        spot-checked a handful or had one person check, now we needed upwards of
        5-6 people to approve.
      </p>
      <p>
        This would be difficult in any system and let's understand that
        attributes are still inadequate for a full-fledged audited workflow. But
        using attributes, we could spin up an MVP working skeleton of tracking
        people's approval status. The final approver would then have to manually
        check these statuses, but could then move it forward within the same
        overall linear workflow.
      </p>

      <h3>In Short</h3>
      <p>
        Often the least sexy solution from a UI or even grand architecture POV
        can have far-reaching benefits. Here a humble idea in both tech and
        design has unlocked millions of dollars for the business.
      </p>
    </div>
  );
}
