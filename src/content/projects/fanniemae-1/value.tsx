import Image from 'next/image';

export default function CodingSection() {
  return (
    <div className="space-y-6">
      <p>So why? Let's explore all the different why's.</p>
      <ol className="traditionalOrderedList">
        <li>
          <b>Why keep the old system?</b>
          There still is a lot of scheduled jobs and specific logic that only
          exists in that system. It will take years for each individual team to
          strip out their set of functions into something more modular or
          robust.
        </li>
        <li>
          <b>Why make this feature request so much more complicated?</b>
          <p>
            What's exciting about these APIs is that they can be used
            generically by any other product or team. One being a "product
            identification" system, now any business unit can build their
            catalog of products via this system and send it to any niche pricing
            system.
          </p>
          <p>
            This also finally allowed the team to sunset existing third-party
            software that also took months to update.
          </p>

          <p>
            Ultimately, it was also faster to develop with more modern tech
            stack that wasn't hindered by legacy decisions.
          </p>
        </li>

        <li>
          <b>Why not do an smaller MVP?</b>
          <p>
            For Fannie Mae, this was faster. Often even the front-end UI at
            Fannie Mae has tech debt. Because the core of the features are now
            API calls, we could select the easiest temporary home for admin
            users to use and configure.
          </p>

          <p>
            If tomorrow Fannie Mae suddenly trashes its tech stack, the team can
            quickly stand-up the functionality in any front end environment.
          </p>
        </li>
      </ol>

      <Image
        src="/images/projects/fanniemae-1/bubd_IMG_2486.jpg"
        alt="mapping all the ways of executing the plan"
        width={1200}
        height={986}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Documenting all the possible ways of executing the plan by working with
        engineers to really understand how all the systems connect together.
      </small>
    </div>
  );
}
