import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditSocialModel from "./Model";
import ProfileModel from "../Model";

interface PProfileModel extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditSocial extends React.Component<PProfileModel, {}> {
  private profile = new EditSocialModel;
  constructor(props: any) {
    super(props);
  }

  private clickSave = async () => {
    await this.profile.save();
    this.props.history.push("/partier/profile");
    // go back
  }

  private changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  private changeHome = (event: any) => {
    this.profile.defaultRegion = event.target.value;
  }

  public render() {
    return this.profile.isReady ? (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="input-name" className="label-col control-label">
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Display Name"
                  >
                    Display Name
                  </span>
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
                <label htmlFor="input-home" className="label-col control-label">
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Hometown"
                  >
                    Hometown
                  </span>
                </label>
                <div className="value-col">
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
            </div>
          </div>
          <br /><br />
          <button className="btn btn-lg btn-primary" onClick={this.clickSave}>Save</button>
        </div>
      </div>
    ) : null;
  }
}
