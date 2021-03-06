import * as React from "react";
import { findDOMNode } from 'react-dom';
import * as $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from "mobx-react";
import { observable } from "mobx";
import * as _ from 'lodash';
import CreateVenueModel from "./Model";
import FacebookImageSelector from '../../../modules/FacebookImageSelector';
import './styles.scss';


@observer
export default class CreateVenue extends React.Component<RouteComponentProps<{}>, {}> {
  model = new CreateVenueModel;

  initToggle = (ref: any) => {
    if (ref) {
      const domElement = findDOMNode(ref);
      ($(domElement) as any).tooltip();
    }
  }

  async clickSave() {
    const x = await this.model.create()
    this.props.history.push(`/promoter/venues/${this.model.venueID}/edit`);
    //go back
  }

  changeVenueName = (event: any) => {
    this.model.venueName = event.target.value
  };

  changeRegionID = (event: any) => {
    this.model.regionID = event.target.value
  };

  changeAddress = (event: any) => {
    this.model.address = event.target.value
  };

  render() {
    return this.model.isReady ? <div className="profile-edit-wrapper">
      <div className="profile-edit-contents">
        <div className="profile-top-contents">
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="input-name" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Venue Name">Venue Name</span>
              </label>
              <div className="value-col">
                <input type="text" className="form-control" aria-describedby="input-name"
                  value={this.model.venueName}
                  onChange={this.changeVenueName} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-home" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Hometown">Hometown</span>
              </label>
              <div className="value-col">
                <select className="form-control" aria-describedby="input-home" value={this.model.regionID} onChange={this.changeRegionID}>
                  <option key="none" value="none">Please Select a Region</option>
                  {this.model.regions.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="input-name" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Address">Address</span>
              </label>
              <div className="value-col">
                <input type="text" className="form-control" aria-describedby="input-name"
                  value={this.model.address}
                  onChange={this.changeAddress} />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <button className="btn btn-lg btn-primary" onClick={this.clickSave.bind(this)}>Save</button>
      </div>
    </div> : null;
  }
}