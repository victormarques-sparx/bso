'use client';

import type { UserProps } from '@/api';
import { Button, Container } from '@/components';
import { getUserCookie, onLogout } from '@/services';
import Image from 'next/image';
import { useEffect, useState, type JSX } from 'react';

export default function Home(): JSX.Element {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  useEffect(() => {
    // Atualiza após a hidratação de forma assíncrona para evitar cascading renders
    requestAnimationFrame(() => {
      const loadedUser = getUserCookie();
      if (loadedUser) {
        setUser(loadedUser);
      }
    });
  }, []);

  return (
    <Container className="flex h-full flex-col items-center justify-center py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-10 text-center">
        <Image
          src="/logo.png"
          alt="BankSafe One"
          width={320}
          height={32}
          priority
        />

        <div className="space-y-3">
          <h1
            className="text-base-800 text-2xl font-semibold tracking-tight sm:text-3xl"
            suppressHydrationWarning
          >
            {user?.firstName
              ? `Welcome back, ${user.firstName}!`
              : 'Welcome back'}
          </h1>
          <p className="text-base-500 text-sm leading-relaxed sm:text-base">
            We&apos;re making this space better for you.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => onLogout(true)} variant="outline">
            Sign out
          </Button>
        </div>
      </div>
    </Container>
  );
}
