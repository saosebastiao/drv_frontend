import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyEditModel from "./Model";

interface PPartyEdit {
  partyID: number;
}

@observer
export default class PartyEdit extends React.Component<RouteComponentProps<PPartyEdit>, {}> {
  public model = new PartyEditModel(this.props.match.params.partyID);
  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        {this.model.partyName}
      </div>
    ) : null;
  }
}
