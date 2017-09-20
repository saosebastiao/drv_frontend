import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, unlinkFriend } from "modules/DroverClient";
import Logger from "modules/Logger";
import * as React from "react";

interface PAccepted {
  friendID: string;
  refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Accepted extends React.Component<PAccepted, {}>{
  @observable public name: string;
  @observable public gender: string;
  @observable public photos: Array<string>;
  @computed get isReady() {
    return this.name != null;
  }
  public block = async () => {
    try {
      const x = await unlinkFriend(this.props.friendID);
      this.props.refresh(x);
    } catch (e) {
      Logger.error(e);
    }
  }

  constructor(props: PAccepted) {
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
          <button className="btn btn-xs btn-danger" onClick={this.block}>Block Friend</button>
        </li>
      );
    } else return null;
  }
}
