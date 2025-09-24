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

      <Image
        src="/images/projects/obviously-3/statusboard.png"
        alt="status board of tasks to deadlines"
        width={1429}
        height={755}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Retrofitting the old admin UI to display alerts and deadlines automated
        by the platform.
      </small>
    </div>
  );
}
