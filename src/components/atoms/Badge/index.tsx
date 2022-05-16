import clsx from "clsx";
import React from "react";
import { Icon } from "../Icon";
import { IconName } from "../Icon/Icon.types";
import { BadgeProps } from "./Badge.interfaces";

export const Badge: React.FC<BadgeProps> = ({
   className,
   variant,
   text,
   sizes,
   children,
   iconName,
   iconPosition = iconName ? "end" : "",
   iconSize = 12,
   ...props
}) => {
   const classes = clsx([
      {
         badge: true,
         [`badge--${variant}`]: variant,
         [`badge--icon`]: iconName,
         [`badge--${sizes}`]: sizes,
      },
      className,
   ]);

   return (
      <span className={classes} {...props}>
         {iconPosition === "start" && (
            <Icon name={iconName as IconName} size={iconSize} />
         )}

         {text || children}

         {iconPosition === "end" && (
            <Icon name={iconName as IconName} size={iconSize} />
         )}
      </span>
   );
};
