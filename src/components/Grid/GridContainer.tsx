import { cn } from '@/utils';
import type { JSX } from 'react';
import type { GridContainerProps } from './Grid.types';

export const Container = ({
  children,
  className,
}: GridContainerProps): JSX.Element => {
  return (
    <div className={cn('container mx-auto px-4', className)}>{children}</div>
  );
};
