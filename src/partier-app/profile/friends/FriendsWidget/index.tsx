import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierFriends } from "modules/DroverClient";
import * as React from "react";
import Accepted from "./Accepted";
import Invitations from "./Invitations";
import Invited from "./Invited";
import Potential from "./Potential";
import Rejected from "./Rejected";

class FriendsModel {
  @computed get isReady() {
    return this.friends != null;
  }
  @observable public friends: IPartierFriends;
  @computed get rejected() {
    return this.friends && this.friends.rejected || [];
  }
  @computed get invited() {
    return this.friends && this.friends.invited || [];
  }
  @computed get invitations() {
    return this.friends && this.friends.invitations || [];
  }
  @computed get accepted() {
    return this.friends && this.friends.accepted || [];
  }
  @computed get potential() {
    return this.friends && this.friends.potential || [];
  }
  public refresh = async (friends?: IPartierFriends) => {
    let f: IPartierFriends;
    if (friends != null) {
      f = friends;
    } else {
      f = await getPartierFriends();
    }
    runInAction(() => {
      this.friends = f;
    });
  }
  constructor() {
    this.refresh();
  }
}

@observer
export default class FriendsWidget extends React.Component<{}, {}> {
  public model = new FriendsModel;

  public render() {
    return (
      <div className="profile-wrapper">
        <div className="friend-list">
          <div><span>Potential Friends</span></div>
          <ul className="list-group">
            {this.model.potential.map((x) => {
              return <Potential key={x} friendID={x} refresh={this.model.refresh} />;
            })}
          </ul>
          <div><span>Invited Friends</span></div>
          <ul className="list-group">
            {this.model.invited.map((x) => {
              return <Invited key={x} friendID={x} refresh={this.model.refresh} />;
            })}
          </ul>
          <div><span>Invitations from Friends</span></div>
          <ul className="list-group">
            {this.model.invitations.map((x) => {
              return <Invitations key={x} friendID={x} refresh={this.model.refresh} />;
            })}
          </ul>
          <div><span>Accepted Friends</span></div>
          <ul className="list-group">
            {this.model.accepted.map((x) => {
              return <Accepted key={x} friendID={x} refresh={this.model.refresh} />;
            })}
          </ul>
          <div><span>Rejected Friends</span></div>
          <ul className="list-group">
            {this.model.rejected.map((x) => {
              return <Rejected key={x} friendID={x} refresh={this.model.refresh} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
