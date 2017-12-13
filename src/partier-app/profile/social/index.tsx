import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditProfileModel from "./Model";
import ProfileModel from "../Model";

interface PEditSocial extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditSocial extends React.Component<PEditSocial> {
  private profile = new EditProfileModel;
  constructor(props: any) {
    super(props);
  }

  public render() {
    return this.profile.isReady ? (
      <div className="box">
        Social Media Placeholder
      </div>
    ) : null;
  }
}
