import { cn } from '@/utils';
import type { JSX } from 'react';
import type { SelectProps } from './Select.types';
import { selectVariants } from './Select.variants';

export const Select = ({
  label,
  error,
  className,
  options,
  placeholder,
  ...selectProps
}: SelectProps): JSX.Element => {
  const {
    label: labelClass,
    select: selectClass,
    iconWrapper: iconWrapperClass,
    icon: iconClass,
    error: errorClass,
  } = selectVariants({
    error: !!error,
    disabled: !!selectProps.disabled,
  });

  return (
    <div>
      <label htmlFor={selectProps.name} className={labelClass()}>
        {label}
      </label>

      <div className="relative">
        <select {...selectProps} className={cn(selectClass(), className)}>
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className={iconWrapperClass()}>
          <svg
            className={iconClass()}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error && <span className={errorClass()}>{error}</span>}
    </div>
  );
};
