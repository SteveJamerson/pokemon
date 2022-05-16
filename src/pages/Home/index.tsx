import React from "react";
import { Button, Image } from "../../components/atoms";
import { Navbar } from "../../components/molecules/Navbar";
import "./styles.scss";

const Home: React.FC = () => {
   return (
      <>
         <Navbar></Navbar>
         <section className="container home">
            <div className="row">
               <div className="col">
                  <h2 className="home__title" data-testid="title">
                     Qual pokemon <br /> você{" "}
                     <span className="highlight--primary">escolheria</span> ?
                  </h2>
                  <p className="home__text" data-testid="text">
                     Você pode saber o tipo de Pokémon, seus pontos fortes,
                     fracos e habilidades.
                  </p>
                  <Button
                     link="/pokemons"
                     className="home__action"
                     data-testid="action"
                  >
                     Veja os pokemons
                  </Button>
               </div>
               <Image
                  className="home__banner"
                  src="banner.svg"
                  data-testid="image"
               />
            </div>
         </section>
      </>
   );
};

export default Home;
