import { HTMLAttributes } from 'react';

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
   brand: string;
   links?: NavbarLink[];
}

interface NavbarLink {
   text: string;
   href: string;
   icon?: string;
   target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
}
