import clsx from "clsx";
import React, { useCallback, useState } from "react";
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

   return (
      <div className={classes} {...props}>
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
