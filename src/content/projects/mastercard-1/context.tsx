import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        It’s one of those projects where it’s less about the UX and designs, but
        more about the approach and meeting the client where they are. The
        client team had a vision for a streamlined internal process of data
        ingest and visualization. However, the existing team was having trouble
        translating the requirements and desires into designs that matched the
        clients’ wants.
      </p>

      <Image
        src="/images/projects/mastercard-1/mc_3.png"
        alt="wireframe of portal homepage"
        width={8227}
        height={5955}
        className="w-full h-auto object-contain rounded"
      />
      <small>Wireframe of a dashboard acting as the app's homepage.</small>

      <Image
        src="/images/projects/mastercard-1/mc_1.jpg"
        alt="Initial stakeholder mapping"
        width={8227}
        height={5955}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        One of the many virtual meetings where we guided the client through
        articulating their needs into user stories and app features.
      </small>
    </div>
  );
}
