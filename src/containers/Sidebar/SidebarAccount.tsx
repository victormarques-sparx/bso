'use client';

import type { UserProps } from '@/api';
import { Avatar, Button } from '@/components';
import { getUserCookie, onLogout } from '@/services';
import { useEffect, useState, type JSX } from 'react';

export const SidebarAccount = (): JSX.Element => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setUser(getUserCookie() ?? null);
      setIsHydrated(true);
    });
  }, []);

  return (
    <div className="px-6 py-8">
      <div className="border-base-100 mb-4 grid gap-1 border-t pt-5">
        {!isHydrated || !user ? (
          <>
            <div className="bg-gray-border h-12 w-12 animate-pulse rounded-full"></div>

            <div className="bg-gray-border h-4 w-3/4 animate-pulse rounded"></div>

            <div className="bg-gray-border h-4 w-1/2 animate-pulse rounded"></div>
          </>
        ) : (
          <>
            <Avatar name={user.firstName} />

            <p>
              {user.firstName} {user.lastName}
            </p>
            <p className="text-base-500 text-sm">{user.email}</p>
          </>
        )}
      </div>

      <Button fullWidth variant="outline" onClick={() => onLogout(true)}>
        Logout
      </Button>
    </div>
  );
};
