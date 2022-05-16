import React, { useCallback, useEffect, useState } from "react";
import { Checkbox, Drop, TextField } from "../../components/atoms";
import {
   Navbar,
   PokemonCard,
   PokemonDetails,
} from "../../components/molecules";
import { PokemonsProps } from "../../components/molecules/Pokemons/Pokemons.interfaces";
import {
   getAllPokemons,
   getPokemon,
   PokemonsResults,
} from "../../services/pokemons";
import { useDebounce } from "../../utils/useDebounce";
import "./styles.scss";

const Pokemons: React.FC = () => {
   const [pokemonShow, setPokemonShow] = useState(false);
   const [pokemons, setPokemons] = useState<PokemonsProps[]>([]);
   const [pokemonsPagination, setPokemonsPagination] = useState<number>(1);
   const [pokemonsDetails, setPokemonsDetails] = useState<number>();
   const [pokemonsView, setPokemonsView] = useState<PokemonsProps[]>([]);

   const [formFilter, setFormFilter] = useState<any>({});

   const handlePokemonShow = useCallback((index: number) => {
      setPokemonsDetails(index);
      setPokemonShow((s) => !s);
   }, []);

   const convertPokemon = (data: any) => {
      const { id, name, height, weight, types, sprites, stats, moves } = data;
      const p: any = {
         name: name,
         description:
            "Bulbasaur pode ser visto cochilando sob a luz do sol. Há uma semente nas costas. Ao absorver os raios do sol, a semente cresce progressivamente maior.",
         info: {
            weight: weight / 10,
            hight: height / 10,
            power: moves[0].move.name.replace(/-/g, " "),
         },
         stats: {},
         hash: id,
         image: sprites.other.dream_world.front_default,
         type: types[0].type.name,
         badge: types.map((t: any) => t.type.name),
      };
      Object.values(stats).forEach((s: any) => {
         p.stats[`${s.stat.name.replace("-", "_")}`] = s.base_stat;
      });
      return p;
   };

   const FILTER__TYPE = [
      "fire",
      "grass",
      "bug",
      "electric",
      "water",
      "normal",
      "psychic",
      "ground",
      "poison",
      "dragon",
      "flying",
      "fighting",
      "rock",
      "steel",
      "dark",
      "ghost",
      "ice",
   ];

   const request = useDebounce(
      useCallback(async () => {
         await getAllPokemons()
            .then((data) => data.results)
            .then((result) => {
               result.forEach((p: PokemonsResults) =>
                  getPokemon(p.url)
                     .then((data) => data)
                     .then((n) => {
                        const p = convertPokemon(n);

                        setPokemonsView((o) => {
                           if (o.find((el) => el.hash === p.hash)) return o;
                           return [...o, p];
                        });
                     })
               );
            })
            .catch((e) => console.log(e));
         await getAllPokemons({ limit: "500" })
            .then((data) => data.results)
            .then((result) => {
               result.forEach((p: PokemonsResults) =>
                  getPokemon(p.url)
                     .then((data) => data)
                     .then((n) => {
                        const p = convertPokemon(n);
                        setPokemons((o) => {
                           if (o.find((el) => el.hash === p.hash)) return o;
                           return [...o, p];
                        });
                     })
               );
            });
      }, [])
   );

   const handleSearch = (e: string) => {
      setPokemonsPagination(1);
      let value = e.toLowerCase();

      const arr = new Array(...pokemons).filter((p) => {
         const { hash, name, badge } = p;

         if (
            String(hash).toLowerCase().indexOf(value) !== -1 ||
            String(name).toLowerCase().indexOf(value) !== -1
         ) {
            if (Object.values(formFilter).find((f) => f)) {
               return badge?.map((b) => formFilter[b]).find((f) => f) && p;
            } else {
               return p;
            }
         }
      });

      setPokemonsView(value === "" ? pokemons.slice(0, 18) : arr.slice(0, 18));
   };

   const handleFilter = (event: any) => {
      const id = event.target.id;
      const value = event.target.checked;
      setPokemonsPagination(1);
      setFormFilter((values: any) => {
         const r = { ...values, [id]: value };

         const arr = new Array(...pokemons).filter((f) => {
            const { badge } = f;
            return badge?.map((b) => r[b]).find((ft) => ft) && f;
         });

         setPokemonsView(
            arr.length
               ? arr.slice(0 + (pokemonsPagination ?? 0), 18)
               : pokemons.slice(0 + (pokemonsPagination ?? 0), 18)
         );

         return r;
      });
   };

   useEffect(() => {
      request();
   }, []);

   return (
      <>
         <Navbar></Navbar>
         <section className="container pokemons">
            <h2 className="pokemons__title">
               Mais de 250 Pokemons para você escolher o seu favorito
            </h2>
            <TextField
               className="pokemons__search"
               id="search"
               placeholder="Pesquisar pokemon"
               iconName="search-line"
               onChange={(e) => handleSearch(e.target.value)}
            ></TextField>

            <div className="container">
               <div className="row gap-5">
                  <div className="col col-flex gap-x-5">
                     <Drop text="Tipo">
                        {FILTER__TYPE.map((f, k) => (
                           <Checkbox
                              key={k}
                              id={f}
                              label={f}
                              onChange={handleFilter}
                              checked={formFilter[f]}
                           />
                        ))}
                     </Drop>
                     <Drop text="Ataque"></Drop>
                     <Drop text="Defesa"></Drop>
                  </div>
                  <div className="col-12">
                     <div className="pokemons__cards">
                        {pokemonsView
                           .sort((a, b) => (a.hash > b.hash ? 1 : -1))
                           .map((pokemon, k) => (
                              <PokemonCard
                                 key={k}
                                 {...pokemon}
                                 onClick={() => handlePokemonShow(pokemon.hash)}
                              />
                           ))}
                     </div>

                     {pokemonShow && (
                        <PokemonDetails
                           key={pokemonsDetails}
                           {...(pokemons.find(
                              (i) => i.hash === pokemonsDetails
                           ) as PokemonsProps)}
                           outClick={handlePokemonShow}
                        />
                     )}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Pokemons;
