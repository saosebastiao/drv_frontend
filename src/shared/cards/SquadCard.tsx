import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getSquad } from "modules/DroverClient";
import * as React from "react";
import PartierCard from "./PartierCard";

class SquadCardModel {
  constructor(public squadID: number) {
    this.refresh();
  }
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
  submitBid?: () => void;
}

@observer
export default class SquadCard extends React.Component<PSquadCard, {}>{
  public model = new SquadCardModel(this.props.squadID);
  public render() {
    return this.model.isReady ? (
      <div>
        <div>Squad Name: {this.model.squadName}</div>
        <div>Owner: <PartierCard userID={this.model.ownerID} /></div>
        <div>Members:
        {this.model.squadMembers.map((x) => {
            return x.accepted ? <PartierCard userID={x.userID} /> : null;
          })}
        </div>
        {this.props.submitBid ? (
          <button type="button" onClick={this.props.submitBid}>Bid</button>
        ) : null}
      </div>
    ) : null;
  }
}
