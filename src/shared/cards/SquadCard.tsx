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
      <div>
        <div>SquadID: {this.props.squadID}</div>
        <div>Squad Name: {this.model.squadName}</div>
        <div>Owner: <PartierCard key={this.model.ownerID} userID={this.model.ownerID} /></div>
        <div>Members:
        {this.model.squadMembers.map((x) => {
            return x.accepted ? <PartierCard key={x.userID} userID={x.userID} /> : null;
          })}
        </div>
        {this.props.children}
      </div>
    ) : null;
  }
}
