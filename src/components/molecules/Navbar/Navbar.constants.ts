import { NavbarLink } from './Navbar.interfaces';
export const DEFAULT_BRAND = {
   src: 'logo.svg',
   href: '/home',
};

export const DEFAULT_LINKS: NavbarLink[] = [
   { text: 'Home', href: '/home' },
   { text: 'Pokemons', href: '/pokemons' },
   { text: 'Contato', href: '/contato' },
];
