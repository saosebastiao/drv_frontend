import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ViewPartyModel from "../Model";

interface PViewParty extends RouteComponentProps<{}> {
  model: ViewPartyModel;
}

@observer
export default class ViewParty extends React.Component<PViewParty> {

  public model = new ViewPartyModel(this.props.model.partyID);

  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col">
              <div className="info-wrapper">
                <div className="info-title">Auction Information</div>
                <div className="info-row">
                  <div className="info-label">Auction Region</div>
                  <div className="info-value">{this.model.auction.regionID}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Party Night</div>
                  <div className="info-value">{this.model.auction.partyNight}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Auction Start Time</div>
                  <div className="info-value">{this.model.auction.startTime}</div>
                </div>
                <Link to={`/promoter/parties/${this.model.partyID}/auction`}>
                  <button className="btn btn-primary">Go To Auction</button>
                </Link>
              </div>
              <div className="info-wrapper">
                <div className="info-title">Party Information</div>
                <div className="info-row">
                  <div className="info-label">Name</div>
                  <div className="info-value">{this.model.partyName}</div>
                </div>
                <div className="info-title">Venue</div>
                <div className="info-row">
                  <div className="info-label">Venue Name</div>
                  <div className="info-value">{this.model.venue.venueName}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Address</div>
                  <div className="info-value">{this.model.venue.address}</div>
                </div>
                <div>
                  <Link to={`/promoter/parties/${this.model.partyID}/edit`}>
                    <button className="btn btn-primary">Edit Party</button>
                  </Link>
                </div>
                <div>
                  <Link to={`/promoter/parties/${this.model.partyID}/filters`}>
                    <button className="btn btn-primary">Edit Party Filters</button>
                  </Link>
                </div>
                <div>
                  <Link to={`/promoter/parties/${this.model.partyID}/photos`}>
                    <button className="btn btn-primary">Edit Party Photos</button>
                  </Link>
                </div>
                <div>
                  <Link to={`/promoter/parties/${this.model.partyID}/social`}>
                    <button className="btn btn-primary">Edit Party Social Media Kit</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }

}
