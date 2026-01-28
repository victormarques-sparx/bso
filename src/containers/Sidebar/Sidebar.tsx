import type { JSX } from 'react';
import { SidebarAccount } from './SidebarAccount';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';

export const Sidebar = (): JSX.Element => {
  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col rounded-tr-3xl rounded-br-3xl bg-white">
      <SidebarHeader />

      <SidebarNavigation />

      <SidebarAccount />
    </aside>
  );
};
