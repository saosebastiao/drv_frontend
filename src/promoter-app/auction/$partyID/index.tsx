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
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PPartyID>, {}> {

  private model = new AuctionModel(this.props.match.params.partyID);

  public componentWillUnmount() {
    this.model.quit();
  }

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
            <SquadCard key={idx} squadID={squad.squadID} >
              <BidBox
                squad={squad}
                party={this.model.myParty}
                auctionState={this.model.auctionState}
                submitBid={this.model.submitBid}
                submitSealedBid={this.model.submitSealedBid}
              />
              <label>
                <input type="checkbox"
                  checked={this.model.isSquadBlacklisted(squad.squadID)}
                  onChange={() => this.model.toggleSquadBlacklist(squad.squadID)} />
                Blacklist Squad
              </label>
            </SquadCard>
          ))
        }
      </div>
    );
  }

  private refresh = () => this.model.getState();

  public render() {
    if (this.model.isReady) {
      const myParty = this.model.myParty;
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
              <AuctionInfo auction={myParty.auction} currentState={this.model.auctionState}>
                <button type="button" onClick={this.refresh}>Refresh</button>
              </AuctionInfo>
              <div className="squad-info-wrapper">
                <div className="details-title">Your Party Info</div>
                <PartyCard partyID={myParty.partyID} />
                <div>{JSON.stringify(myParty.filters)}</div>
              </div>
            </div>
          </div>
        </div >
      );
    } else return null;
  }

}
