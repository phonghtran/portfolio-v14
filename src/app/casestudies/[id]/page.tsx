import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyView } from '@/components/case-study/case-study-view';
import { projects } from '@/lib/projects-data';

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }));
}

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
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) notFound();
  return <CaseStudyView index={index} />;
}
