import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function ContextSection() {
  return (
    <div className="space-y-6">
      <h3>Phase 3: A Smarter "First Pass" with AI & Contractors</h3>

      <p>
        Finally, AI comes into play. A huge gap with LLMs, the main engine that
        powers AI today, is that it has little bearing on our specialized
        workflows and campaigns.
      </p>
      <p>
        We don't need asset generation because our entire business is to collect
        novel content from social media influencers and creators. We don't need
        prompts because that's the role of our strategists with our clients.
        Also, it's hard to automate the communication channels because often the
        client-team comms are about the specific campaign itself that only lasts
        3-6 months.
      </p>
      <p>
        So even an AI trained on our data and platform would have to be able to
        delineate each client, contract, and campaign without contamination.
      </p>
      <p>
        However, we realized we could lightly apply AI to specific tasks. The AI
        would do the "first pass." It would never make any official changes or
        official communications to the client, but rather draft the first pass
        of suggestions or findings for a team member to verify.
      </p>
      <p>
        For example, we could let it parse all the captions in the system and
        build a list of suggestions like a spell checker. Or digest a creative
        brief and suggest starter ideas for the creators hired for the campaign.
      </p>
      <p>
        Very small admittedly but that's the state of AI when we looked into
        during the summer of 2023. I'm sure if we invested in RAGs and federated
        the data we were fed by clients, we could formulate more ambitious AI
        automations.
      </p>
    </div>
  );
}
