import type { ComponentProps } from 'react';

export type ButtonVariantTypes = 'primary' | 'secondary' | 'outline';
export type ButtonSizeTypes = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariantTypes;
  size?: ButtonSizeTypes;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}
