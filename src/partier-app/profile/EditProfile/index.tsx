import * as React from "react";
import { findDOMNode } from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import ProfileModel from "../ProfileModel";
import './styles.scss';

export interface IProfileModel {
	profile: ProfileModel;
}

@observer
export default class EditProfile extends React.Component<IProfileModel, {}> {
  profile: ProfileModel;
  constructor(props: IProfileModel) {
    super();
    this.profile = props.profile;
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
        // console.log(fr.result);
        $('.photo-container').css('background-image', "url('" + fr.result + "')");
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

  render() {
    return <div className="profile-edit-wrapper">
    	<div className="profile-edit-contents">
    		<div className="profile-edit-top-contents">
		    	<div className="photo-container" style={{backgroundImage: `url(${this.profile.photos[0]})`}} onClick={this.clickPhoto}>
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
    </div>;
  }
}

