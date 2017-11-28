import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class Profile extends React.Component<PProfile> {

  public render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-contents">
          <div className="profile-top-contents">
            <div className="profile-list">
              <div> {this.props.model.name}</div>
              <div> {this.props.model.email}</div>
              <div> {this.props.model.stripeAccount}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
