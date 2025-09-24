import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h2>Complete Rework of Design Research</h2>

      <p>
        Part of the rebuilding process was to refresh everything that the
        company thought it knew about its users and customers. This involved
        dozens and dozens of interviews with internal users, influencers and
        clients.
      </p>
      <p>Moving forward, we would institute:</p>

      <ul className="traditionalBulletedList">
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
    </div>
  );
}
