import { range as _range } from "lodash";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "modules/FacebookImageSelector";
import EditPhotosModel from "./Model";
import ProfileModel from "../Model";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditPhotos extends React.Component<PProfile> {
  public profile = new EditPhotosModel;
  @observable public selIndex: number = -1;
  @observable public showFacebookImageModal: boolean = false;
  constructor(props: any) {
    super(props);
  }

  public onShowFacebookImageModal = (idx: number) => {
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
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
    // go back
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
          </div>
          <br /><br />
          <button className="btn btn-lg btn-primary" onClick={this.clickSave}>Save</button>
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
