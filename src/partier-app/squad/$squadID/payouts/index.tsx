import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import PartierCard from "shared/cards/PartierCard";
import EditPayoutsModel from "./Model";
import ViewSquadModel from "../Model";

interface PEditPayouts extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditPayouts extends React.Component<PEditPayouts> {
  private model = new EditPayoutsModel(this.props.model);

  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col">
              <div className="info-wrapper">
                <div className="info-title">Squad Information</div>
                <div className="info-row">
                  {this.props.model.squadName}
                </div>
                <div className="info-row">
                  <div className="info-label">Owner</div>
                  <PartierCard userID={this.props.model.ownerID} />
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <button
                      type="button"
                      className="btn btn-xs btn-primary"
                      onClick={this.model.refresh}>
                      Save
                    </button>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <Link to={`/partier/squad/${this.props.model.squadID}`}>
                      <button type="button" className="btn btn-xs btn-primary">
                        Go To Squad Page
                      </button>
                    </Link>
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
