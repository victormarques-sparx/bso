import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CnProps } from './cn.types';

export const cn = (...classes: CnProps): string => twMerge(clsx(...classes));
