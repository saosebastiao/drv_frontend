import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend, unlinkFriend } from "modules/DroverClient";
import Logger from "modules/Logger";
import * as React from "react";

interface PInvitations {
  friendID: string;
  refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Invitations extends React.Component<PInvitations, {}>{
  @observable public name: string;
  @observable public gender: string;
  @observable public photos: Array<string>;
  @computed get isReady() {
    return this.name != null;
  }
  public accept = async () => {
    try {
      const x = await linkFriend(this.props.friendID);
      this.props.refresh(x);
    } catch (e) {
      Logger.error(e);
    }
  }
  public reject = async () => {
    try {
      const x = await unlinkFriend(this.props.friendID);
      this.props.refresh(x);
    } catch (e) {
      Logger.error(e);
    }
  }

  constructor(props: PInvitations) {
    super(props);
    getPartierProfile(this.props.friendID)
      .then((x) => {
        runInAction(() => {
          Object.assign(this, x);
        });
      }).catch((e) => Logger.error(e));
  }

  public render() {
    if (this.isReady) {
      return (
        <li className="list-group-item">
          <span>{this.name}   </span>
          <button className="btn btn-xs btn-primary" onClick={this.accept}>Accept Invitation</button>
          <button className="btn btn-xs btn-danger" onClick={this.reject}>Reject Invitation</button>
        </li>
      );
    } else return null;
  }
}
