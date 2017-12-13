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
      <div>
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
      <div>
        {
          this.model.allSquads.map((squad: ISquadConfig, idx: number) => (
            <SquadCard key={`squad:${idx}`} squadID={squad.squadID} />
          ))
        }
      </div>
    );
  }
  private renderAuctionInfo() {
    return (
      <AuctionInfo auction={this.model.mySquad.auction} currentState={this.model.auctionState}>
        <button type="button" className="button" onClick={this.refresh}>Refresh</button>
      </AuctionInfo>
    );
  }
  private renderMySquad() {
    return (
      <SquadCard squadID={this.model.squadID} />
    );
  }
  public refresh = () => this.model.getState();

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
              <h4 className="title is-4">My Squad</h4>
              {this.renderMySquad()}
            </div>
          </div>
        </div >
      );
    } else return null;
  }
}
