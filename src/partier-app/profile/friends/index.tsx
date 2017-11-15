import { range as _range } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FriendsWidget from "./FriendsWidget";
import ProfileModel from "./Model";
import { getUserID } from "modules/DroverClient";

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
            <div className="photo-container">
              <Link to={`/partier/profile/edit`}>
                <div
                  className="main-photo"
                  style={this.profile.profilePhoto}
                />
              </Link>
              <div className="other-photos-container">
                <div className="other-photos-row" key="other_photos_row_1">
                  {
                    _range(4).map((colIndex: number) => {
                      return <div
                        className="other-photos-col"
                        style={this.profile.otherPhotos[colIndex]}
                        key={`other_photos_col_${colIndex}`}
                      />;
                    })
                  }
                </div>
              </div>
            </div>
            <div className="profile-list">
              {this.profile.name}<br />
              {this.profile.defaultRegion}<br />
              {this.profile.gender}<br />
              <div className="form-group">
                <a
                  className="btn btn-md btn-primary"
                  href={`/api/partier/${getUserID()}/stripe`}
                  target="_blank">
                  {this.profile.stripeAccountID ? "Manage Payment Account" : "Create Payment Account"}
                </a>
              </div>
            </div>
          </div>
          <br />
          <FriendsWidget />
        </div>
      </div>
    );
  }
}
