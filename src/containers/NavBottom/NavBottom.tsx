'use client';

import { Drawer } from '@/components';
import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, type JSX } from 'react';
import {
  IoBusiness,
  IoBusinessOutline,
  IoHelpCircle,
  IoHelpCircleOutline,
  IoHome,
  IoHomeOutline,
  IoPerson,
  IoPersonOutline,
  IoSwapHorizontal,
} from 'react-icons/io5';
import { SidebarAccount } from '../Sidebar/SidebarAccount';
import { SidebarHeader } from '../Sidebar/SidebarHeader';

export const NavBottom = (): JSX.Element => {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  const navigationSections = useMemo(
    () => [
      {
        href: '/support',
        label: 'Support',
        icon: IoHelpCircleOutline,
        iconActive: IoHelpCircle,
        enabled: true,
      },
      {
        href: '/',
        label: 'Home',
        icon: IoHomeOutline,
        iconActive: IoHome,
        enabled: true,
      },
      {
        href: '/my-institutions',
        label: 'My Institutions',
        icon: IoBusinessOutline,
        iconActive: IoBusiness,
        enabled: true,
      },
      {
        href: '/transactions',
        label: 'Transactions',
        icon: IoSwapHorizontal,
        iconActive: IoSwapHorizontal,
        enabled: true,
      },
    ],
    []
  );

  return (
    <>
      <div
        className={cn(
          'fixed bottom-0 left-0 flex h-16',
          'w-full rounded-t-3xl bg-white',
          'flex items-center justify-between px-6 py-4'
        )}
      >
        <button
          className={cn(
            'flex flex-col items-center justify-center',
            'w-28 gap-1',
            openMenu ? 'text-base-600 font-bold' : 'text-base-500'
          )}
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <IoPerson size={20} /> : <IoPersonOutline size={20} />}
          <span className="hidden text-sm md:block">Menu</span>
        </button>

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
                'flex flex-col items-center justify-center',
                'w-28 gap-1',
                isActive ? 'text-base-600 font-bold' : 'text-base-500'
              )}
            >
              {!openMenu && isActive ? (
                <section.iconActive size={20} />
              ) : (
                <section.icon size={20} />
              )}
              <span className="hidden text-sm md:block">{section.label}</span>
            </Link>
          );
        })}
      </div>

      <Drawer
        isOpen={openMenu}
        position="left"
        onClose={() => setOpenMenu(false)}
      >
        <div className="flex h-full w-80 flex-col justify-between">
          <SidebarHeader />
          <SidebarAccount />
        </div>
      </Drawer>
    </>
  );
};
