import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Pokemons from "./Pokemons";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />}>
            <Route path="/home" element={<Home />} />
         </Route>
         <Route path="/pokemons" element={<Pokemons />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
