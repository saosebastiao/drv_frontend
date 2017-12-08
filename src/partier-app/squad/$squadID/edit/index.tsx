import { observer } from "mobx-react";
import * as React from "react";
import EditSquadModel from "./Model";
import ViewSquadModel from "../Model";
import { RouteComponentProps } from "react-router";

interface PEditSquad extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditSquad extends React.Component<PEditSquad> {
  private model = new EditSquadModel(this.props.model.squadID, this.props.model.squadName);
  private changeSquadName = (e: any) => {
    this.model.squadName = e.target.value;
  }
  private updateSquad = async () => {
    await this.model.updateSquad();
    this.props.history.push(`/partier/squad/${this.props.model.squadID}`);
  }

  public render() {
    return (
      <div className="box">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Squad Name</label>
              <div className="control">
                <input type="text" className="input"
                  onChange={this.changeSquadName} value={this.model.squadName} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="button" onClick={this.updateSquad} className="button">Save</button>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}
