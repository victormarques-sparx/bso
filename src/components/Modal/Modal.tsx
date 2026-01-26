'use client';

import { cn } from '@/utils';
import { useEffect, type JSX } from 'react';
import type { ModalProps } from './Modal.types';
import { modalVariants } from './Modal.variants';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
}: ModalProps): JSX.Element | null => {
  const {
    overlay: overlayClass,
    content: contentClass,
    header: headerClass,
    title: titleClass,
    closeButton: closeButtonClass,
    body: bodyClass,
  } = modalVariants({
    isOpen,
    hasTitle: !!title,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={cn(overlayClass(), overlayClassName)}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={cn(contentClass(), className)}
        onClick={e => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className={headerClass()}>
            {title && (
              <h2 id="modal-title" className={titleClass()}>
                {title}
              </h2>
            )}
            {onClose && (
              <button
                type="button"
                onClick={() => onClose?.()}
                className={closeButtonClass()}
                aria-label="Close modal"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={bodyClass()}>{children}</div>
      </div>
    </div>
  );
};
