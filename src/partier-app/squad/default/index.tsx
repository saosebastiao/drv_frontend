import * as React from "react";
import { observer } from "mobx-react";
import SquadJoinModel from "./Model";
import SquadCard from "shared/cards/SquadCard";
import PartyNightModel from "../Model";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

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
  public componentWillReceiveProps(newProps: PNewSquad) {
    this.model.partyNight = newProps.match.params.partyNight;
  }

  public render() {
    return (
      <div className="columns">
        <div className="column">
          <h2 className="subtitle">Create a Squad</h2>
          <div className="field">
            <label className="label">Select a Region</label>
            <div className="control">
              <div className="select">
                <select
                  value={this.model.regionID}
                  onChange={(e: any) => this.model.regionID = e.target.value}>
                  {this.model.auctions.map((x) =>
                    <option key={x.regionID} value={x.regionID}>{x.regionID}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Squad Name</label>
            <input className="input"
              value={this.model.squadName}
              onChange={(e: any) => this.model.squadName = e.target.value} />
          </div>
          <button className="button is-primary" type="button" onClick={() => this.submit()}>Create</button>
        </div>
        {
          this.model.invites.length > 0 ?
            <div className="column">
              <h2 className="subtitle">Join an existing Squad</h2>
              <div>
                {this.model.invites.map((s) => (
                  <Link to={`/partier/squad/${s}`}>
                    <SquadCard key={s} squadID={s} />
                  </Link>
                ))}
              </div>
            </div> : null
        }
      </div >
    );
  }
}
