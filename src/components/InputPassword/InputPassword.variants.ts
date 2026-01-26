import { tv } from 'tailwind-variants';

export const inputPasswordVariants = tv({
  slots: {
    label: 'mb-2 block text-sm font-medium',
    input:
      'rounded-lg border bg-transparent outline-none h-14 w-full pr-12 pl-4 text-sm font-medium transition-colors duration-300',
    toggle:
      'absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium transition-colors duration-300',
    error: 'text-sm text-red-400',
  },
  variants: {
    error: {
      true: {
        label: 'text-red-400',
        input: 'border-red-400 text-red-400 placeholder:opacity-80',
        toggle: 'text-red-400',
      },
      false: {
        label: 'text-base-700',
        input: 'border-base-300 text-base-700 placeholder:opacity-40',
        toggle: 'text-base-500 hover:text-base-700',
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});
