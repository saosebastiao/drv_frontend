import 'bootstrap-sass/assets/javascripts/bootstrap.js';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { findDOMNode } from 'react-dom';
import { RouteComponentProps } from 'react-router-dom';
import FacebookImageSelector from '../../../../modules/FacebookImageSelector';
import EditVenueModel from "./Model";

interface PEditVenue {
  venueID: number;
}

@observer
export default class EditVenue extends React.Component<RouteComponentProps<PEditVenue>, {}> {
  venue = new EditVenueModel(this.props.match.params.venueID);

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
    if (this.venue.photos.length > idx) {
      this.venue.photos[idx] = url.source;
    } else {
      this.venue.photos.push(url.source);
    }
  }

  initToggle = (ref: any) => {
    if (ref) {
      const domElement = findDOMNode(ref);
      ($(domElement) as any).tooltip();
    }
  }

  async clickSave() {
    const x = await this.venue.save()
    this.props.history.push(`/promoter/venues/${x.venueID}`);
    // go back
  }

  public changeVenueName = (event: any) => {
    this.venue.venueName = event.target.value
  };

  public renderOtherPhotos() {
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

  public render() {
    return this.venue.isReady ? <div className="profile-edit-wrapper">
      <div className="profile-edit-contents">
        <div className="profile-top-contents">
          <div className="photo-container">
            <div className="main-photo" style={this.venue.profilePhoto} onClick={() => this.onShowFacebookImageModal(0)} />
            {this.renderOtherPhotos()}
          </div>
          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="input-name" className="label-col control-label">
                <span ref={this.initToggle} data-toggle="tooltip" data-placement="top" title="Venue Name">Venue Name</span>
              </label>
              <div className="value-col">
                <input type="text" className="form-control" aria-describedby="input-name"
                  value={this.venue.venueName}
                  onChange={this.changeVenueName} />
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
    </div> : null;
  }
}
