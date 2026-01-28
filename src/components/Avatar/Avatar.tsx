import { cn } from '@/utils';
import Image from 'next/image';
import type { CSSProperties, JSX } from 'react';
import type { AvatarProps } from './Avatar.types';

export const Avatar = ({
  name,
  image,
  size = 48,
  className = '',
}: AvatarProps): JSX.Element => {
  const style: CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };

  return (
    <div
      className={cn(
        'bg-base-200 text-base-800 flex items-center justify-center overflow-hidden rounded-full',
        className
      )}
      style={style}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          width={size}
          height={size}
          className="object-cover"
        />
      ) : (
        <p
          className="font-semibold uppercase"
          style={{ fontSize: size * 0.4583333 }}
        >
          {name.charAt(0)}
        </p>
      )}
    </div>
  );
};
