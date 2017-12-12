import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import ProfileModel from "../Model";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditProfile extends React.Component<PProfile> {
  private profile = new EditProfileModel;

  private clickSave = async () => {
    await this.profile.save();
    this.props.history.push("/promoter/profile");
  }

  private changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  private changeEmail = (event: any) => {
    this.profile.email = event.target.value;
  }

  public render() {
    return (
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
              <div className="field">
                <label htmlFor="input-email" className="label">
                  <span title="Email">Email</span>
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    aria-describedby="input-email"
                    value={this.profile.email}
                    onChange={this.changeEmail}
                  />
                </div>
              </div>
            </div>
            <button type="button" className="button is-primary" onClick={this.clickSave}>
              Save
            </button>
          </div>
        </div>
      </div >
    );
  }
}
