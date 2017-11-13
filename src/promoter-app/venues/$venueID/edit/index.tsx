import { range as _range } from "lodash";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FacebookImageSelector from "../../../../modules/FacebookImageSelector";
import EditVenueModel from "./Model";

interface PEditVenue {
  venueID: number;
}

@observer
export default class EditVenue extends React.Component<RouteComponentProps<PEditVenue>, {}> {
  public venue = new EditVenueModel(this.props.match.params.venueID);

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
    if (this.venue.photos.length > idx) {
      this.venue.photos[idx] = url.source;
    } else {
      this.venue.photos.push(url.source);
    }
  }

  public clickSave = async () => {
    const x = await this.venue.save();
    this.props.history.push(`/promoter/venues/${x.venueID}`);
    // go back
  }

  public changeVenueName = (event: any) => {
    this.venue.venueName = event.target.value;
  }

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
    return this.venue.isReady ? (
      <div className="profile-edit-wrapper">
        <div className="profile-edit-contents">
          <div className="profile-top-contents">
            <div className="photo-container">
              <div
                className="main-photo"
                style={this.venue.profilePhoto}
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
                    title="Venue Name"
                  >
                    Venue Name
                  </span>
                </label>
                <div className="value-col">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="input-name"
                    value={this.venue.venueName}
                    onChange={this.changeVenueName}
                  />
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
