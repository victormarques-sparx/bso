import { CheckUserInstitutions } from '@/containers';
import { QueryProvider, ToasterProvider } from '@/providers';
import '@/theme/globals.css';
import { cn } from '@/utils';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import { type JSX, type PropsWithChildren } from 'react';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BankSafe One',
  description: 'BankSafe One',
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang="en">
      <body className={cn(figtree.variable, 'antialiased')}>
        <QueryProvider>
          <ToasterProvider />
          <CheckUserInstitutions />

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
