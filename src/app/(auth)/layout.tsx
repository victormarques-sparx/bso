import Image from 'next/image';
import { type JSX, type PropsWithChildren } from 'react';

export default function AuthLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <div className="w-lg max-w-full">
        <Image
          src="/logo.png"
          alt="BankSafe One"
          width={320}
          height={32}
          priority
          className="mx-auto"
        />

        {children}
      </div>
    </div>
  );
}
