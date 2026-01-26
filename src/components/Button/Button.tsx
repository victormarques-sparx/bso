import { cn } from '@/utils';
import type { JSX } from 'react';
import type { ButtonProps } from './Button.types';
import { buttonSpinnerVariants, buttonVariants } from './Button.variants';

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  fullWidth = false,
  disabled,
  className,
  children,
  ...buttonProps
}: ButtonProps): JSX.Element => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...buttonProps}
      disabled={isDisabled}
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
          disabled: isDisabled,
        }),
        className
      )}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <svg
            className={buttonSpinnerVariants({ size })}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
};
