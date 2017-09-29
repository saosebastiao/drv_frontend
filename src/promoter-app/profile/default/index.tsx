import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ProfileModel from "./Model";
import StripeForm from "shared/StripeForm";

export interface IProfileModel {
  profile: ProfileModel;
}

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {
  public profile = new ProfileModel;

  constructor(props: any) {
    super(props);
  }
  public onToken = (token: any) => {
    // tslint:disable-next-line:no-console
    console.log(token);
    /*
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
    */
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
              </div>
            </div>
          </div>
        </Link>
        <div>
          <StripeForm />
        </div>
      </div>
    );
  }
}
