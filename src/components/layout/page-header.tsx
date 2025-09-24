import { ClientThemeToggle } from '@/components/ui/client-theme-toggle';
import { Navbar } from '@/components/navigation/navbar';
import Image from 'next/image';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-10">
      <div className=" w-full px-2 sm:px-6 lg:px-4">
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
                {title}
              </h1>
              <h6>ux designer & front-end coder</h6>
            </div>
            <Navbar />
          </div>
          <div className="flex items-center gap-4">
            <ClientThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
