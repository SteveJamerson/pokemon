import React, {
   useCallback,
   useEffect,
   useLayoutEffect,
   useState,
} from "react";
import { Checkbox, Drop, Image, TextField } from "../../components/atoms";
import {
   Navbar,
   PokemonCard,
   PokemonDetails,
   Slider,
} from "../../components/molecules";
import { PokemonsProps } from "../../components/molecules/Pokemons/Pokemons.interfaces";
import {
   getAllPokemons,
   getPokemon,
   PokemonsResults,
} from "../../services/pokemons";
import { useDebounce } from "../../utils/useDebounce";
import {
   convertPokemon,
   FILTER__ATK,
   FILTER__DEF,
   FILTER__TYPE,
   maxPerSlide,
   separar,
} from "./pokemons.constants";
import "./styles.scss";

const Pokemons: React.FC = () => {
   const [loading, setLoading] = useState(true);

   const [pokemonShow, setPokemonShow] = useState(false);
   const [pokemons, setPokemons] = useState<PokemonsProps[]>([]);
   const [pokemonsPagination, setPokemonsPagination] = useState<number>(1);
   const [pokemonsDetails, setPokemonsDetails] = useState<number>();
   const [pokemonsView, setPokemonsView] = useState<PokemonsProps[]>([]);

   const [formFilter, setFormFilter] = useState<any>({});
   const [formSort, setFormSort] = useState<any>({});

   const [itemPerSlide, setItemPerSlide] = useState(18);
   const [indexPerSlide, setIndexPerSlide] = useState(0);

   const handlePokemonShow = useDebounce(
      useCallback((index: number) => {
         setPokemonsDetails(index);
         setPokemonShow((s) => !s);
      }, [])
   );

   const request = useDebounce(
      useCallback(async () => {
         await getAllPokemons({ limit: "100" })
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
            .finally(() => setLoading(false))
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
            })
            .catch((e) => console.log(e));
      }, [])
   );

   const handleSearch = (e: string) => {
      setPokemonsPagination(1);
      setIndexPerSlide(0);
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

      setPokemonsView(
         arr.length && !Object.values(formFilter).every((f) => f)
            ? pokemons
            : arr
      );
   };

   const handleFilter = (event: any) => {
      const id = event.target.id;
      const value = event.target.checked;
      setPokemonsPagination(1);
      setIndexPerSlide(0);
      setFormFilter((values: any) => {
         const r = { ...values, [id]: value };

         const arr = new Array(...pokemons).filter((f) => {
            const { badge } = f;
            return badge?.map((b) => r[b]).find((ft) => ft) && f;
         });

         setPokemonsView(arr.length ? arr : pokemons);

         return r;
      });
   };

   const handleSort = (event: any) => {
      const id: "attack" | "special_attack" | "defense" | "special_defense" =
         event.target.id.replace(" ", "_");
      setFormSort(id);
      setIndexPerSlide(0);
   };

   useLayoutEffect(() => {
      function updateSize() {
         setItemPerSlide(maxPerSlide(window.innerWidth));
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, []);

   useEffect(() => {
      request();

      window.onload = (e: any) => {
         setItemPerSlide(maxPerSlide(window.innerWidth));
      };
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
                           />
                        ))}
                     </Drop>
                     <Drop text="Ataque">
                        {FILTER__ATK.map((f, k) => (
                           <div key={k} className="sort">
                              <input
                                 id={f}
                                 name="sort"
                                 type="radio"
                                 onChange={handleSort}
                              />
                              <label htmlFor={f}>{f}</label>
                           </div>
                        ))}
                     </Drop>
                     <Drop text="Defesa">
                        {FILTER__DEF.map((f, k) => (
                           <div key={k} className="sort">
                              <input
                                 id={f}
                                 name="sort"
                                 type="radio"
                                 onChange={handleSort}
                              />
                              <label htmlFor={f}>{f}</label>
                           </div>
                        ))}
                     </Drop>
                  </div>
                  <div className="col-12">
                     <Slider index={indexPerSlide}>
                        {pokemonsView.length ? (
                           separar(
                              pokemonsView
                                 .sort((a, b) => (a.hash > b.hash ? 1 : -1))
                                 .sort((a: any, b: any) => {
                                    if (a.stats[formSort] > b.stats[formSort]) {
                                       return -1;
                                    } else if (
                                       a.stats[formSort] < b.stats[formSort]
                                    ) {
                                       return 1;
                                    } else {
                                       return 0;
                                    }
                                 }),
                              itemPerSlide
                           ).map((view: PokemonsProps[], k: any) => {
                              return (
                                 <div className="pokemons__cards" key={k}>
                                    {view.map((pokemon, key) => (
                                       <PokemonCard
                                          key={key}
                                          {...pokemon}
                                          onClick={() =>
                                             handlePokemonShow(pokemon.hash)
                                          }
                                       />
                                    ))}
                                 </div>
                              );
                           })
                        ) : (
                           <Image className="not-pokemons" />
                        )}
                     </Slider>
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
