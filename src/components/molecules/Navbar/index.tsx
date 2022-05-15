import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Image } from "../../atoms/Image";
import { NavbarProps } from "./Navbar.interfaces";

export const Navbar: React.FC<NavbarProps> = ({
   className,
   children,
   brand,
   links,
   ...props
}) => {
   const classes = clsx([
      {
         navbar: true,
      },
      className,
   ]);

   const [collapse, setCollapse] = useState(false);
   const [active, setActive] = useState(0);

   const handleCollapse = useCallback(() => {
      setCollapse((c) => !c);
   }, []);

   return (
      <nav className={classes} {...props}>
         <div className="navbar__content">
            <div className="navbar__brand">
               <Image src={brand}></Image>
            </div>
            {links && (
               <>
                  <button
                     className="navbar__toggle"
                     onClick={handleCollapse}
                     aria-expanded={collapse}
                  >
                     <span className="navbar__toggle-icon"></span>
                  </button>
                  <div
                     className={clsx([
                        { navbar__collapse: true, show: collapse },
                     ])}
                  >
                     <ul className="navbar__links">
                        {links.map((l, k) => (
                           <li
                              key={k}
                              className={clsx([
                                 { navbar__link: true, active: k === active },
                              ])}
                           >
                              <a href={l.href}>{l.text}</a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </>
            )}
         </div>
      </nav>
   );
};
