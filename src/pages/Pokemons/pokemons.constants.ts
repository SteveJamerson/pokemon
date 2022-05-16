export const FILTER__TYPE = [
   'fire',
   'grass',
   'bug',
   'electric',
   'water',
   'normal',
   'psychic',
   'ground',
   'poison',
   'dragon',
   'flying',
   'fighting',
   'rock',
   'steel',
   'dark',
   'ghost',
   'ice',
];

export const FILTER__ATK = ['attack', 'special attack'];

export const FILTER__DEF = ['defense', 'special defense'];

export const convertPokemon = (data: any) => {
   const { id, name, height, weight, types, sprites, stats, moves } = data;
   const p: any = {
      name: name,
      description:
         'Bulbasaur pode ser visto cochilando sob a luz do sol. Há uma semente nas costas. Ao absorver os raios do sol, a semente cresce progressivamente maior.',
      info: {
         weight: weight / 10,
         hight: height / 10,
         power: moves[0].move.name.replace(/-/g, ' '),
      },
      stats: {},
      hash: id,
      image: sprites.other.dream_world.front_default,
      type: types[0].type.name,
      badge: types.map((t: any) => t.type.name),
   };
   Object.values(stats).forEach((s: any) => {
      p.stats[`${s.stat.name.replace('-', '_')}`] = s.base_stat;
   });
   return p;
};
