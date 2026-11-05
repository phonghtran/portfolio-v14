import { redirect } from 'next/navigation';
import { projects } from '@/lib/projects-data';

// Each case study has its own URL now; the index opens the first one.
export default function CaseStudiesIndex() {
  redirect(`/casestudies/${projects[0].id}`);
}
