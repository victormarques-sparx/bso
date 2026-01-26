import type { ComponentProps, PropsWithChildren } from 'react';

export type GridContainerProps = ComponentProps<'div'> &
  PropsWithChildren<{
    className?: string;
  }>;

export type GridRowProps = ComponentProps<'div'> &
  PropsWithChildren<{
    gap?: number;
    className?: string;
  }>;

export type GridColumnProps = ComponentProps<'div'> &
  PropsWithChildren<{
    className?: string;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  }>;
