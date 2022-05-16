import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from ".";

afterAll(cleanup);

describe("NotFound", () => {
   beforeEach(async () => {});

   it("should be created", async () => {
      render(
         <Router>
            <NotFound />
         </Router>
      );
   });

   it("should be elements", async () => {
      render(
         <Router>
            <NotFound />
         </Router>
      );
      const image = screen.getByTestId("image");
      expect(image).toBeTruthy();
   });
});
