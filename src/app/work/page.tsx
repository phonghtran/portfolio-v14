import { PageHeader } from '@/components/layout/page-header';

export default function About() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Work - phonghtran" />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>

          <div className="max-w-none">
            <p className="text-lg text-muted-foreground mb-4">Projects</p>
          </div>
        </div>
      </main>
    </div>
  );
}
