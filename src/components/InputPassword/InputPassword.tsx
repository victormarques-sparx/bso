'use client';

import { cn } from '@/utils';
import { useState, type JSX } from 'react';
import type { InputPasswordProps } from './InputPassword.types';
import { inputPasswordVariants } from './InputPassword.variants';

export const InputPassword = ({
  label,
  error,
  className,
  ...inputProps
}: InputPasswordProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    label: labelClass,
    input: inputClass,
    toggle: toggleClass,
    error: errorClass,
  } = inputPasswordVariants({ error: !!error });

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      <label htmlFor={inputProps.name} className={labelClass()}>
        {label}
      </label>

      <div className="relative">
        <input
          {...inputProps}
          type={showPassword ? 'text' : 'password'}
          className={cn(inputClass(), className)}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={toggleClass()}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {error && <span className={errorClass()}>{error}</span>}
    </div>
  );
};
