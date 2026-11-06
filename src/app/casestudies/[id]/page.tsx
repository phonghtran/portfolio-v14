import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { CaseStudyView } from '@/components/case-study/case-study-view';
import { caseStudyOrder, rankableIds } from '@/lib/contents';
import { projects } from '@/lib/projects-data';
import { TAILORING_COOKIE, parseTailoring } from '@/lib/tailoring';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);
  return project
    ? { title: `${project.title} · Phong Tran`, description: project.subtitle }
    : {};
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!projects.some(p => p.id === id)) notFound();

  // Follow the visitor's tailored homepage order when there is one, so
  // previous/next and "n of 7" match the contents they came from.
  const store = await cookies();
  const tailoring = parseTailoring(
    store.get(TAILORING_COOKIE)?.value,
    rankableIds
  );
  return <CaseStudyView id={id} order={caseStudyOrder(tailoring?.picks)} />;
}
