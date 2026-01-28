import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

export const SidebarHeader = (): JSX.Element => {
  return (
    <header className="px-6 py-8">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={124} height={37} />
      </Link>
    </header>
  );
};
