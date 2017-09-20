import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

@observer
export default class Home extends React.Component<RouteComponentProps<any>, {}> {

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
        </div>
      </div>
    );
  }

}
