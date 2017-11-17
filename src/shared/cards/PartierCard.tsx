import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile } from "modules/DroverClient";
import * as React from "react";

class PartierCardModel {
  constructor(public userID: string) {
    this.refresh();
  }
  @observable public name: string;
  @observable public email: string;
  @observable public defaultRegion: string;
  @observable public gender: IAuction;
  @observable public filters?: ISquadFilters;
  @observable public photos?: Array<string>;
  @computed get isReady() {
    return this.name != null;
  }
  public async refresh() {
    const s = await getPartierProfile(this.userID);
    runInAction(() => {
      Object.assign(this, s);
    });
  }
}

interface PPartierCard {
  userID: string;
}

@observer
export default class PartierCard extends React.Component<PPartierCard, {}>{
  public model = new PartierCardModel(this.props.userID);
  public render() {
    return this.model.isReady ? (
      <div className="partier-card">
        <div role="body">
          <div role="photo-container">
            <div role="photo">
              <figure>
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
            <div role="name">
              <p className="title is-4">{this.model.name}</p>
            </div>
          </div>
        </div>
      </div >
    ) : null;
  }
}
