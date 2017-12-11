import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditSocialModel from "./Model";
import ViewSquadModel from "../Model";

interface PEditSocial extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditSocial extends React.Component<PEditSocial> {
  private model = new EditSocialModel(this.props.model.squadID);

  public render() {
    return this.model.isReady ? (
      <div className="box">
        Social Media Placeholder
      </div>
    ) : null;
  }
}
