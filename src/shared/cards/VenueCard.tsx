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
      <div className="venue-card">
        <div role="body">
          <div role="photo-container">
            <div role="photo">
              <figure>
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
            <div role="info">
              <p>{this.model.venueName}</p>
              <div>
                <p>{this.model.address}</p>
                <p>{this.model.regionID}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div >
    ) : null;
  }
}
