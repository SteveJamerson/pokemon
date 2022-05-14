/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx";
import React, { useRef } from "react";
import { CheckboxProps } from "./Checkbox.interfaces";

export const Checkbox: React.FC<CheckboxProps> = ({
   className,
   id,
   label,
   checked,
   ...props
}) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const classes = clsx([
      {
         checkbox: true,
      },
      className,
   ]);

   return (
      <>
         <div className={classes}>
            <input
               type="checkbox"
               id={id}
               ref={inputRef}
               defaultChecked={!!checked}
               {...props}
            ></input>
            {label && <label htmlFor={id}>{label}</label>}
         </div>
      </>
   );
};
