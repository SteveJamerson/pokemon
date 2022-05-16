import clsx from "clsx";
import React from "react";
import { useTheme } from "../../../contexts/Theme";
import { ImageProps } from "./Image.interfaces";

export const Image: React.FC<ImageProps> = ({
   src,
   alt,
   external,
   className,
   ...props
}) => {
   const classes = clsx([
      {
         image: true,
      },
      className,
   ]);
   const { theme } = useTheme();

   const source = () => {
      try {
         return external
            ? src
            : require(`../../../assets/images/${theme}/${src}`);
      } catch (e) {
         return require(`../../../assets/images/${theme}/not-found.svg`);
      }
   };

   return (
      <img
         loading="lazy"
         className={classes}
         src={source()}
         alt={alt}
         {...props}
      />
   );
};
