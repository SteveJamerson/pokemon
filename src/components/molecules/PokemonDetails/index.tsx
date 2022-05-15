import clsx from "clsx";
import React from "react";
import { Badge, Icon, Image } from "../../atoms";
import { PokemonDetailsProps } from "./PokemonDetails.interfaces";
import "./pokemons-details.scss";

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({
   className,
   variant = "primary",
   title,
   description,
   info,
   image,
   type,
   badge,
   number,
   outClick,
   ...props
}) => {
   const classes = clsx([
      {
         "pokemon-details": true,
         backdrop: true,
         [`pokemon-details--${variant}`]: variant,
         [`pokemon-details--${type}`]: type,
      },
      className,
   ]);

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
               <Image src={image} />

               <div className="pokemon-details__image-badge">
                  {badge?.map((b) => (
                     <Badge sizes="lg" text={b} />
                  ))}
               </div>
            </div>
            <div className="pokemon-details__body">
               <div className="pokemon-details__body-header">
                  <p className="title"> {title} </p>
                  <p className="number"> #{number} </p>
               </div>
               {description}
               <ul className="pokemon-details__info">
                  {info?.weight && (
                     <li className="item">
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
                     <li className="item">
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
                     <li className="item">
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
                  {info?.atk && (
                     <li className="item">
                        <b>Ataque</b>
                        <span>{info.atk}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${info.atk}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {info?.def && (
                     <li className="item">
                        <b>Defesa</b>
                        <span>{info.def}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-red"
                              style={{ width: `${info.def}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {info?.vl_atk && (
                     <li className="item">
                        <b>Vl. Ataque</b>
                        <span>{info.vl_atk}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${info.vl_atk}%` }}
                           ></div>
                        </div>
                     </li>
                  )}
                  {info?.total && (
                     <li className="item">
                        <b>Total</b>
                        <span>{info.total}</span>
                        <div className="progress">
                           <div
                              className="progress__container bg-green"
                              style={{ width: `${info.total}%` }}
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
