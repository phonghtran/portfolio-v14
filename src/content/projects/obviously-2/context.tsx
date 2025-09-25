import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';

export default function ContextSection() {
  return (
    <div className="space-y-6">
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

      <BeforeAfterSlider
        afterImage="/images/projects/obviously-2/tracker.png"
        beforeImage="/images/projects/obviously-2/signupq.png"
        beforeAlt="Original UI design with inconsistencies"
        afterAlt="New design system implementation"
        initialPosition={30}
        autoPlay={true}
        className="max-w-4xl"
      />
    </div>
  );
}
