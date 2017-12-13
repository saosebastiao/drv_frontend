import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyCard from "shared/cards/PartyCard";
import SquadCard from "shared/cards/SquadCard";
import AuctionModel from "./Model";
import AuctionInfo from "shared/AuctionInfo";
import BidBox from "./BidBox";

interface PPartyID {
  partyID: number;
  partyNight: number;
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  private model = new AuctionModel(this.props.match.params.partyID);
  private refresh = () => this.model.getState();

  public componentWillUnmount() {
    this.model.quit();
  }

  private renderPartiesCard() {
    return (
      <div className="parties-contents">
        {
          this.model.allParties.map((party: IPartyConfig) => (
            <PartyCard key={party.partyID} partyID={party.partyID} />
          ))
        }
      </div>
    );
  }

  private renderSquadsCard() {
    return (
      <div className="squads-contents">
        {
          this.model.allSquadsSorted.map((squad: ISquadConfig) => (
            <SquadCard key={squad.squadID} squadID={squad.squadID} squad={squad} >
              <BidBox
                squad={squad}
                party={this.model.myParty}
                bid={this.model.myBids.get(squad.squadID)}
                auctionState={this.model.auctionState}
                submitBid={this.model.submitBid}
                revokeBid={this.model.dropBid}
                submitSealedBid={this.model.submitSealedBid}
              />
              {/*
              <div className="field">
                <label className="label">
                  Blacklist Squad
                  </label>
                <div className="control">
                  <input type="checkbox"
                    className="checkbox"
                    checked={this.model.isSquadBlacklisted(squad.squadID)}
                    onChange={() => this.model.toggleSquadBlacklist(squad.squadID)} />
                </div>
              </div>
              */}
            </SquadCard>
          ))
        }
      </div>
    );
  }

  private renderAuctionInfo() {
    return (
      <AuctionInfo auction={this.model.myParty.auction} currentState={this.model.auctionState}>
        <button type="button" className="button" onClick={this.refresh}>Refresh</button>
      </AuctionInfo>
    );
  }
  private renderMyParty() {
    return (
      <PartyCard partyID={this.model.myParty.partyID} />
    );
  }

  public render() {

    if (this.model.isReady) {
      return (
        <div className="box">
          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Parties</h4>
              {this.renderPartiesCard()}
            </div>
            <div className="column">
              <h4 className="title is-4">Squads</h4>
              {this.renderSquadsCard()}
            </div>
            <div className="column">
              <h4 className="title is-4">Auction Info</h4>
              {this.renderAuctionInfo()}
              <h4 className="title is-4">My Party</h4>
              {this.renderMyParty()}
            </div>
          </div>
        </div >
      );
    } else return null;
  }

}
