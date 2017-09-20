import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyCard from "shared/cards/PartyCard";
import SquadCard from "shared/cards/SquadCard";
import AuctionModel from "./Model";

interface PPartyID {
  partyID: number;
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  private model = new AuctionModel(this.props.match.params.partyID);

  private renderPartiesCard() {
    return (
      <div className="parties-contents">
        {
          this.model.allParties.map((party: IPartyConfig, idx: number) => (
            <PartyCard key={idx} partyID={party.partyID} />
          ))
        }
      </div>
    );
  }

  private renderSquadsCard() {
    return (
      <div className="squads-contents">
        {
          this.model.allSquads.map((squad: ISquadConfig, idx: number) => (
            <SquadCard key={idx} squadID={squad.squadID} submitBid={() => this.model.bid(squad.squadID)} />
          ))
        }
      </div>
    );
  }

  private refresh = () => this.model.getState();

  public render() {
    if (this.model.isReady) {
      const myParty = this.model.myParty;
      const auction = myParty.auction;
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
                <div>{auction.regionID}</div>
                <div>{auction.partyNight}</div>
                <div>Auction starts at {auction.startTime}</div>
                <div>Auction ends at {auction.endTime}</div>
                <div>Auction Entries freeze at {auction.entryFreeze}</div>
                <div>Prices start at {auction.priceStart}{auction.currency}</div>
                <div>Prices drop by {auction.priceDrop}{auction.currency} every {auction.dropInterval} minutes</div>
                <button type="button" onClick={this.refresh}>Refresh</button>
              </div>
              <div className="squad-info-wrapper">
                <div className="details-title">Your Party Info</div>
                <PartyCard partyID={myParty.partyID} />
                <div>{JSON.stringify(myParty.filters)}</div>
              </div>
            </div>
          </div>
        </div>);
    } else return null;
  }

}
