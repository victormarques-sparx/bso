import type { ComponentProps } from 'react';

export interface SelectProps extends ComponentProps<'select'> {
  options: { label: string; value: string; disabled?: boolean }[];
  error?: string;
  label: string;
  placeholder?: string;
}
