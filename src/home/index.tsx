import * as React from "react";
import { BrowserRouter, RouteComponentProps, Route, Switch } from "react-router-dom";
import Partier from "../partier-app";
import Promoter from "../promoter-app";

class HomePage extends React.Component<RouteComponentProps<{}>, {}> {

  public render() {
    return (
      <div className="home-wrapper">
        <div className="home-contents">
          <div className="logo" />
          <br />
          <div className="welcome-text">
            Welcome Text Placeholder
          </div>
          <br />
          <a className="btn btn-primary btn-lg" href={"/partier"}>Login as a partier</a>
          <br />
          <a className="btn btn-primary btn-lg" href={"/promoter"}>Login as a party promoter</a>
        </div>
      </div>
    );
  }

}

export default class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/partier" component={Partier} />
          <Route path="/promoter" component={Promoter} />
        </Switch>
      </BrowserRouter>
    );
  }
}
