import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { caseStudyOrder, rankableIds } from '@/lib/contents';
import { TAILORING_COOKIE, parseTailoring } from '@/lib/tailoring';

// Each case study has its own URL; the index opens the first one in the
// visitor's order (tailored or default).
export default async function CaseStudiesIndex() {
  const store = await cookies();
  const tailoring = parseTailoring(
    store.get(TAILORING_COOKIE)?.value,
    rankableIds
  );
  redirect(`/casestudies/${caseStudyOrder(tailoring?.picks)[0]}`);
}
