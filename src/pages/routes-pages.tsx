import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export const RoutesPages = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />}>
            <Route path="/home" element={<Home />} />
         </Route>
      </Routes>
   );
};
