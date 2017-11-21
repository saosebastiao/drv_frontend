import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import FriendsWidget from "./FriendsWidget";
import ProfileModel from "../Model";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class EditFriends extends React.Component<PProfile> {

  constructor(props: any) {
    super(props);
  }
  private clickSave = async () => {
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
  }

  public render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-contents">
          <FriendsWidget />
          <button className="btn btn-lg btn-primary" onClick={this.clickSave}>Save</button>
        </div>
      </div>
    );
  }
}
