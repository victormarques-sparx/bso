import type { PropsWithChildren } from 'react';

export type DrawerPositionTypes = 'left' | 'right';

export interface DrawerProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  position?: DrawerPositionTypes;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
}
