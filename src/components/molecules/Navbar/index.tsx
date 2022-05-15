import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "../../atoms/Image";
import { DEFAULT_BRAND, DEFAULT_LINKS } from "./Navbar.constants";
import { NavbarProps } from "./Navbar.interfaces";

export const Navbar: React.FC<NavbarProps> = ({
   className,
   children,
   brand,
   variant = "default",
   links,
   ...props
}) => {
   const navigate = useNavigate();

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

   const navLinks = variant === "default" ? DEFAULT_LINKS : links;
   const navBrand = variant === "default" ? DEFAULT_BRAND : brand;

   return (
      <nav className={classes} {...props}>
         <div className="navbar__content container">
            <div className="navbar__brand">
               <Image src={navBrand}></Image>
            </div>
            {navLinks && (
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
                        {navLinks.map((l, k) => (
                           <li
                              key={k}
                              className={clsx([
                                 { navbar__link: true, active: k === active },
                              ])}
                           >
                              <span onClick={() => navigate(l.href)}>
                                 {l.text}
                              </span>
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
