import { tv } from 'tailwind-variants';

export const textFieldVariants = tv({
  slots: {
    label: 'mb-2 block text-sm font-medium',
    input:
      'rounded-lg border bg-transparent outline-none h-14 w-full p-4 text-sm font-medium transition-colors duration-300',
    error: 'text-sm text-red-400',
  },
  variants: {
    error: {
      true: {
        label: 'text-red-400',
        input: 'border-red-400 text-red-400 placeholder:opacity-80',
      },
      false: {
        label: 'text-base-700',
        input: 'border-base-300 text-base-700 placeholder:opacity-40',
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});
