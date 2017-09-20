import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, getSquad } from "modules/DroverClient";
import * as React from "react";
import { Link } from "react-router-dom";

class SquadCardModel {
  @observable public squadID: number;
  @observable public ownerID: string;
  @observable public owner: IPartierProfile;
  @observable public auction: IAuction;
  @observable public squadName: string;
  @observable public squadMembers: Array<ISquadMember>;
  public async refresh() {
    const squad = await getSquad(this.squadID);
    const owner = await getPartierProfile(squad.ownerID);
    runInAction(() => {
      Object.assign(this, squad);
      this.owner = owner;
    });
  }
  constructor(squadID: number) {
    this.squadID = squadID;
    this.refresh();
  }
}

interface PSquadCard {
  squadID: number;
}

@observer
export default class SquadCard extends React.Component<PSquadCard, {}> {
  public model = new SquadCardModel(this.props.squadID);
  public render() {
    return (
      <div className="squad-row" key={this.model.squadID}>
        <div className="date-col">{this.model.squadName}</div>
        <div className="button-col">
          <Link to={`/partier/squad/${this.model.squadID}`}>
            <button className="btn btn-primary">View squad</button>
          </Link>
        </div>
      </div>
    );
  }
}
