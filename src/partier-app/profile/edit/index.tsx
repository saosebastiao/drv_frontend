import * as React from "react";
import { findDOMNode } from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";
import { observable } from "mobx";
import * as _ from 'lodash';
import EditProfileModel from "./Model";
import FacebookImageSelector from '../../../modules/FacebookImageSelector';
import './styles.scss';


@observer
export default class EditProfile extends React.Component<RouteComponentProps<{}>, {}> {
  profile = new EditProfileModel;

  @observable selIndex: number = -1;
  @observable showFacebookImageModal: boolean = false;
  constructor(props: any) {
    super(props);
  }

  onShowFacebookImageModal = (idx: any) => {
    this.showFacebookImageModal = true;
    this.selIndex = idx;
  };

  onHideFacebookImageModal = () => {
    this.showFacebookImageModal = false;
  };

  onImageSelect = (url: any) => {
    const idx = this.selIndex;
    if (this.profile.photos.length > idx) {
      this.profile.photos[idx] = url.source;
    } else {
      this.profile.photos.push(url.source);
    }
  }

  initToggle = (ref: any) => {
    if (ref) {
      const domElement = findDOMNode(ref);
      ($(domElement) as any).tooltip();
    }
  }

  async clickSave() {
    const x = await this.profile.save()
    this.props.history.push("/partier/profile");
    //go back
  }

  changeName = (event: any) => {
    this.profile.name = event.target.value
  };

  changeHome = (event: any) => {
    this.profile.defaultRegion = event.target.value
  };

  changeGender = (event: any) => {
    this.profile.gender = event.target.value
  }

  renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        <div className="other-photos-row">
          {
            _.range(5).map((col_index: number) => {
              if (this.profile.otherPhotos.length > col_index) {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${col_index}`}
                  style={this.profile.otherPhotos[col_index]}
                  onClick={() => this.onShowFacebookImageModal(col_index + 1)}
                />
              } else {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${col_index}`}
                  onClick={() => this.onShowFacebookImageModal(col_index + 1)}
                />
              }
            })
          }
        </div>
      </div>
    );
  }

  render() {
    return <div className="profile-edit-wrapper">
      <div className="profile-edit-contents">
        <div className="profile-top-contents">
          <div className="photo-container">
            <div className="main-photo" style={this.profile.profilePhoto} onClick={() => this.onShowFacebookImageModal(0)} />
            {this.renderOtherPhotos()}
          </div>
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="input-name" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Display Name">Display Name</span>
              </label>
              <div className="value-col">
                <input type="text" className="form-control" aria-describedby="input-name"
                  value={this.profile.name}
                  onChange={this.changeName} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-home" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Hometown">Hometown</span>
              </label>
              <div className="value-col">
                <input type="text" className="form-control" aria-describedby="input-home"
                  value={this.profile.defaultRegion}
                  onChange={this.changeHome} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-gender" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Gender">Gender</span>
              </label>
              <div className="value-col">
                <label className="radio-inline">
                  <input type="radio" name="gender" value="male" checked={this.profile.gender === 'male'} onChange={this.changeGender} />Male
								</label>
                <label className="radio-inline">
                  <input type="radio" name="gender" value="female" checked={this.profile.gender === 'female'} onChange={this.changeGender} />Female
								</label>
              </div>
            </div>
          </div>
        </div>
        <br /><br />
        <button className="btn btn-lg btn-primary" onClick={this.clickSave.bind(this)}>Save</button>
      </div>
      {this.showFacebookImageModal &&
        <FacebookImageSelector
          getURL={true}
          appId="1063753666981488"
          onCloseModal={this.onHideFacebookImageModal}
          onSelection={this.onImageSelect}
        />
      }
    </div>;
  }
}