import { Container } from '@/components';
import { cn } from '@/utils';
import Link from 'next/link';
import type { JSX } from 'react';

export default function NotFound(): JSX.Element {
  return (
    <Container className="flex min-h-screen items-center justify-center py-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="text-base-700 text-[30px] font-bold">
            BankSafe One
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-base-700 text-6xl font-bold">404</h1>
          <h2 className="text-base-60 text-2xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-base-500 text-sm">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className={cn(
            'bg-base-300 hover:bg-base-500',
            'flex items-center justify-center gap-2',
            'h-12 rounded-lg px-6 py-3',
            'transition-colors duration-300'
          )}
        >
          <span className="text-base-60 text-sm font-semibold">
            Go back home
          </span>
        </Link>
      </div>
    </Container>
  );
}
