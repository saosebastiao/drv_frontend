import { range as _range } from "lodash";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "modules/FacebookImageSelector";
import EditProfileModel from "./Model";
import { getUserID, deletePartierProfile } from "modules/DroverClient";

@observer
export default class EditProfile extends React.Component<RouteComponentProps<{}>, {}> {
  public profile = new EditProfileModel;
  @observable public selIndex: number = -1;
  @observable public showFacebookImageModal: boolean = false;
  constructor(props: any) {
    super(props);
  }

  public onShowFacebookImageModal = (idx: any) => {
    this.showFacebookImageModal = true;
    this.selIndex = idx;
  }

  public onHideFacebookImageModal = () => {
    this.showFacebookImageModal = false;
  }

  public onImageSelect = (url: any) => {
    const idx = this.selIndex;
    if (this.profile.photos.length > idx) {
      this.profile.photos[idx] = url.source;
    } else {
      this.profile.photos.push(url.source);
    }
  }

  public clickSave = async () => {
    await this.profile.save();
    this.props.history.push("/partier/profile");
    // go back
  }

  public changeName = (event: any) => {
    this.profile.name = event.target.value;
  }

  public changeHome = (event: any) => {
    this.profile.defaultRegion = event.target.value;
  }

  public changeGender = (event: any) => {
    this.profile.gender = event.target.value;
  }
  public deleteProfile = async () => {
    await deletePartierProfile();
    this.props.history.replace("/");
  }

  public renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        <div className="other-photos-row">
          {
            _range(5).map((colIndex: number) => {
              if (this.profile.otherPhotos.length > colIndex) {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                  style={this.profile.otherPhotos[colIndex]}
                  onClick={() => this.onShowFacebookImageModal(colIndex + 1)}
                />;
              } else {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                  onClick={() => this.onShowFacebookImageModal(colIndex + 1)}
                />;
              }
            })
          }
        </div>
      </div>
    );
  }

  public render() {
    return this.profile.isReady ? (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="photo-container">
              <div
                className="main-photo"
                style={this.profile.profilePhoto}
                onClick={() => this.onShowFacebookImageModal(0)}
              />
              {this.renderOtherPhotos()}
            </div>
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

              <div className="form-group">
                <label htmlFor="input-gender" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Gender">Gender</span>
                </label>
                <div className="value-col">
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={this.profile.gender === "male"}
                      onChange={this.changeGender}
                    />Male
                </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={this.profile.gender === "female"}
                      onChange={this.changeGender}
                    />Female
                </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="input-stripe" className="label-col control-label">
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Stripe Account"
                  >
                    Stripe Account
                  </span>
                </label>
                <a
                  className="btn btn-md btn-primary"
                  href={`/api/partier/${getUserID()}/stripe`}
                  target="_blank">
                  {this.profile.stripeAccountID ? "Manage Payment Account" : "Create Payment Account"}
                </a>
              </div>
            </div>
          </div>
          <br /><br />
          <button className="btn btn-lg btn-primary" onClick={this.clickSave}>Save</button>
          <br />
          <button className="btn btn-lg btn-danger" onClick={this.deleteProfile}>Delete Profile</button>
        </div>
        {this.showFacebookImageModal &&
          <FacebookImageSelector
            getURL
            appId="1063753666981488"
            onCloseModal={this.onHideFacebookImageModal}
            onSelection={this.onImageSelect}
          />
        }
      </div>
    ) : null;
  }
}
