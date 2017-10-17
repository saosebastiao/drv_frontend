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
    if (this.model.isReady) {
      return (
        <div>
          <div>Party Name: {this.model.partyName}</div>
          <div>Venue:
          <VenueCard venueID={this.model.venue.venueID} />
            {this.props.children}
          </div>
        </div>
      );

    } else return null;
  }
}
