import { ClientThemeToggle } from '@/components/ui/client-theme-toggle';
import { Navbar } from '@/components/navigation/navbar';
import { DynamicLogo } from '@/components/ui/dynamic-logo';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-10">
      <div className="w-full px-2 sm:px-6 lg:px-4">
        <div className="flex flex-col lg:flex-row ">
          {/* Headline Content */}
          <div
            id="headline"
            className="flex gap-3 p-1 sm:p-2 w-full min-h-0 lg:w-auto lg:shrink-0"
          >
            <div className="flex items-center">
              <DynamicLogo
                width={36}
                height={40}
                className="transition-colors duration-300"
              />
            </div>
            <div className="flex-1 lg:flex-initial min-w-0 py-2">
              <h1 className="text-lg sm:text-xl font-bold text-foreground font-headline leading-tight">
                {title}
              </h1>
              <h6 className="text-xs sm:text-sm text-muted-foreground leading-tight">
                ux designer & front-end coder
              </h6>
            </div>
          </div>
          {/* Nav Content */}
          <div
            id="nav"
            className="flex items-center lg:items-end justify-between py-1 sm:p-2 md:pt-0 w-full lg:flex-1"
          >
            <Navbar />
            <ClientThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
