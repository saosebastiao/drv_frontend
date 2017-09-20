import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getVenue } from "modules/DroverClient";
import * as React from "react";

class VenueCardModel {
  constructor(public venueID: number) {
    this.refresh();
  }
  @observable public venueName: string;
  @observable public regionID: string;
  @observable public address: string;
  @observable public photos?: Array<string>;
  @observable public location?: GeoJSON.Point;

  @computed get isReady() {
    return this.venueName != null;
  }
  public async refresh() {
    const s = await getVenue(this.venueID);
    runInAction(() => {
      Object.assign(this, s);
    });
  }
}

interface PVenueCard {
  venueID: number;
}

@observer
export default class SquadCard extends React.Component<PVenueCard, {}>{
  public model = new VenueCardModel(this.props.venueID);
  public render() {
    return this.model.isReady ? (
      <div>
        <div>Venue Name: {this.model.venueName}</div>
        <div>Address: {this.model.address}</div>
        <div>Region: {this.model.regionID}</div>
        <div>Photos:</div>
        {this.props.children}
      </div>
    ) : null;
  }
}
