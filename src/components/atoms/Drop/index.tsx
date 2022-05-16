import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { DropProps } from "./Drop.interfaces";

export const Drop: React.FC<DropProps> = ({
   className,
   variant = "down",
   text,
   children,
   iconName,
   iconPosition = "end",
   iconSize = 18,
   ...props
}) => {
   const dropRef = useRef<HTMLDivElement>(null);

   const [opened, setOpened] = useState(false);

   const handleOpen = useCallback(() => {
      setOpened((c) => !c);
   }, []);

   const classes = clsx([
      {
         drop: true,
         [`drop--${variant}`]: variant,
         [`drop--icon`]: iconName,
         [`drop--icon--${iconPosition}`]: iconPosition,
      },
      className,
   ]);

   useEffect(() => {
      window.addEventListener("click", (e: any): void => {
         !dropRef.current?.contains(e.target) && setOpened(false);
      });
   }, []);

   return (
      <div ref={dropRef} className={classes} {...props}>
         <Button
            className="drop-button"
            variant="secondary"
            iconName={iconName || "arrow-down-line"}
            iconPosition={iconPosition}
            iconSize={iconSize}
            onClick={handleOpen}
            aria-expanded={opened}
         >
            <span>{text}</span>
         </Button>
         <div className={clsx([{ drop__content: true, show: opened }])}>
            {children}
         </div>
      </div>
   );
};
