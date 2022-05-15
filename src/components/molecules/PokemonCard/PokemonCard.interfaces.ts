import { HTMLAttributes } from 'react';

export interface PokemonCardProps extends HTMLAttributes<HTMLDivElement> {
   title?: string;
   description?: string;
   info?: PokemonCardInfo;
   image?: string;
   variant?: 'primary';
   badge?: string[];
   type?: 'fire' | 'plaint' | 'eletric' | 'water' | 'normal';
   number?: number | string;
}

interface PokemonCardInfo {
   weight?: string;
   hight?: string;
   power?: string;
   atk?: string;
   def?: string;
   vl_atk?: string;
   total?: string;
}
