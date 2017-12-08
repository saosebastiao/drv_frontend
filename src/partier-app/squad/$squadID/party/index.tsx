import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ViewAssignedPartyModel from "./Model";
import ViewSquadModel from "../Model";

interface PEditPayouts extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class ViewAssignedParty extends React.Component<PEditPayouts> {
  private model = new ViewAssignedPartyModel(this.props.model.squadID);

  public render() {
    return this.model.isReady ? (
      <div className="box">
        Payouts Placeholder
      </div>
    ) : null;
  }
}
