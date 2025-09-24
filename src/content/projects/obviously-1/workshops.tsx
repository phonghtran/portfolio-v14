import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
