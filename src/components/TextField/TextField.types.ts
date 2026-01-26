import type { ComponentProps } from 'react';

export interface TextFieldProps extends ComponentProps<'input'> {
  error?: string;
  label: string;
}
