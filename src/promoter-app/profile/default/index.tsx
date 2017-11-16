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
        <div className="profile-contents">
          <div className="profile-top-contents">
            <div className="profile-list">
              <div> {this.profile.name}</div>
              <div> {this.profile.email}</div>
              <div> {this.profile.stripeAccount}</div>
            </div>
          </div>
          <div>
            < Link to={"/promoter/profile/edit"}>
              <button className="btn btn-md btn-primary">
                Edit Profile
            </button>
            </Link>
          </div>
          <div>
            < Link to={"/promoter/profile/payment"}>
              <button className="btn btn-md btn-primary">
                Edit Payment Methods
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
