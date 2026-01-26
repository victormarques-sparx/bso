import { tv } from 'tailwind-variants';

export const modalVariants = tv({
  slots: {
    overlay:
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-700/50 backdrop-blur-sm transition-opacity duration-300',
    content:
      'relative w-full max-w-lg rounded-2xl bg-base-50 shadow-xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto',
    header: 'flex items-center justify-between p-6',
    title: 'text-base-800 text-xl font-semibold',
    closeButton:
      'ml-auto flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 text-base-500 hover:bg-base-300 hover:text-base-700',
    body: 'p-6',
  },
  variants: {
    isOpen: {
      true: {
        overlay: 'opacity-100',
        content: 'scale-100 opacity-100',
      },
      false: {
        overlay: 'opacity-0',
        content: 'scale-95 opacity-0',
      },
    },
    hasTitle: {
      true: {
        header: 'border-base-300 border-b',
      },
      false: {
        header: '',
      },
    },
  },
  defaultVariants: {
    isOpen: true,
    hasTitle: false,
  },
});
