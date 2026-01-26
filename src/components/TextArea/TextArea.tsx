import { cn } from '@/utils';
import type { JSX } from 'react';
import type { TextAreaProps } from './TextArea.types';

export const TextArea = ({
  label,
  error,
  className,
  ...textareaProps
}: TextAreaProps): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={textareaProps.name}
        className={cn(
          'mb-2 block text-sm font-medium',
          error ? 'text-red-400' : 'text-base-700'
        )}
      >
        {label}
      </label>

      <textarea
        {...textareaProps}
        className={cn(
          'rounded-lg border bg-transparent outline-none',
          'min-h-32 w-full resize-none p-4 text-sm font-medium',
          'transition-colors duration-300',
          error
            ? 'border-red-400 text-red-400 placeholder:opacity-80'
            : 'border-base-300 text-base-700 placeholder:opacity-40',
          className
        )}
      />

      {error && (
        <span className="-mt-1 block text-sm text-red-400">{error}</span>
      )}
    </div>
  );
};
