import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getParty } from "modules/DroverClient";
import * as React from "react";
import VenueCard from "./VenueCard";

class PartyCardModel {
  constructor(public partyID: number) {
    this.refresh();
  }
  @observable public partyName: string;
  @observable public venue: IVenue;
  @observable public auction: IAuction;
  @computed get isReady() {
    return this.partyName != null;
  }
  private async refresh() {
    const s = await getParty(this.partyID);
    runInAction(() => {
      Object.assign(this, s);
    });
  }
}

interface PPartyCard {
  partyID: number;
  isVenueBlacklisted?: boolean;
  isPartyBlacklisted?: boolean;
  toggleVenueBlacklist?: (venueID: number) => void;
  togglePartyBlacklist?: (partyID: number) => void;
}

@observer
export default class PartyCard extends React.Component<PPartyCard, {}>{
  private model = new PartyCardModel(this.props.partyID);
  public render() {
    return this.model.isReady ? (
      <div className="party-card">
        <header>
          <p>{this.model.partyName}</p>
        </header>
        <div role="body">
          <div role="photo-container">
            <div role="photo">
              <figure>
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
          </div>
          <div role="venue">
            <div><VenueCard key={this.model.venue.venueID} venueID={this.model.venue.venueID} /></div>
          </div>
        </div>
        <footer>
          {this.props.children}
        </footer>
      </div>
    ) : null;
  }
}
