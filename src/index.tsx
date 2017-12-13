import * as React from "react";
import { render } from "react-dom";
import Home from "./home";
import { AppContainer } from "react-hot-loader";

import "./styles/index.scss";

render(
  <AppContainer>
    <Home />
  </AppContainer>,
  document.getElementById("root"));

if ((module as any).hot) {
  (module as any).hot.accept("./home", () => {
    const NextRootContainer = require("./home").default;
    render(
      <AppContainer>
        <NextRootContainer />
      </AppContainer>,
      document.getElementById("root"));
  });
}
