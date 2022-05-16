import { HTMLAttributes } from 'react';
import { PokemonType } from './Pokemons.type';

export interface PokemonsProps extends HTMLAttributes<HTMLDivElement> {
   title?: string;
   description?: string;
   stats?: PokemonsStats;
   info?: PokemonsInfo;
   image?: string;
   variant?: 'primary';
   badge?: string[];
   type?: PokemonType;
   hash: number;
   outClick?: any;
}

export interface PokemonsInfo {
   weight?: number;
   hight?: number;
   power?: number;
}
export interface PokemonsStats {
   attack?: number;
   defense?: number;
   special_attack?: number;
   special_defense?: number;
   speed?: number;
   hp?: number;
}
