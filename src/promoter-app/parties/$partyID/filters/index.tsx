import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartyEditModel from "./Model";
import ShowPartyModel from "../Model";

interface PEditParty extends RouteComponentProps<{}> {
  model: ShowPartyModel;
}

@observer
export default class EditParty extends React.Component<PEditParty> {
  public model = new PartyEditModel(this.props.model.partyID);
  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        {this.model.partyName}
      </div>
    ) : null;
  }
}
