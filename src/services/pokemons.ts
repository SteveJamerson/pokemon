import { environment } from '../environment';

const { ENDPOINT_POKEMONS } = environment;
export interface PokemonsResults {
   name: string;
   url: string;
}
export interface PokemonsResponse {
   count: number;
   next: string;
   previous: boolean;
   results: PokemonsResults[];
}

export const getAllPokemons = async (
   params?: object
): Promise<PokemonsResponse> => {
   return fetch(
      ENDPOINT_POKEMONS +
         '?' +
         new URLSearchParams(Object.assign({ limit: '18' }, params))
   ).then((response) => response.json());
};

export const getPokemon = async (url: string): Promise<any> => {
   return fetch(url).then((response) => response.json());
};
