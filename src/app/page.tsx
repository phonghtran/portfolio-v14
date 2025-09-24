import ChatInterface from '@/components/chat/chat-interface';
import { PageHeader } from '@/components/layout/page-header';
// import { ThemeDebug } from '@/components/ui/theme-debug';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="phonghtran" />
      <main className="flex-1">
        <ChatInterface />
      </main>
      {/* <ThemeDebug /> */}
    </div>
  );
}
