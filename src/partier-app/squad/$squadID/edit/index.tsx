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
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col">
              <div className="info-wrapper">
                <div className="info-title">Squad Information</div>
                <div className="info-row">
                  <div className="info-label">Name</div>
                  <input
                    type="text"
                    value={this.model.squadName}
                    onChange={this.changeSquadName}
                  />
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <button
                      type="button"
                      className="btn btn-xs btn-primary"
                      onClick={this.updateSquad}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
