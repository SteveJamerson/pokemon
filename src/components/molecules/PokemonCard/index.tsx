import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Badge, Image } from "../../atoms";
import { PokemonCardProps } from "./PokemonCard.interfaces";
import "./pokemons-card.scss";

export const PokemonCard: React.FC<PokemonCardProps> = ({
   className,
   variant = "primary",
   title,
   description,
   info,
   image,
   type,
   badge,
   number,
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
      },
      className,
   ]);

   return (
      <div className={classes} {...props}>
         <span className="hash">#{number}</span>
         <p className="title">{title}</p>
         {badge?.map((b) => (
            <Badge text={b} />
         ))}
         <Image src={image} />
      </div>
   );
};
