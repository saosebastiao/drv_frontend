import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyCard from "shared/cards/PartyCard";
import SquadCard from "shared/cards/SquadCard";
import SquadAuctionModel from "./Model";
import ViewSquadModel from "../Model";
import AuctionInfo from "shared/AuctionInfo";

interface PSquadAuction extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class SquadAuction extends React.Component<PSquadAuction> {

  private model = new SquadAuctionModel(this.props.model);

  public componentWillUnmount() {
    this.model.quit();
  }
  public renderPartiesCard() {
    return (
      <div className="parties-contents">
        {
          this.model.allParties.map((party: IPartyConfig, idx: number) => (
            <PartyCard key={`party:${idx}`} partyID={party.partyID} >
              <div>
                <label>
                  <input type="checkbox"
                    checked={this.model.isVenueBlacklisted(party.venueID)}
                    onChange={() => this.model.toggleVenueBlacklist(party.venueID)} />
                  Blacklist Venue
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox"
                    checked={this.model.isPartyBlacklisted(party.partyID)}
                    onChange={() => this.model.togglePartyBlacklist(party.partyID)} />
                  Blacklist Party
                </label>
              </div>
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
                <AuctionInfo auction={this.model.mySquad.auction} currentState={this.model.auctionState}>
                  <button type="button" onClick={this.refresh}>Refresh</button>
                </AuctionInfo>
                <div className="squad-info-wrapper">
                  <div className="details-title">Your Squad Info</div>
                  <SquadCard squadID={this.model.squadID} />
                </div>
              </div>
            </div>
          </div>
        </div>);
    } else return null;
  }
}
