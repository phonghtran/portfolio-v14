import ChatInterface from '@/components/chat/chat-interface';
import { PillBottle, User } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <PillBottle className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-headline">
                phonghtran - ux designer & front-end coder
              </h1>
            </div>
            <nav>
              <Link 
                href="/about" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                New Page
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
}
