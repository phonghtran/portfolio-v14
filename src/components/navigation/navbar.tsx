'use client';

import { Home, BriefcaseBusiness, Mail, File } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/casestudies',
    label: 'Case Studies',
    icon: BriefcaseBusiness,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: Mail,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            )}
          >
            <Icon className="h-4 w-4" />
            <div className={cn('sm:block', isActive ? 'block' : 'hidden')}>
              {label}
            </div>
          </Link>
        );
      })}

      <Link
        href="https://drive.google.com/file/d/1mV6YmcOtbtGZBgOERzwr5SmDBpGyNkNU/view?usp=sharing"
        target="_blank"
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/50'
        )}
      >
        <File className="h-4 w-4" />
        <div className={cn('sm:block hidden')}>Resume</div>
      </Link>
    </nav>
  );
}
