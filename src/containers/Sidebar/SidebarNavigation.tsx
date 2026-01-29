'use client';

import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, type JSX } from 'react';
import {
  IoBusinessOutline,
  IoHelpCircleOutline,
  IoHomeOutline,
  IoSwapHorizontal,
} from 'react-icons/io5';

export const SidebarNavigation = (): JSX.Element => {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  const navigationSections = useMemo(
    () => [
      {
        href: '/',
        label: 'Home',
        icon: IoHomeOutline,
        enabled: true,
      },
      {
        href: '/transactions',
        label: 'Transactions',
        icon: IoSwapHorizontal,
        enabled: true,
      },
      {
        href: '/my-institutions',
        label: 'My Institutions',
        icon: IoBusinessOutline,
        enabled: true,
      },
      {
        href: '/support',
        label: 'Support',
        icon: IoHelpCircleOutline,
        enabled: true,
      },
    ],
    []
  );

  return (
    <nav className="flex flex-1 flex-col">
      {navigationSections.map(section => {
        if (!section.enabled) return null;

        const exactOnly = ['/', '/bso-web'].includes(section.href);
        const isActive =
          isHydrated &&
          (exactOnly
            ? pathname === section.href || pathname === section.href + '/'
            : pathname === section.href ||
              pathname.startsWith(section.href + '/'));

        return (
          <Link
            key={section.href}
            href={section.href}
            className={cn(
              'hover:text-base-600 relative flex h-10 items-center gap-2.5 pl-6 transition-colors duration-300',
              isActive ? 'text-base-600 font-bold' : 'text-base-500'
            )}
          >
            {isActive && (
              <span className="bg-base-600 absolute top-0 left-0 h-full w-1 rounded-tr-lg rounded-br-lg" />
            )}

            <section.icon size={20} />

            <span>{section.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
