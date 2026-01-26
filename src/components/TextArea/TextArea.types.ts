import type { ComponentProps } from 'react';

export interface TextAreaProps extends ComponentProps<'textarea'> {
  error?: string;
  label: string;
}
