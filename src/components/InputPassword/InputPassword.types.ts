import type { ComponentProps } from 'react';

export interface InputPasswordProps extends Omit<
  ComponentProps<'input'>,
  'type'
> {
  error?: string;
  label: string;
}
