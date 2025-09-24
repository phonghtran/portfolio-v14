import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h3>Phase 1: Breaking the Anxiety Loop</h3>

      <p>
        The most glaring discovery was that none of our software tasks took that
        much time, but it was hidden in both the workflow and time tracking:
        keeping everyone on the team and the client informed of updates. As
        clients got bigger, they were increasingly anxious that things were
        progressing well. This meant each of our team members down the chain was
        investigating all big and little issues to allay that anxiety.
      </p>
      <p>
        Also, ironically time tracking and status tracking internally became a
        time suck in itself.
      </p>
      <p>
        So phase 1 was to realize that since everything ultimately has to be
        done within our software, we could easily use heuristics to determine
        how the campaign was doing and tracked against the timelines. We could
        even time track automatically because we could determine which clicks
        happened when and by whom.
      </p>
      <p>
        By applying the thresholds that the team intuited we could program that
        logic into warnings and notifications. For example, "I know my client
        gets worried if only 80% of people are hired within 24 hours of the
        deadline."
      </p>
      <p>
        We refactored everyone's homepage and every detail page of every
        campaign and contract to show its progress and thresholds. Eliminating
        the dozens of spreadsheet trackers the teams had built and the number of
        daily meetings and slack messages to update each other.
      </p>

      <p>
        <img
          src="../caseStudies/obvEff/searchauto.png"
          alt="mockups of advanced search"
        />
        <small>
          Updating the basic search with automations, sorting by attributes, and
          batch actions.
        </small>
      </p>

      <Image
        src="/images/projects/obviously-3/searchauto.png"
        alt="mockups of advanced search"
        width={2350}
        height={2888}
        className="w-full h-auto object-contain rounded"
      />
      <small>
        Updating the basic search with automations, sorting by attributes, and
        batch actions.
      </small>
    </div>
  );
}
