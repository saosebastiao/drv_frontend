import "bootstrap-sass/assets/javascripts/bootstrap.js";
import * as $ from "jquery";
import * as _ from "lodash";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { findDOMNode } from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "../../../modules/FacebookImageSelector";
import EditProfileModel from "./Model";

@observer
export default class EditProfile extends React.Component<RouteComponentProps<{}>, {}> {
  public profile = new EditProfileModel;
  constructor(props: any) {
    super(props);
  }

  public clickSave = async () => {
    const x = await this.profile.save();
    this.props.history.push("/promoter/profile");
  }

  public changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  public changeEmail = (event: any) => {
    this.profile.email = event.target.value;
  }

  public render() {
    return (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="input-name" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Display Name">Display Name</span>
                </label>
                <div className="value-col">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="input-name"
                    value={this.profile.name}
                    onChange={this.changeName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="input-email" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Email">Email</span>
                </label>
                <div className="value-col">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="input-email"
                    value={this.profile.email}
                    onChange={this.changeEmail}
                  />
                </div>
              </div>
            </div>
          </div>
          <br /><br />
          <button className="btn btn-lg btn-primary" onClick={this.clickSave}>Save</button>
        </div>
      </div>
    );
  }
}
