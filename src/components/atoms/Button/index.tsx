import clsx from "clsx";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { IconName } from "../Icon/Icon.types";
import { ButtonProps } from "./Button.interfaces";

export const Button: React.FC<ButtonProps> = ({
   className,
   variant = "primary",
   text,
   link,
   type = "button",
   loading = false,
   disabled,
   children,
   iconName,
   iconPosition = iconName ? "end" : "",
   iconSize,
   ...props
}) => {
   const buttonRef = useRef<HTMLButtonElement>(null);
   const navigate = useNavigate();

   const redirect = () => {
      if (link) {
         navigate(link);
      }
   };

   const classes = clsx([
      {
         button: true,
         [`button--${variant}`]: variant,
         [`button--loading`]: loading,
      },
      className,
   ]);

   buttonRef.current?.addEventListener("click", () => {
      redirect();
   });

   return (
      <button
         ref={buttonRef}
         className={classes}
         type={type}
         disabled={loading || disabled}
         {...props}
      >
         {iconName && iconPosition === "start" && (
            <Icon name={iconName as IconName} size={iconSize} />
         )}
         {loading ? <Icon name="loader-line" /> : text || children}

         {iconName && iconPosition === "end" && (
            <Icon name={iconName as IconName} size={iconSize} />
         )}
      </button>
   );
};
