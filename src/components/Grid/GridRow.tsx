import { cn } from '@/utils';
import type { JSX } from 'react';
import { Children, isValidElement } from 'react';
import type { GridRowProps } from './Grid.types';

// Mapeamento de gaps para garantir que o Tailwind inclua no build
const gapMap: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
};

export const Row = ({
  children,
  className,
  gap = 8,
}: GridRowProps): JSX.Element => {
  // Check if any child has no breakpoints (will use flex-1)
  const hasFlexChildren = Children.toArray(children).some(child => {
    if (isValidElement(child) && child.props) {
      const props = child.props as {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
      return (
        props.xs === undefined &&
        props.sm === undefined &&
        props.md === undefined &&
        props.lg === undefined &&
        props.xl === undefined
      );
    }
    return false;
  });

  // Use flex if any child has no breakpoints, otherwise use grid
  const layoutClass = hasFlexChildren ? 'flex' : 'grid grid-cols-12';
  const gapClass = gapMap[gap] || `gap-${gap}`;

  return <div className={cn(layoutClass, gapClass, className)}>{children}</div>;
};
