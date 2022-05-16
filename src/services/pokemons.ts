import { AxiosResponse } from 'axios';
import { environment } from '../environment';
import api from './api';

const { ENDPOINT_POKEMONS } = environment;

interface PokemonsResult {
   count: number;
   next: string;
   previous: boolean;
   results: { name: string; url: string }[];
}

export const getAllPokemons = async (): Promise<
   AxiosResponse<PokemonsResult, any>
> => {
   return api.get(ENDPOINT_POKEMONS, {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
         limit: '18',
      },
   });
};

export const getPokemon = async (
   url: string
): Promise<AxiosResponse<any, any>> => {
   return api.get(url, {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });
};
