import { cookies } from 'next/headers';
import { HomeView } from '@/components/home/home-view';
import { rankableIds } from '@/lib/contents';
import { TAILORING_COOKIE, parseTailoring } from '@/lib/tailoring';

// Reading the tailoring cookie on the server means a returning visitor's
// homepage renders already in their order, with no flash of the default.
export default async function Home() {
  const store = await cookies();
  const initialTailoring = parseTailoring(
    store.get(TAILORING_COOKIE)?.value,
    rankableIds
  );
  return <HomeView initialTailoring={initialTailoring} />;
}
