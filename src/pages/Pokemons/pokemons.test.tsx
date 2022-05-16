import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Pokemons from ".";
import { POKEMON, POKEMONS__ALL } from "../../services/mock/Pokemons.mock";
import * as service from "../../services/pokemons";

// jest.mock("../../services/pokemons", () => ({
//    getAllPokemons: jest.fn((..._) => {
//       return new Promise((resolve) => {
//          resolve(true);
//       });
//    }),
//    getPokemon: jest.fn((..._) => {
//       return new Promise((resolve) => {
//          resolve(true);
//       });
//    }),
// }));

// const mockedService = service as jest.Mocked<typeof service>;
// mockedService.getAllPokemons.mockResolvedValue({ data: POKEMONS__ALL });
// mockedService.getPokemon.mockResolvedValue({ data: POKEMON });

afterAll(cleanup);

describe("Pokemons", () => {
   beforeEach(async () => {
      // service.getAllPokemons.mockResolvedValue({ data: POKEMONS__ALL });
   });

   it("should be created", async () => {
      render(
         <Router>
            <Pokemons />
         </Router>
      );
   });

   it("should be getAllPokemons", async () => {
      jest.useFakeTimers();
      render(
         <Router>
            <Pokemons />
         </Router>
      );
      jest.advanceTimersByTime(2000);
      const mockAll = jest.spyOn(service, "getAllPokemons");
      mockAll.mockResolvedValue(
         new Promise((resolve) => resolve(POKEMONS__ALL))
      );
      jest.advanceTimersByTime(2000);
      jest.useRealTimers();
   });

   it("should be getPokemon", async () => {
      jest.useFakeTimers();
      render(
         <Router>
            <Pokemons />
         </Router>
      );
      jest.advanceTimersByTime(2000);
      const mockAll = jest.spyOn(service, "getPokemon");
      mockAll.mockResolvedValue(new Promise((resolve) => resolve(POKEMON)));
      jest.advanceTimersByTime(2000);
      jest.useRealTimers();
   });
});
