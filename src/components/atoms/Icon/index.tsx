import clsx from "clsx";
import React from "react";
import { IconProps } from "./Icon.interfaces";
import IconsTypes from "./Icon.types";

export const Icon: React.FC<IconProps> = ({
   name,
   size = 24,
   className,
   ...props
}) => {
   const classes = clsx([
      {
         icon: true,
      },
      className,
   ]);
   const Icon = IconsTypes[name] as any;
   return <Icon className={classes} width={size} height={size} {...props} />;
};
