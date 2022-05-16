import { HTMLAttributes } from 'react';
import { IconName } from '../Icon/Icon.types';

export interface DropProps extends HTMLAttributes<HTMLDivElement> {
   text: string;
   variant?: 'down';
   iconName?: IconName;
   iconPosition?: 'start' | 'end';
   iconSize?: number;
}
