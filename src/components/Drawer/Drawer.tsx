'use client';

import { cn } from '@/utils';
import { useEffect, useState, type JSX } from 'react';
import type { DrawerProps } from './Drawer.types';
import { drawerVariants } from './Drawer.variants';

export const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
}: DrawerProps): JSX.Element | null => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Usa requestAnimationFrame para tornar a chamada assíncrona
      const frameId = requestAnimationFrame(() => {
        setShouldRender(true);
        // Aguarda o DOM estar pronto antes de iniciar a animação
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      });
      return () => cancelAnimationFrame(frameId);
    } else {
      // Usa requestAnimationFrame para tornar a chamada assíncrona
      const frameId = requestAnimationFrame(() => {
        setIsAnimating(false);
      });
      // Aguarda a animação de saída antes de remover do DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Duração da transição
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const { overlay: overlayClass, content: contentClass } = drawerVariants({
    isOpen: isAnimating,
    position,
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

  if (!shouldRender) return null;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const contentStyles = cn(
    contentClass({
      isOpen: isAnimating,
      position,
    }),
    className
  );

  return (
    <div
      className={cn(overlayClass(), overlayClassName)}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={contentStyles} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
