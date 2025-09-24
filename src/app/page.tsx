import ChatInterface from '@/components/chat/chat-interface';
import { User } from 'lucide-react';
import Link from 'next/link';
import { ClientThemeToggle } from '@/components/ui/client-theme-toggle';
import Image from 'next/image';
// import { ThemeDebug } from '@/components/ui/theme-debug';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/phong_red_transparent_300dpi.png"
                alt="logo of phonghtran"
                width={36}
                height={36}
                priority // For above-the-fold images
              />
              <div>
                <h1 className="text-xl font-bold text-foreground font-headline">
                  phonghtran
                </h1>
                <h6>ux designer & front-end coder</h6>
              </div>
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-4 w-4" />
                About
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              <ClientThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <ChatInterface />
      </main>
      {/* <ThemeDebug /> */}
    </div>
  );
}
