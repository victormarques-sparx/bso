import { cn } from '@/utils';
import type { JSX } from 'react';
import type { GridColumnProps } from './Grid.types';

// Força o Tailwind a incluir todas as classes possíveis

const _tailwindClasses = [
  'col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6',
  'col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12',
  'sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6',
  'sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12',
  'md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6',
  'md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12',
  'lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6',
  'lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12',
  'xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6',
  'xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12',
];

// Mapeamento para xs (classes base, sem prefixo de breakpoint)
const xsColSpanMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

// Mapeamento completo de todas as classes possíveis para breakpoints
// Isso garante que o Tailwind as inclua no build
const colSpanMap: Record<'sm' | 'md' | 'lg' | 'xl', Record<number, string>> = {
  sm: {
    1: 'sm:col-span-1',
    2: 'sm:col-span-2',
    3: 'sm:col-span-3',
    4: 'sm:col-span-4',
    5: 'sm:col-span-5',
    6: 'sm:col-span-6',
    7: 'sm:col-span-7',
    8: 'sm:col-span-8',
    9: 'sm:col-span-9',
    10: 'sm:col-span-10',
    11: 'sm:col-span-11',
    12: 'sm:col-span-12',
  },
  md: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  },
  lg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  },
  xl: {
    1: 'xl:col-span-1',
    2: 'xl:col-span-2',
    3: 'xl:col-span-3',
    4: 'xl:col-span-4',
    5: 'xl:col-span-5',
    6: 'xl:col-span-6',
    7: 'xl:col-span-7',
    8: 'xl:col-span-8',
    9: 'xl:col-span-9',
    10: 'xl:col-span-10',
    11: 'xl:col-span-11',
    12: 'xl:col-span-12',
  },
};

export const Col = ({
  children,
  className,
  xs,
  sm,
  md,
  lg,
  xl,
}: GridColumnProps): JSX.Element => {
  const hasBreakpoints =
    xs !== undefined ||
    sm !== undefined ||
    md !== undefined ||
    lg !== undefined ||
    xl !== undefined;

  // Para xs, usamos classes base (sem prefixo) já que xs não é um breakpoint padrão do Tailwind
  const xsClass =
    xs !== undefined
      ? xsColSpanMap[xs as keyof typeof xsColSpanMap]
      : undefined;

  // Determina a classe base
  // Se xs é fornecido, usa ele. Caso contrário, se há outros breakpoints usa col-span-12, senão flex-1
  let baseClass: string;
  if (xs !== undefined) {
    baseClass = xsClass!;
  } else if (hasBreakpoints) {
    baseClass = 'col-span-12';
  } else {
    baseClass = 'flex-1';
  }

  // Coleta todas as classes responsivas
  const responsiveClasses: (string | boolean)[] = [];

  if (sm !== undefined) {
    responsiveClasses.push(colSpanMap.sm[sm as keyof typeof colSpanMap.sm]);
  }
  if (md !== undefined) {
    responsiveClasses.push(colSpanMap.md[md as keyof typeof colSpanMap.md]);
  }
  if (lg !== undefined) {
    responsiveClasses.push(colSpanMap.lg[lg as keyof typeof colSpanMap.lg]);
  }
  if (xl !== undefined) {
    responsiveClasses.push(colSpanMap.xl[xl as keyof typeof colSpanMap.xl]);
  }

  const classes = [
    baseClass,
    ...responsiveClasses.filter(Boolean),
    className,
  ].filter(Boolean);

  return <div className={cn(...classes)}>{children}</div>;
};
