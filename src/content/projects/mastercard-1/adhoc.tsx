import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AdhocSection() {
  return (
    <div className="">
      <div className="space-y-6">
        <p>
          With the client super frustrated, it was thought I could try leading
          the project and bring in a fresh perspective. Instead of redoing all
          the workshop activities and re-interviewing all the stakeholders
          again, I decided to dive right in. On our virtual calls, I opened up
          Figma and just let them describe how they saw the project and its
          features. While they talked I attempted to sketch out the systems and
          flows they were discussing. It helped that I had a technical
          background and could understand database systems and ETL flows.
        </p>
        <p>
          In each discussion, we had sketches and workflows that they felt happy
          with. More importantly, I learned their trust to keep the talks going.
          As I gained more confidence that I was interpreting their vision
          correctly, I would work with our designers to work out screens to
          flesh out. Those would be shown to the client, get approved, and we
          would then move to the next set of screens to sketch out live. Each
          day would be a bit different as I would drive them toward the priority
          of the day, whether it was wireframes, user stories, or screens to
          react to.
        </p>
        <p>
          Figma prototypes doubled as slide presentations as we were already in
          those files so intensely every day. We could link dynamically each
          workflow as it matured and was worked on.
        </p>
      </div>
      <Image
        src="/images/projects/mastercard-1/mc_2.png"
        alt="wireframe of defining data types in the app"
        width={1440}
        height={1048}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Wireframe where the user would define the data types of the uploaded
        data file.
      </small>

      <Image
        src="/images/projects/mastercard-1/ScreenShot2021-03-17at10.50.35AM.png.png"
        alt="cover slide of figma that outlined the different use cases "
        width={3960}
        height={2574}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Wireframe where the user would define the data types of the uploaded
        data file.
      </small>
    </div>
  );
}
