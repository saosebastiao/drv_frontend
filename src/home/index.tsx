import * as React from "react";
import { BrowserRouter, RouteComponentProps, Route, Switch } from "react-router-dom";
import Partier from "../partier-app";
import Promoter from "../promoter-app";
import PhotoContainer from "shared/PhotoContainer";

class HomePage extends React.Component<RouteComponentProps<{}>, {}> {

  public render() {
    return (
      <div className="home-wrapper">
        <PhotoContainer
          url="https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/11904745_10100981692983124_6287312815855455181_n.jpg?oh=846238fe34d613cdc2d534f110a643d8&oe=5A8C151B"
          pixels={120}
          x={50}
          y={50}
          scale={0.9}
        />
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
