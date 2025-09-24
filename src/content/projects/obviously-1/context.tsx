import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl">Obviously #1</h2>
      <h3 className="text-lg">Building a Design Foundation</h3>
      <p>
        Starting in 2020, I was Obviously’s first UX designer hire. The
        nine-year startup focused on influencer marketing campaigns and
        supporting its custom SASS platform to facilitate these campaigns. The
        company executes campaigns by finding influencers, managing the content
        creation process, and collecting analytics on the collective performance
        of those social media posts. Before I joined, they relied on the
        Engineering team and occasional freelancers to fulfill design needs.
      </p>

      <h2>The Need for Foundation Design</h2>
      <h3>No Consistency</h3>

      <p>
        Years of engineer-led design decisions led to hundreds of
        inconsistencies on the component, page, and architecture levels. Also,
        half-hearted do-overs of the CSS meant it wasn’t an easy fix.
      </p>

      <p>To tackle this, I initiated a series of phases and activities.</p>

      <ul>
        <li>A complete UI audit of every page.</li>
        <li>
          Interviews with the Director of Engineering to get the history the UI
          and CSS front-end stack.
        </li>
        <li>
          Building a brand new Design System with new typography, colors,
          layouts, and components based the existing Bootstrap framework.
        </li>
        <li>Working with Product on where we could implement this safely.</li>
        <li>
          Overhauling an isolated part of the system to completely redo the CSS
          architecture under the new Design System
        </li>
        <li>
          Progressively enhancing sub-system by sub-system until the
          transformation was complete.
        </li>
      </ul>

      <h2>Workshops & Design Thinking</h2>

      <h3>Virtual & In-Person</h3>
      <p>
        As the solo designer, I facilitated over 20 workshops. Not just for
        design but for executive leadership decision making, internal processes,
        and restructuring departmental teams.
      </p>
      <p>
        I would leverage Miro (virtual white boarding) since we were a
        remote-first company. But would get to use traditional post-it notes and
        sharpies for when we met in-person.
      </p>
      <p>
        Outcomes included quarterly roadmaps, new service workflows, and new
        products for the sales team to promote. Sometimes it would be as simple
        as getting alignment and consensus around a business problem.
      </p>

      <img
        src="../caseStudies/obviously/IMG_2624.png"
        alt="colleagues in workshop"
      />

      <h2>Complete Rework of Design Research</h2>

      <p>
        Part of the rebuilding process was to refresh everything that the
        company thought it knew about its users and customers. This involved
        dozens and dozens of interviews with internal users, influencers and
        clients.
      </p>
      <p>Moving forward, we would institute:</p>

      <ul>
        <li>User Personas</li>
        <li>Buyer Personas</li>
        <li>Prototype-based testing</li>
        <li>Design Sprints</li>
      </ul>

      <p>
        <img
          src="../caseStudies/obviously/journeymap.png"
          alt="user journey of internal CS team members"
        />
      </p>
      <h2>Recent Projects with Obviously</h2>

      <ol>
        <li>
          <h3>Efficient Workflows with AI & Automation</h3>
          <p>
            In efforts to scale up to ever bigger campaigns, I worked with
            Product to do a complete audit of the entire execution process from
            pre-sales to campaign reporting. This led to assessing over a dozen
            tools and vendor calls. Experimenting with tools and blending it
            with our data, I was able to spin up a rapid brainstorming process
            for campaign concepts. The main project would be to iterate our
            software platform for better notifications and automated reporting
            to reduce the amount of micro-management our teams were doing.
          </p>
        </li>

        <li>
          <h3>Design Ops</h3>
          <p>
            Working with Engineering, we instituted several changes to the
            Design-Engineering hand-off to include looms and sample front-end
            code. For every JIRA ticketing involving designs, I inserted a
            Design QA step to make sure every design was implemented correctly
            and was mobile-responsive. Separate tickets would be filed as low or
            high priority to not block the overall sprint, but still catch the
            errors. As overall internal visual design needs grew with
            client-facing materials, I built up a JIRA-based design request flow
            to manage the demands.
          </p>
        </li>

        <li>
          <h3>Marketing for Us</h3>
          <p>
            Historically, Obviously only leveraged PR interviews and paid SEO
            for marketing. Later on, when UX and software efforts were under
            control, an internal team was ramped up to handle more extensive
            marketing efforts. I updated our buyer personas, oversaw our team’s
            analysis on our corporate site and leads generation, and helped
            organize a marketing plan based on specific products we sold as
            opposed.
          </p>
        </li>

        <li>
          <h3>Acquisition Transition</h3>
          <p>
            While I was at Obviously, we were acquired by a global advertising
            conglomerate. This transition required a rapid expansion of our
            visual language to account for our new partnership and ways of
            working. In addition, working out how we interfaced with our parent
            companies’ clients via their various forms of relationships.
          </p>
        </li>
      </ol>
    </div>
  );
}
