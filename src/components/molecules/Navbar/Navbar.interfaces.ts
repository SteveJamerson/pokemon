import { HTMLAttributes } from 'react';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
   brand?: {
      src?: string;
      href?: string;
   };
   links?: NavbarLink[];
   variant?: 'default' | 'custom';
}

export interface NavbarLink {
   text: string;
   href: string;
   icon?: string;
   target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
}
