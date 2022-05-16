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

export const separar = (itens: any[], maximo: number) => {
   return itens.reduce((acumulador, item, indice) => {
      const grupo = Math.floor(indice / maximo);
      acumulador[grupo] = [...(acumulador[grupo] || []), item];
      return acumulador;
   }, []);
};

export const maxPerSlide = (width: number) => {
   if (width > 1325.98) {
      return 18;
   }
   if (width > 1125.98) {
      return 12;
   }
   if (width > 925.98) {
      return 9;
   }
   if (width > 725.98) {
      return 6;
   }
   if (width > 525.98) {
      return 4;
   } else {
      return 3;
   }
};
