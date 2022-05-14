/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx";
import React, { useRef } from "react";
import { Icon } from "../Icon";
import { IconName } from "../Icon/Icon.types";
import { TextFieldProps } from "./TextField.interfaces";

export const TextField: React.FC<TextFieldProps> = ({
   className,
   variant = "default",
   type = "text",
   id,
   label,
   hint,
   error,
   iconName,
   iconClick,
   value,
   ...props
}) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const classes = clsx([
      {
         "text-field": true,
         [`text-field__${variant}`]: variant && variant !== "default",
         [`text-field__icon`]: iconName,
         [`text-field__hint`]: hint,
         [`text-field__error`]: error,
      },
      className,
   ]);

   const triggerIcon = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
      iconClick(event);

   return (
      <>
         <div className={classes}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className="text-field__content">
               {iconName && (
                  <Icon
                     name={iconName as IconName}
                     onClick={(e) => triggerIcon(e)}
                  />
               )}
               <input
                  type={type}
                  id={id}
                  ref={inputRef}
                  defaultValue={value}
                  {...props}
               ></input>
            </div>

            <div className="text-field__extra">
               {hint && !error && <small className="hint">{hint}</small>}
               {error && <small className="error">{error}</small>}
            </div>
         </div>
      </>
   );
};
