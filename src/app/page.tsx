'use client';

import type { UserProps } from '@/api';
import { Button, Container, Modal } from '@/components';
import { BASE_PATH } from '@/constants';
import { Footer } from '@/containers';
import { getUserCookie, onLogout } from '@/services';
import { cn } from '@/utils';
import Image from 'next/image';
import { useEffect, useState, type JSX } from 'react';

export default function Home(): JSX.Element {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [popConfirmOpen, setPopConfirmOpen] = useState(false);

  useEffect(() => {
    // Atualiza após a hidratação de forma assíncrona para evitar cascading renders
    requestAnimationFrame(() => {
      const loadedUser = getUserCookie();
      if (loadedUser) {
        setUser(loadedUser);
        setPopConfirmOpen(loadedUser.institutions.length > 0);
      }
    });
  }, []);

  return (
    <>
      <Modal title="Data under analysis" isOpen={popConfirmOpen}>
        <p className="mb-6">
          Your account and your institutions are being analyzed. We will contact
          you once it is complete.
        </p>

        <Button
          variant="outline"
          onClick={() => setPopConfirmOpen(false)}
          fullWidth
        >
          Got it
        </Button>
      </Modal>

      <Container className="flex min-h-[calc(100vh-89px)] flex-col items-center justify-center py-12">
        <div className="flex w-full max-w-md flex-col items-center gap-10 text-center">
          <Image
            src={`${BASE_PATH}/logo.png`}
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
              Your information has been sent for analysis.
              <br />
              We will contact you once it is complete.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => onLogout(true)}
              className={cn(
                'h-11 rounded-lg px-5 text-sm font-medium',
                'border-base-300 border bg-transparent',
                'text-base-600 transition-colors duration-200',
                'hover:border-base-400 hover:bg-base-200 hover:text-base-700'
              )}
            >
              Sign out
            </button>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
