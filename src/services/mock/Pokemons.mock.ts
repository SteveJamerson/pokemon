import { PokemonsResponse } from './../pokemons';

export const POKEMONS__ALL: PokemonsResponse = {
   count: 1126,
   next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
   previous: false,
   results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
   ],
};

export const POKEMON: any = {
   height: 7,
   id: 1,
   name: 'bulbasaur',
   sprites: {
      other: {
         dream_world: {
            front_default:
               'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
         },
      },
   },
   stats: [
      {
         base_stat: 45,
         stat: { name: 'hp' },
      },
      {
         base_stat: 49,
         stat: {
            name: 'attack',
         },
      },
      {
         base_stat: 49,
         stat: {
            name: 'defense',
         },
      },
      {
         base_stat: 65,
         stat: {
            name: 'special-attack',
         },
      },
      {
         base_stat: 65,
         stat: {
            name: 'special-defense',
         },
      },
      {
         base_stat: 45,
         stat: { name: 'speed' },
      },
   ],
   types: [
      {
         type: {
            name: 'grass',
         },
      },
      {
         type: {
            name: 'poison',
         },
      },
   ],
   weight: 69,
};
