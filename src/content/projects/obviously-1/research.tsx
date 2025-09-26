import Image from 'next/image';

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

      <Image
        src="/images/projects/obviously-1/journeymap.png"
        alt="user journey of internal CS team members"
        width={640}
        height={480}
        priority // For above-the-fold images
      />
    </div>
  );
}
