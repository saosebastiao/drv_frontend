import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./admin-app";
import Home from "./home";
import Partier from "./partier-app";
import Promoter from "./promoter-app";

import DevTool from "mobx-react-devtools";

import "./styles/app.scss";

class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/partier" component={Partier} />
          <Route path="/promoter" component={Promoter} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}
render(<AppRouter />, document.getElementById("root"));
