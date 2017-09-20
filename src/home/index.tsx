import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

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
