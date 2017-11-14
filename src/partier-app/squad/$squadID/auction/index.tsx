import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyCard from "shared/cards/PartyCard";
import SquadCard from "shared/cards/SquadCard";
import AuctionModel from "./Model";
import AuctionInfo from "shared/AuctionInfo";

interface PAuctionForSquad {
  squadID: string;
}

@observer
export default class Auction extends React.Component<RouteComponentProps<PAuctionForSquad>, {}> {

  private model = new AuctionModel(parseInt(this.props.match.params.squadID, 10));

  public componentWillUnmount() {
    this.model.quit();
  }
  public renderPartiesCard() {
    return (
      <div className="parties-contents">
        {
          this.model.allParties.map((party: IPartyConfig, idx: number) => (
            <PartyCard key={`party:${idx}`} partyID={party.partyID} >
              <label>
                <input type="checkbox"
                  checked={this.model.isVenueBlacklisted(party.venueID)}
                  onChange={() => this.model.toggleVenueBlacklist(party.venueID)} />
                Blacklist Venue
              </label>
              <label>
                <input type="checkbox"
                  checked={this.model.isPartyBlacklisted(party.partyID)}
                  onChange={() => this.model.togglePartyBlacklist(party.partyID)} />
                Blacklist Party
              </label>
            </PartyCard>
          ))
        }
      </div>
    );
  }

  public renderSquadsCard() {
    return (
      <div className="squads-contents">
        {
          this.model.allSquads.map((squad: ISquadConfig, idx: number) => (
            <SquadCard key={`squad:${idx}`} squadID={squad.squadID} />
          ))
        }
      </div>
    );
  }
  public refresh = () => this.model.getState();

  public render() {
    if (this.model.isReady) {
      const mySquad = this.model.mySquad;
      return (
        <div className="auction-wrapper">
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
                <AuctionInfo auction={mySquad.auction} currentState={this.model.auctionState}>
                  <button type="button" onClick={this.refresh}>Refresh</button>
                </AuctionInfo>
                <div className="squad-info-wrapper">
                  <div className="details-title">Your Squad Info</div>
                  <SquadCard squadID={mySquad.squadID} />
                  <div>{JSON.stringify(mySquad.filters)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>);
    } else return null;
  }
}
