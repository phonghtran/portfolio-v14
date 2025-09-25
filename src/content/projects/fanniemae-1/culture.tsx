import Image from 'next/image';

export default function CodingSection() {
  return (
    <div className="space-y-6">
      <p>
        So first my role was to stop this cycle and introduce more robust
        methods to vet these requests. We embarked on discovery that cut across
        all the disciplines: product, design, and technology. We used a
        combination of journey mapping (also called "event storming" at Fannie
        Mae) and user interviews to identify more root issues and where it fit
        into the overall business processes.
      </p>
      <p>
        From there, we assessed the technology we had at hand. You can imagine
        there were hurdles there. The main heart of the pricing platform is a
        monolithic mess of tech debt, but also owned by another team. Any
        attempt to change that monolith would often result in timelines that
        stretched into months if not years.
      </p>

      <Image
        src="/images/projects/fanniemae-1/Edit_Waterfall-job_10.jpg"
        alt="final mockup of the product"
        width={1200}
        height={927}
        className="w-full h-auto object-contain rounded"
      />
      <small>One of the final screens for the product.</small>
    </div>
  );
}
