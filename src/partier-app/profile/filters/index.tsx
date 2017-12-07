import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import { deletePartierProfile } from "modules/DroverClient";
import ProfileModel from "../Model";

interface PEditFilters extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditFilters extends React.Component<PEditFilters> {
  private profile = new EditProfileModel;
  constructor(props: any) {
    super(props);
  }

  private clickSave = async () => {
    await this.profile.save();
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
    // go back
  }

  private changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  private changeHome = (event: any) => {
    this.profile.defaultRegion = event.target.value;
  }

  private changeGender = (event: any) => {
    this.profile.gender = event.target.value;
  }
  private deleteProfile = async () => {
    await deletePartierProfile();
    this.props.history.replace("/");
  }

  public render() {
    return this.profile.isReady ? (
      <div className="columns">
        <div className="column is-4">
          <div className="box">
            <div className="field">
              <label htmlFor="input-name" className="label">
                <span title="Display Name">Display Name</span>
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  aria-describedby="input-name"
                  value={this.profile.name}
                  onChange={this.changeName}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="input-home" className="label">
                <span title="Display Name">Hometown</span>
              </label>
              <div className="select">
                <select
                  className="form-control"
                  aria-describedby="input-home"
                  value={this.profile.defaultRegion}
                  onChange={this.changeHome}
                >
                  <option key="none" value="none">Please Select a Hometown</option>
                  {this.profile.availRegions.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label htmlFor="gender" className="label">
                  <span title="Gender">Gender</span>
                </label>
                <div className="radio">
                  <label className="radio">
                    <input type="radio" name="gender" value="male"
                      checked={this.profile.gender === "male"}
                      onChange={this.changeGender} />
                    <span>Male</span>
                    <span className="icon">
                      <i className="fa fa-mars" aria-hidden="true" />
                    </span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="gender" value="female"
                      checked={this.profile.gender === "female"}
                      onChange={this.changeGender} />
                    <span>Female</span>
                    <span className="icon">
                      <i className="fa fa-venus" aria-hidden="true" />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" onClick={this.clickSave}>Save</button>
              </div>
              <div className="control">
                <button className="button is-danger" onClick={this.deleteProfile}>Delete Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
