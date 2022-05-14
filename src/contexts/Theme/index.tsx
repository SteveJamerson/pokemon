import React, { useEffect } from "react";
import usePersistedState from "../../utils/usePersistedState";
import "./../../styles/theme.scss";
import { ThemeContextProps } from "./interfaces";
import { Theme } from "./types";

export const ThemeContext = React.createContext<ThemeContextProps>({
   theme: "light",
} as ThemeContextProps);

export const ThemeProvider: React.FC<any> = ({ children }) => {
   const [currentTheme, setCurrentTheme] = usePersistedState<Theme>(
      "theme",
      "light",
      ["light", "dark"]
   );

   useEffect(() => {
      document.documentElement?.setAttribute("data-theme", currentTheme);
   }, [currentTheme]);

   return (
      <ThemeContext.Provider
         value={{
            theme: currentTheme,
            setCurrentTheme,
         }}
      >
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => React.useContext(ThemeContext);
