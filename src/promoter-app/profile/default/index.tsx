import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
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
          <div>
            < Link to={"/promoter/profile/filters"}>
              <button className="btn btn-md btn-primary">
                Edit Filters
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
