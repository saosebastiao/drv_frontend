import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getSquad } from "modules/DroverClient";
import * as React from "react";
import PartierCard from "./PartierCard";

class SquadCardModel {
  constructor(squadID: number) {
    this.squadID = squadID;
    this.refresh();
  }
  @observable public squadID: number;
  @observable public squadName: string;
  @observable public ownerID: string;
  @observable public auction: IAuction;
  @observable public filters?: ISquadFilters;
  @observable public squadMembers: Array<ISquadMember> = [];
  @computed get isReady() {
    return this.squadName != null;
  }
  public async refresh() {
    const s = await getSquad(this.squadID);
    runInAction(() => {
      Object.assign(this, s);
    });
  }
}

interface PSquadCard {
  squadID: number;
  squad?: ISquadConfig;
}

/**
 * Different view types:
 * Base, uses photo array
 * Extended for modal, uses individual partiers
 */

@observer
export default class SquadCard extends React.Component<PSquadCard, {}>{
  private model = new SquadCardModel(this.props.squadID);
  public componentWillReceiveProps(nextProps: PSquadCard) {
    if (nextProps.squad && nextProps.squad.squadMembers) {
      this.model.squadMembers = nextProps.squad.squadMembers;
    }
  }
  public render() {
    return this.model.isReady ? (
      <div className="squad-card">
        <header>
          <p>{this.model.squadName}</p>
        </header>
        <div role="body">
          <div role="photo-container">
            <div role="photo">
              <figure>
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
              </figure>
            </div>
          </div>
          <div role="members">
            <div><PartierCard key={this.model.ownerID} userID={this.model.ownerID} /></div>
            <div>
              {this.model.squadMembers.map((x) => {
                return x.accepted ? <PartierCard key={x.userID} userID={x.userID} /> : null;
              })}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
