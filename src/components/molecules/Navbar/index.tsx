import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

   const handleCollapse = useCallback(() => {
      setCollapse((c) => !c);
   }, []);

   const navLinks = variant === "default" ? DEFAULT_LINKS : links;
   const navBrand = variant === "default" ? DEFAULT_BRAND : brand;

   return (
      <nav className={classes} {...props}>
         <div className="navbar__content container">
            <div className="navbar__brand">
               <Link to={navBrand?.href || "/home"}>
                  <Image src={navBrand?.src}></Image>
               </Link>
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
                           <NavLink key={k} to={l.href}>
                              {({ isActive }) => (
                                 <li
                                    className={clsx([
                                       {
                                          navbar__link: true,
                                          active: isActive,
                                       },
                                    ])}
                                 >
                                    <span onClick={() => navigate(l.href)}>
                                       {l.text}
                                    </span>
                                 </li>
                              )}
                           </NavLink>
                        ))}
                     </ul>
                  </div>
               </>
            )}
         </div>
      </nav>
   );
};
