import React from "react";
import { Image } from "../../components/atoms";
import { Navbar } from "../../components/molecules/Navbar";
import "./styles.scss";

const NotFound: React.FC = () => {
   return (
      <>
         <Navbar></Navbar>
         <section className="container not-found">
            <h3 className="not-found__title">Página não encontrada</h3>
            <Image
               className="not-found__image"
               src="not-found.svg"
               data-testid="image"
            />
         </section>
      </>
   );
};

export default NotFound;
