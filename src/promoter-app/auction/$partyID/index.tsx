import * as _ from "lodash";
import { observer } from "mobx-react";
import * as moment from "moment";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import AuctionModel from "./Model";

interface PPartyID {
  partyID: number;
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  public model = new AuctionModel(this.props.match.params.partyID);

  public renderPartiesCard() {
    return (
      <div className="parties-contents">
        {
          _.range(20).map((index: number) => (
            <div className="parties-card has-border" key={index}>Party Card {(index + 1)}</div>
          ))
        }
      </div>
    );
  }

  public renderSquadsCard() {
    return (
      <div className="squads-contents">
        {
          _.range(20).map((index: number) => (
            <div className="squads-card has-border" key={`auction_squads_card_${index}`}>Squad Card {(index + 1)}</div>
          ))
        }
      </div>
    );
  }

  public render() {
    if (this.model.isReady) {
      const myParty = this.model.myParty;
      const auctionInfo = myParty.auction;
      return (
        <div className="auction-details-contents">
          <div className="auction-details-row">
            <div className="details-col">
              <div className="parties-wrapper has-border">
                <div className="details-title">Parties</div>
                {this.renderPartiesCard()}
              </div>
            </div>
            <div className="details-col">
              <div className="squads-wrapper has-border">
                <div className="details-title">Squads</div>
                {this.renderSquadsCard()}
              </div>
            </div>
            <div className="details-col">
              <div className="auction-info-wrapper">
                <div className="details-title">Auction Info</div>
                <div>{auctionInfo.regionID}</div>
                <div>{auctionInfo.partyNight}</div>
                <div>{auctionInfo.startTime}</div>
                <div>{auctionInfo.endTime}</div>
                <div>{auctionInfo.entryFreeze}</div>
                <div>{auctionInfo.priceStart}</div>
                <div>{auctionInfo.priceDrop}</div>
                <div>{auctionInfo.dropInterval}</div>
              </div>
              <div className="squad-info-wrapper">
                <div className="details-title">Your Party Info</div>
                <div>{myParty.partyName}</div>
                <div>{JSON.stringify(myParty.filters)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }

}
