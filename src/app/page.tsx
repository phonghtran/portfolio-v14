import ChatInterface from '@/components/chat/chat-interface';
import { PageHeader } from '@/components/layout/page-header';
// import { ThemeDebug } from '@/components/ui/theme-debug';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <PageHeader title="phonghtran" />
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
      {/* <ThemeDebug /> */}
    </div>
  );
}
