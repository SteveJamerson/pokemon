import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from ".";

afterAll(cleanup);

describe("Home", () => {
   beforeEach(async () => {});

   it("should be created", async () => {
      render(
         <Router>
            <Home />
         </Router>
      );
   });

   it("should be elements", async () => {
      render(
         <Router>
            <Home />
         </Router>
      );
      const title = screen.getByTestId("title");
      expect(title).toBeTruthy();
      const text = screen.getByTestId("text");
      expect(text).toBeTruthy();
      const action = screen.getByTestId("action");
      expect(action).toBeTruthy();
      const image = screen.getByTestId("image");
      expect(image).toBeTruthy();
   });
});
