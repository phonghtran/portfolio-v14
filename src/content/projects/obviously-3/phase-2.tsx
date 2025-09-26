import Image from 'next/image';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h3>Phase 2: Automate the Repetition</h3>

      <p>
        Through interviews, we uncovered many hacks" our team was doing to
        accomplish their tasks. An example would be that they often had to do
        multiple rounds of looking for creators to sign up. Each search could
        often result in the same people appearing over and over because they
        match the criteria of each search.
      </p>
      <p>
        Our software historically assumed one search was adequate because the
        client would maintain more static list of creators they liked to work
        with. But today, clients want a fresh pool of creators each time to
        reach new audiences.
      </p>
      <p>
        Our software historically assumed one search was adequate because the
        client would maintain a more static list of creators they liked to work
        with. But today, clients want a fresh pool of creators each time to
        reach new audiences.
      </p>
      <p>
        This and dozens of other automations were implemented to remove all the
        repetitive tasks that computers have always done better than humans.
        This isn't AI but can be incredibly effective.
      </p>
      <p>
        Fancier tricks do require fancier tech, however, as our backlog included
        machine learning. Often, our team has an intuition of a good creator for
        a client and adds special parameters to their searches. If we could
        convert them into tags and crunch the data that we have exclusively such
        as their performance metrics and history--we could apply those profiles
        to the overall creator network that we have. This would enrich every
        search moving forward.
      </p>
      <p>
        Then collecting data from phase 1, we could even optimize how we
        construct more contracts and set up the timelines to better scale the
        business. This could be applied to the programmed business logic of
        warnings and notifications to better hone those parameters dynamically
        over time.
      </p>

      <Image
        src="/images/projects/obviously-3/checklist.png"
        alt="mockup of new vetting card"
        width={1380}
        height={1446}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Quick mockup of new functionality to stakeholders. The key is the
        central checklist which can receive tasks from humans or any AI
        automations being run.
      </small>
    </div>
  );
}
