import { cn } from '@/utils';
import type { JSX } from 'react';
import type { TextFieldProps } from './TextField.types';
import { textFieldVariants } from './TextField.variants';

export const TextField = ({
  label,
  error,
  className,
  ...inputProps
}: TextFieldProps): JSX.Element => {
  const { label: labelClass, input: inputClass, error: errorClass } = textFieldVariants({
    error: !!error,
  });

  return (
    <div className="w-full flex-1">
      <label
        htmlFor={inputProps.name}
        className={labelClass()}
      >
        {label}
      </label>

      <input
        {...inputProps}
        type={inputProps.type ?? 'text'}
        className={cn(inputClass(), className)}
      />

      {error && <span className={errorClass()}>{error}</span>}
    </div>
  );
};
