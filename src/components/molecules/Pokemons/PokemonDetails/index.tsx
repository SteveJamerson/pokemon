import clsx from "clsx";
import React from "react";
import { Badge, Icon, Image } from "../../../atoms";
import { PokemonsProps } from "../Pokemons.interfaces";
import "../pokemons.scss";
import "./pokemons-details.scss";

export const PokemonDetails: React.FC<PokemonsProps> = ({
   className,
   variant = "primary",
   title,
   description,
   info,
   stats,
   image,
   type,
   badge,
   hash,
   outClick,
   ...props
}) => {
   const classes = clsx([
      {
         "pokemon-details": true,
         backdrop: true,
         [`pokemon-details--${variant}`]: variant,
         [`pokemon-details--${type}`]: type,
         [`pokemon-bg`]: type,
         [`pokemon-bg--${type}`]: type,
      },
      className,
   ]);

   const total: number =
      stats && Object.values(stats)?.reduce((a, b) => a + b, 0);

   const triggerOutClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => outClick(event);

   return (
      <div className={classes} {...props}>
         <div className="pokemon-details__content">
            <button
               className="pokemon-details__close mobile"
               onClick={(e) => triggerOutClick(e)}
            >
               <Icon name="arrow-left-line" />
            </button>
            <button
               className="pokemon-details__close desktop"
               onClick={(e) => triggerOutClick(e)}
            >
               <Icon name="close-fill" />
            </button>
            <div className="pokemon-details__image">
               <Image external={true} src={image} />

               <div className="pokemon-details__image-badge">
                  {badge?.map((b, k) => (
                     <Badge key={k} sizes="lg" text={b} />
                  ))}
               </div>
            </div>
            <div className="pokemon-details__body">
               <div className="pokemon-details__body-header">
                  <p className="title"> {title} </p>
                  <p className="hash"> #{hash} </p>
               </div>
               {description}
               <ul className="pokemon-details__info">
                  {info?.weight && (
                     <li key={0} className="item">
                        <span>
                           <Icon name="loader-line" />
                           <p>{info.weight}</p>
                        </span>
                        <p>
                           <small>Peso</small>
                        </p>
                     </li>
                  )}
                  {info?.hight && (
                     <li key={1} className="item">
                        <span>
                           <Icon name="loader-line" />
                           <p>{info.hight}</p>
                        </span>
                        <p>
                           <small>Altura</small>
                        </p>
                     </li>
                  )}
                  {info?.power && (
                     <li key={2} className="item">
                        <span>
                           <p>{info.power}</p>
                        </span>
                        <p>
                           <small>Poder Principal</small>
                        </p>
                     </li>
                  )}
               </ul>
               <ul className="pokemon-details__progress">
                  {stats?.hp && (
                     <li key={3} className="item">
                        <b>Saúde</b>
                        <span>{stats.hp}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${stats.hp}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {stats?.attack && (
                     <li key={4} className="item">
                        <b>Ataque</b>
                        <span>{stats.attack}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${stats.attack}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {stats?.defense && (
                     <li key={5} className="item">
                        <b>Defesa</b>
                        <span>{stats.defense}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-red"
                              style={{ width: `${stats.defense}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {stats?.special_attack && (
                     <li key={6} className="item">
                        <b>Ataque Especial</b>
                        <span>{stats.special_attack}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${stats.special_attack}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {stats?.special_defense && (
                     <li key={7} className="item">
                        <b>Defesa. Especial</b>
                        <span>{stats.special_defense}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-red"
                              style={{ width: `${stats.special_defense}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {total && (
                     <li key={8} className="item">
                        <b>Total</b>
                        <span>{total}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${total}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
};
