import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
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
