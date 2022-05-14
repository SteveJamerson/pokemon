import { HTMLAttributes } from 'react';
import { IconName } from './../Icon/Icon.types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
   text?: string;
   variant?: 'primary';
   iconName?: IconName;
   iconPosition?: 'start' | 'end';
   iconSize?: number;
   sizes?: 'lg';
}
