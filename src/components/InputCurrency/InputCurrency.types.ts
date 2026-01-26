import type { ComponentProps } from 'react';

export interface InputCurrencyProps extends Omit<
  ComponentProps<'input'>,
  'type' | 'value'
> {
  error?: string;
  label: string;
  value?: number | string;
}
