import { observer } from "mobx-react";
import * as moment from "moment";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import ViewPartyModel from "./Model";

interface PViewParty {
  partyID: number;
}

@observer
export default class ViewParty extends React.Component<RouteComponentProps<PViewParty>, {}> {

  public model = new ViewPartyModel(this.props.match.params.partyID);

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
                <Link to={`/promoter/auction/${this.model.partyID}`}> Go To Auction Page</Link>
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
                <Link to={`/promoter/parties/${this.model.partyID}/edit`}> Edit Party Information</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }

}
