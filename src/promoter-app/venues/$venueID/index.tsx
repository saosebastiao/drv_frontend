import * as React from "react";
import { findDOMNode } from "react-dom";
import * as $ from 'jquery';
import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { observable } from "mobx";
import * as _ from 'lodash';
import ShowVenueModel from "./Model";
import FacebookImageSelector from '../../../modules/FacebookImageSelector';

interface PShowVenue {
  venueID: number;
}

@observer
export default class ShowVenue extends React.Component<RouteComponentProps<PShowVenue>, {}> {
  venue = new ShowVenueModel(this.props.match.params.venueID);

  initToggle = (ref: any) => {
    if (ref) {
      const domElement = findDOMNode(ref);
      ($(domElement) as any).tooltip();
    }
  }


  renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        <div className="other-photos-row">
          {
            _.range(5).map((col_index: number) => {
              if (this.venue.otherPhotos.length > col_index) {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${col_index}`}
                  style={this.venue.otherPhotos[col_index]}
                />
              } else {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${col_index}`}
                />
              }
            })
          }
        </div>
      </div>
    );
  }

  render() {
    return this.venue.isReady ? <div className="profile-edit-wrapper">
      <div className="profile-edit-contents">
        <div className="profile-top-contents">
          <div className="photo-container">
            <div className="main-photo" style={this.venue.profilePhoto} />
            {this.renderOtherPhotos()}
          </div>
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="input-name" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Venue Name">Venue Name</span>
              </label>
              <div className="value-col">
                {this.venue.venueName}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="input-home" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Hometown">Region</span>
              </label>
              <div className="value-col">
                {this.venue.regionID}
              </div>
            </div>
          </div>
        </div>
        <br /><br />
        <Link to={`/promoter/venues/${this.venue.venueID}/edit`}>
          <button className="btn btn-lg btn-primary">Edit Venue Details</button>
        </Link>
      </div>
    </div> : null;
  }
}
