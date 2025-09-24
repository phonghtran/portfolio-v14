import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h2>Obviously #3</h2>
      <h3>Need for Efficiency</h3>

      <p>
        About a decade into Obviously existence, they sold themselves to an
        advertising conglomerate (WPP via VML, a daughter company of WPP.)
        Enthusiasm was optimistic until the realities of integration became
        real.
      </p>
      <p>
        The shift in our client base during the acquisition fundamentally
        changed the philosophy of the company. Before it was a larger diversity
        of smaller companies that had fairly light demands on our services. The
        standard workflow of our software could handle the linear timelines of
        the campaigns.
      </p>
      <p>
        However, the shift to mega multi-national corporations necessitated a
        more non-linear and dynamic workflow. This additional burden scales
        disproportionately on both the human labor and software flexibility
        needed. Meaning our new edict was now urgently about increasing
        efficiency.
      </p>

      <h3>"Can AI fix this?"</h3>

      <p>
        The natural question from leadership was could AI replace all the
        things? To answer this, the PM and I embarked on a discovery project
        that involved cycles of:
      </p>
      <ol className="traditionalOrderedList">
        <li>
          Auditing existing processes. All team members were mapped to the flow
          of tasks as we understood them today. Auditing existing time sinks.
          Where were our colleagues spending the most time on their day-to-day?
        </li>
        <li>
          Interviewing all job roles. They outlined their day-to-day, their
          meetings, their worries and anxieties, and their goals.
        </li>
        <li>
          Taking vendor calls. Any-and-all AI vendors were vetted to see what
          services could be leveraged.
        </li>
        <li>
          Competitor audits. What was in their marketing, what did they promise
          and what could they deliver?
        </li>
      </ol>

      <h3>Synthesis</h3>

      <p>
        The conclusion of all of that research was "Not really, AI isn't there
        yet."
      </p>
      <p>
        However, what we could outline was a three-phase campaign to increase
        efficiency via AI precursors of algorithms and machine learning.
      </p>
      <ul className="traditionalBulletedList">
        <li>Phase 1: Breaking the Anxiety Loop</li>
        <li>Phase 2: Automate the Repetition</li>
        <li>Phase 3: A Smarter "First Pass" with AI & Contractors</li>
      </ul>

      <p>
        <img
          src="../caseStudies/obvEff/statusboard.png"
          alt="status board of tasks to deadlines"
        />
        <small>
          Retrofitting the old admin UI to display alerts and deadlines
          automated by the platform.
        </small>
      </p>
      <h3>Phase 1: Breaking the Anxiety Loop</h3>

      <p>
        The most glaring discovery was that none of our software tasks took that
        much time, but it was hidden in both the workflow and time tracking:
        keeping everyone on the team and the client informed of updates. As
        clients got bigger, they were increasingly anxious that things were
        progressing well. This meant each of our team members down the chain was
        investigating all big and little issues to allay that anxiety.
      </p>
      <p>
        Also, ironically time tracking and status tracking internally became a
        time suck in itself.
      </p>
      <p>
        So phase 1 was to realize that since everything ultimately has to be
        done within our software, we could easily use heuristics to determine
        how the campaign was doing and tracked against the timelines. We could
        even time track automatically because we could determine which clicks
        happened when and by whom.
      </p>
      <p>
        By applying the thresholds that the team intuited we could program that
        logic into warnings and notifications. For example, "I know my client
        gets worried if only 80% of people are hired within 24 hours of the
        deadline."
      </p>
      <p>
        We refactored everyone's homepage and every detail page of every
        campaign and contract to show its progress and thresholds. Eliminating
        the dozens of spreadsheet trackers the teams had built and the number of
        daily meetings and slack messages to update each other.
      </p>

      <p>
        <img
          src="../caseStudies/obvEff/searchauto.png"
          alt="mockups of advanced search"
        />
        <small>
          Updating the basic search with automations, sorting by attributes, and
          batch actions.
        </small>
      </p>

      <h3>Phase 2: Automate the Repetition</h3>

      <p>
        Through interviews, we uncovered many "hacks" our team was doing to
        accomplish their tasks. An example would be that they often had to do
        multiple rounds of looking for creators to sign up. Each search could
        often result in the same people appearing over and over because they
        match the criteria of each search.
      </p>
      <p>
        Our software historically assumed one search was adequate because the
        client would maintain more static list of creators they liked to work
        with. But today, clients want a fresh pool of creators each time to
        reach new audiences.
      </p>
      <p>
        Our software historically assumed one search was adequate because the
        client would maintain a more static list of creators they liked to work
        with. But today, clients want a fresh pool of creators each time to
        reach new audiences.
      </p>
      <p>
        This and dozens of other automations were implemented to remove all the
        repetitive tasks that computers have always done better than humans.
        This isn't AI but can be incredibly effective.
      </p>
      <p>
        Fancier tricks do require fancier tech, however, as our backlog included
        machine learning. Often, our team has an intuition of a good creator for
        a client and adds special parameters to their searches. If we could
        convert them into tags and crunch the data that we have exclusively such
        as their performance metrics and history--we could apply those profiles
        to the overall creator network that we have. This would enrich every
        search moving forward.
      </p>
      <p>
        Then collecting data from phase 1, we could even optimize how we
        construct more contracts and set up the timelines to better scale the
        business. This could be applied to the programmed business logic of
        warnings and notifications to better hone those parameters dynamically
        over time.
      </p>

      <p>
        <img
          src="../caseStudies/obvEff/checklist.png"
          alt="mockup of new vetting card"
        />
        <small>
          Quick mockup of new functionality to stakeholders. The key is the
          central checklist which can receive tasks from humans or any AI
          automations being run.
        </small>
      </p>

      <h3>Phase 3: A Smarter "First Pass" with AI & Contractors</h3>

      <p>
        Finally, AI comes into play. A huge gap with LLMs, the main engine that
        powers AI today, is that it has little bearing on our specialized
        workflows and campaigns.
      </p>
      <p>
        We don't need asset generation because our entire business is to collect
        novel content from social media influencers and creators. We don't need
        prompts because that's the role of our strategists with our clients.
        Also, it's hard to automate the communication channels because often the
        client-team comms are about the specific campaign itself that only lasts
        3-6 months.
      </p>
      <p>
        So even an AI trained on our data and platform would have to be able to
        delineate each client, contract, and campaign without contamination.
      </p>
      <p>
        However, we realized we could lightly apply AI to specific tasks. The AI
        would do the "first pass." It would never make any official changes or
        official communications to the client, but rather draft the first pass
        of suggestions or findings for a team member to verify.
      </p>
      <p>
        For example, we could let it parse all the captions in the system and
        build a list of suggestions like a spell checker. Or digest a creative
        brief and suggest starter ideas for the creators hired for the campaign.
      </p>
      <p>
        Very small admittedly but that's the state of AI when we looked into
        during the summer of 2023. I'm sure if we invested in RAGs and federated
        the data we were fed by clients, we could formulate more ambitious AI
        automations.
      </p>

      <h3>Conclusion</h3>

      <p>
        The general adage for this project is less about the cutting edge but by
        distilling older principles and technologies -- you achieve what the
        cutting edge promises. Old-school algorithms, automations, and workflow
        modifications are less sexy but can add up to the efficiencies that a
        business needs.
      </p>
    </div>
  );
}
