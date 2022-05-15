import { HTMLAttributes } from 'react';

export interface PokemonDetailsProps extends HTMLAttributes<HTMLDivElement> {
   title?: string;
   description?: string;
   info?: PokemonDetailsInfo;
   image?: string;
   variant?: 'primary';
   badge?: string[];
   type?: 'fire' | 'plaint' | 'eletric' | 'water' | 'normal';
   number?: number | string;
   outClick?: any;
}

interface PokemonDetailsInfo {
   weight?: string;
   hight?: string;
   power?: string;
   atk?: string;
   def?: string;
   vl_atk?: string;
   total?: string;
}
