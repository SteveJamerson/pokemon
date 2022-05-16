import React, { useCallback, useEffect, useState } from "react";
import { Checkbox, Drop, TextField } from "../../components/atoms";
import {
   Navbar,
   PokemonCard,
   PokemonDetails,
} from "../../components/molecules";
import { PokemonsProps } from "../../components/molecules/Pokemons/Pokemons.interfaces";
import { getAllPokemons, getPokemon } from "../../services/pokemons";
import { useDebounce } from "../../utils/useDebounce";
import "./styles.scss";

const Pokemons: React.FC = () => {
   const [pokemonShow, setPokemonShow] = useState(false);
   const [pokemons, setPokemons] = useState<PokemonsProps[]>([]);
   const [pokemonsDetails, setPokemonsDetails] = useState<number>();

   const handlePokemonShow = useCallback((index: number) => {
      setPokemonsDetails(index);
      setPokemonShow((s) => !s);
   }, []);

   const convertPokemon = (data: any) => {
      const { id, name, height, weight, types, sprites, stats } = data;
      const p: any = {
         title: name,
         description:
            "Bulbasaur pode ser visto cochilando sob a luz do sol. Há uma semente nas costas. Ao absorver os raios do sol, a semente cresce progressivamente maior.",
         info: {
            weight: weight / 10,
            hight: height / 10,
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

   const handleSearch = useDebounce(
      useCallback(async (params?: any) => {
         await getAllPokemons()
            .then(({ data }) => data.results)
            .then((result) => {
               result.forEach((p) =>
                  getPokemon(p.url)
                     .then(({ data }) => data)
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
   useEffect(() => {
      handleSearch();
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
            ></TextField>

            <div className="container">
               <div className="row gap-5">
                  <div className="col col-flex gap-x-5">
                     <Drop text="Tipo">
                        <Checkbox id="fire" label="Fogo" />
                        <Checkbox id="grass" label="Planta" />
                        <Checkbox id="eletric" label="Eletrico" />
                        <Checkbox id="water" label="Água" />
                        <Checkbox id="normal" label="Normal" />
                     </Drop>
                     <Drop text="Ataque"></Drop>
                     <Drop text="Defesa"></Drop>
                  </div>
                  <div className="col-12">
                     <div className="pokemons__cards">
                        {pokemons
                           .sort((a, b) => (a.hash > b.hash ? 1 : -1))
                           .map((pokemon, k) => (
                              <PokemonCard
                                 key={k}
                                 {...pokemon}
                                 onClick={() => handlePokemonShow(k)}
                              />
                           ))}
                     </div>

                     {pokemonShow && (
                        <PokemonDetails
                           key={pokemonsDetails}
                           {...pokemons[pokemonsDetails as number]}
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
