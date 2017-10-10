import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ProfileModel from "./Model";

export interface IProfileModel {
  profile: ProfileModel;
}

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {
  public profile = new ProfileModel;

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="profile-wrapper">
        < Link to={"/promoter/profile/edit"}>
          <div className="profile-contents">
            <div className="profile-top-contents">
              <div className="profile-list">
                <div> {this.profile.name}</div>
                <div> {this.profile.email}</div>
                <div> {this.profile.stripeAccount}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
