import { range as _range } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ShowVenueModel from "./Model";

interface PShowVenue {
  venueID: number;
}

@observer
export default class ShowVenue extends React.Component<RouteComponentProps<PShowVenue>, {}> {
  public venue = new ShowVenueModel(this.props.match.params.venueID);

  public renderOtherPhotos() {
    return (
      <div className="other-photos-container">
        <div className="other-photos-row">
          {
            _range(5).map((colIndex: number) => {
              if (this.venue.otherPhotos.length > colIndex) {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                  style={this.venue.otherPhotos[colIndex]}
                />;
              } else {
                return <div
                  className="other-photos-col"
                  key={`other_photos_col_${colIndex}`}
                />;
              }
            })
          }
        </div>
      </div>
    );
  }

  public render() {
    return this.venue.isReady ? (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="photo-container">
              <div className="main-photo" style={this.venue.profilePhoto} />
              {this.renderOtherPhotos()}
            </div>
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="input-name" className="label-col control-label">
                  <span
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Venue Name"
                  >
                    Venue Name
                  </span>
                </label>
                <div className="value-col">
                  {this.venue.venueName}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="input-home" className="label-col control-label">
                  <span data-toggle="tooltip" data-placement="top" title="Hometown">Region</span>
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
      </div>
    ) : null;
  }
}
