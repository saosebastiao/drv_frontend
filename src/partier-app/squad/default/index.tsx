import * as React from "react";
import { observer } from "mobx-react";
import SquadJoinModel from "./Model";
import SquadCard from "shared/cards/SquadCard";
import PartyNightModel from "../Model";
import { RouteComponentProps } from "react-router";

interface IPartyNight {
  partyNight: string;
}
interface PNewSquad extends RouteComponentProps<IPartyNight> {
  model: PartyNightModel;
}

@observer
export default class SquadJoin extends React.Component<PNewSquad> {
  private model = new SquadJoinModel(this.props.match.params.partyNight);
  public submit = async () => {
    const squad = await this.model.create();
    await this.props.model.refresh();
    this.props.history.push(`/partier/squad/${squad}`);
  }

  public render() {
    return (
      <div>
        <div>
          <div>
            <div>Create a new Squad for {this.model.partyNight}<div />
              <div>
                <select value={this.model.regionID} onChange={(e: any) => this.model.regionID = e.target.value}>
                  <option value="">Select a Region</option>
                  {this.model.auctions.map((x) => <option key={x.regionID} value={x.regionID}>{x.regionID}</option>)}
                </select>
              </div>
              <div>
                <label>Squad Name</label>
                <input value={this.model.squadName} onChange={(e: any) => this.model.squadName = e.target.value} />
              </div>
              <button type="button" onClick={() => this.submit()}>Create</button>
            </div>
          </div>
        </div>
        <div className="squad-wrapper">
          <span>Or join an existing squad</span>
          <div className="squad-contents">
            {this.model.invites.map((s) => <SquadCard key={s} squadID={s} />)}
          </div>
        </div>
      </div>
    );
  }
}
