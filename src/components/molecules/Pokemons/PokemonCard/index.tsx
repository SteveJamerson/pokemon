import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Badge, Image } from "../../../atoms";
import { PokemonsProps } from "../Pokemons.interfaces";
import "../pokemons.scss";
import "./pokemons-card.scss";

export const PokemonCard: React.FC<PokemonsProps> = ({
   className,
   variant = "primary",
   name,
   description,
   info,
   image,
   type,
   badge,
   hash,
   loading,
   ...props
}) => {
   const [show, setShow] = useState(false);

   const handleShow = useCallback(() => {
      setShow((c) => !c);
   }, []);
   const classes = clsx([
      {
         "pokemon-card": true,
         show: show,
         backdrop: show,
         [`pokemon-card--${variant}`]: variant,
         [`pokemon-card--${type}`]: type,
         [`pokemon-bg`]: type,
         [`pokemon-bg--${type}`]: type,
         loading: loading,
      },
      className,
   ]);

   return (
      <div className={classes} {...props}>
         <span className="hash">#{hash}</span>
         <p className="title">{name}</p>
         {badge?.map((b, k) => (
            <Badge text={b} key={k} />
         ))}
         <Image external={true} src={image} />
      </div>
   );
};
