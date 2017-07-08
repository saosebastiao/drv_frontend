import * as React from "react";
import { findDOMNode } from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import EditProfileModel from "./Model";
import FacebookImageSelector from '../../../modules/FacebookImageSelector';
import './styles.scss';


@observer
export default class EditProfile extends React.Component<RouteComponentProps<any>, {}> {
  profile = new EditProfileModel;

  constructor(props: any) {
    super(props);
    this.state = {
      selIndex: -1,
      showFacebookImageModal: false
    }
  }

  onShowFacebookImageModal = (idx: any) => {
    this.setState({ showFacebookImageModal: true, selIndex: idx });
  };

  onHideFacebookImageModal = () => {
    this.setState({ showFacebookImageModal: false });
  };

  onImageSelect = (url: any) => {
    console.log('onImageSelect', url);
    var idx = ((this.state) as any).selIndex;
    console.log(idx);
    $($('.photo-container .other-photos-col')[idx]).css('background-image', "url('" + url.source + "')");
  }

  initToggle = (ref: any) => {
    if (ref) {
      const domElement = findDOMNode(ref);
      ($(domElement) as any).tooltip();
    }
  }

  clickPhoto() {
    $('#file-selector').trigger('click');
  }

  updatePhoto(files: any) {
    if (FileReader && files && files.length) {
      var self = this;
      var fr = new FileReader();
      fr.onload = function () {
        $('.photo-container .main-photo').css('background-image', "url('" + fr.result + "')");
        self.setState({
          image: fr.result
        });
      }
      fr.readAsDataURL(files[0]);
    }
    else {
      console.log('File read is not supported');
    }
  }

  clickSave() {
    //go back
  }

  changeName = (event: any) => {
    this.profile.name = event.target.value
  };

  changeHome = (event: any) => {
    this.profile.home = event.target.value
  };

  changeGender = (event: any) => {
    this.profile.gender = event.target.value
  }

  renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        {
          _.range(2).map((row_index: number) => (
            <div className="other-photos-row" key={`other_photos_row_${row_index}`}>
              {
                _.range(5).map((col_index: number) => (
                  <div
                    className="other-photos-col"
                    key={`other_photos_col_${col_index}`}
                    onClick={() => this.onShowFacebookImageModal(row_index * 5 + col_index)}
                  >
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return <div className="profile-edit-wrapper">
      <div className="profile-edit-contents">
        <div className="profile-top-contents">
          <div className="photo-container">
            <div className="main-photo" style={{ backgroundImage: `url(${this.profile.photos[0]})` }} onClick={this.clickPhoto} />
            {this.renderOtherPhotos()}
          </div>
          <input id="file-selector" type="file" accept="image/*" onChange={(e: any) => this.updatePhoto(e.target.files)} />
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
                  value={this.profile.home}
                  onChange={this.changeHome} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-gender" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Gender">Gender</span>
              </label>
              <div className="value-col">
                <label className="radio-inline">
                  <input type="radio" name="gender" value="Male" checked={this.profile.gender === 'Male'} onChange={this.changeGender} />Male
								</label>
                <label className="radio-inline">
                  <input type="radio" name="gender" value="Female" checked={this.profile.gender === 'Female'} onChange={this.changeGender} />Female
								</label>
              </div>
            </div>
          </div>
        </div>
        <br /><br />
        <button className="btn btn-lg btn-primary" onClick={this.clickSave.bind(this)}>Save</button>
      </div>
      {(this.state as any).showFacebookImageModal &&
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