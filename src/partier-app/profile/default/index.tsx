import { range as _range } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FriendsWidget from "./FriendsWidget";
import ProfileModel from "../Model";
import { getUserID } from "modules/DroverClient";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class Profile extends React.Component<PProfile> {
  private profile: ProfileModel;

  constructor(props: RouteComponentProps<{}> & PProfile) {
    super(props);
    this.profile = this.props.model;
  }

  public render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-contents">
          <div className="profile-top-contents">
            <div className="photo-container">
              <div
                className="main-photo"
                style={this.profile.profilePhoto}
              />
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
                <Link to="/partier/profile/edit">
                  <button className="btn btn-md btn-primary">
                    Edit profile information
                  </button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/partier/profile/photos">
                  <button className="btn btn-md btn-primary">
                    Edit photos
                    </button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/partier/profile/filters">
                  <button className="btn btn-md btn-primary">
                    Edit default filters
                  </button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/partier/profile/friends">
                  <button className="btn btn-md btn-primary">
                    Edit friend connections
                  </button>
                </Link>
              </div>
              <div className="form-group">
                <Link to="/partier/profile/social">
                  <button className="btn btn-md btn-primary">
                    Edit social media connections
                    </button>
                </Link>
              </div>
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
      </div >
    );
  }
}
