import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 font-semibold',
  variants: {
    variant: {
      primary: 'bg-base-300 text-base-600 hover:bg-base-400',
      secondary: 'bg-base-400 text-base-700 hover:bg-base-500',
      outline:
        'border border-base-300 bg-transparent text-base-600 hover:border-base-400 hover:bg-base-200 hover:text-base-700',
    },
    size: {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-4 text-sm',
      lg: 'h-14 px-6 text-base',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      class: 'hover:bg-base-300',
    },
    {
      variant: 'secondary',
      disabled: true,
      class: 'hover:bg-base-400',
    },
    {
      variant: 'outline',
      disabled: true,
      class: 'hover:border-base-300 hover:bg-transparent hover:text-base-600',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
});

export const buttonSpinnerVariants = tv({
  base: 'animate-spin',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
