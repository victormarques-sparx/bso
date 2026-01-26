import { tv } from 'tailwind-variants';

export const selectVariants = tv({
  slots: {
    label: 'mb-2 block text-sm font-medium',
    select:
      'rounded-lg border bg-transparent outline-none h-14 w-full p-4 pr-12 pl-3 text-sm font-medium transition-colors duration-300 appearance-none',
    iconWrapper:
      'pointer-events-none absolute top-1/2 right-4 -translate-y-1/2',
    icon: 'h-5 w-5',
    error: 'text-sm text-red-400',
  },
  variants: {
    error: {
      true: {
        label: 'text-red-400',
        select: 'border-red-400 text-red-400',
        icon: 'text-red-400',
      },
      false: {
        label: 'text-base-700',
        select: 'border-base-300 text-base-700',
        icon: 'text-base-500',
      },
    },
    disabled: {
      true: {
        select: 'cursor-not-allowed opacity-50',
        iconWrapper: 'opacity-50',
      },
      false: {},
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});
