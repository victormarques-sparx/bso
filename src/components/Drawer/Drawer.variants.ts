import { tv } from 'tailwind-variants';

export const drawerVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 bg-base-700/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
    content:
      'fixed top-0 h-full bg-base-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto will-change-transform',
  },
  variants: {
    isOpen: {
      true: {
        overlay: 'opacity-100',
      },
      false: {
        overlay: 'opacity-0 pointer-events-none',
      },
    },
    position: {
      left: {
        content: 'left-0',
      },
      right: {
        content: 'right-0',
      },
    },
  },
  compoundVariants: [
    {
      isOpen: true,
      position: 'left',
      class: {
        content: 'translate-x-0',
      },
    },
    {
      isOpen: false,
      position: 'left',
      class: {
        content: '-translate-x-full',
      },
    },
    {
      isOpen: true,
      position: 'right',
      class: {
        content: 'translate-x-0',
      },
    },
    {
      isOpen: false,
      position: 'right',
      class: {
        content: 'translate-x-full',
      },
    },
  ],
  defaultVariants: {
    isOpen: true,
    position: 'right',
  },
});
