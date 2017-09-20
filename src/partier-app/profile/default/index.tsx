import * as _ from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FriendsWidget from "./FriendsWidget";
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
                    _.range(4).map((colIndex: number) => {
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
            </div>
          </div>
          <br />
          <FriendsWidget />
        </div>
      </div>
    );
  }
}
