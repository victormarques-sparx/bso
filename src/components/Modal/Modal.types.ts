import type { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
}
