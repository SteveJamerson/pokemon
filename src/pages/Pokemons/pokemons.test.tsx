import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pokemons from ".";
import { POKEMON, POKEMONS__ALL } from "../../services/mock/Pokemons.mock";
import * as ServicePokemon from "../../services/pokemons";

const mockedService = ServicePokemon as jest.Mocked<typeof ServicePokemon>;

jest.mock("../../services/pokemons", () => ({
   getAllPokemons: jest.fn(() => new Promise((resolve) => resolve(true))),
   getPokemon: jest.fn(() => new Promise((resolve) => resolve(true))),
}));

describe("Pokemons", () => {
   beforeEach(async () => {
      mockedService.getAllPokemons.mockResolvedValue(
         new Promise((resolve) => resolve(POKEMONS__ALL))
      );
      mockedService.getPokemon.mockResolvedValue(
         new Promise((resolve) => resolve(POKEMON))
      );
   });

   it("should be created", async () => {
      jest.useFakeTimers();
      render(
         <Router>
            <Pokemons />
         </Router>
      );
      jest.advanceTimersByTime(10000);
      jest.useRealTimers();
   });

   it("should be getAllPokemons", async () => {
      jest.useFakeTimers();
      render(
         <Router>
            <Pokemons />
         </Router>
      );
      jest.advanceTimersByTime(10000);
      jest.useRealTimers();
      const all = jest.spyOn(ServicePokemon, "getAllPokemons");

      expect(all).toBeCalled();
   });

   it("should be getPokemon", async () => {
      jest.useFakeTimers();
      render(
         <Router>
            <Pokemons />
         </Router>
      );
      jest.advanceTimersByTime(10000);
      jest.useRealTimers();
      const one = jest.spyOn(ServicePokemon, "getPokemon");
      expect(one).toBeCalled();
   });
});
