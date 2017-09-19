import { computed, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile } from "modules/DroverClient";
import * as React from "react";

class MemberCardModel {
  @observable public userID: string;
  @observable public invited: boolean;
  @observable public name: string;
  @observable public defaultRegion: string;
  @observable public gender: string;
  @computed get isReady() {
    return this.name != null;
  }

  constructor(userID: string) {
    this.userID = userID;
    getPartierProfile(userID).then((x) => {
      runInAction(() => {
        Object.assign(this, x);
      });
    });
  }
}

interface PMemberCard {
  userID: string;
  isOwned?: boolean;
  isSelf?: boolean;
  invite?: () => void;
  uninvite?: () => void;
  accept?: () => void;
  reject?: () => void;
}

@observer
export default class MemberCard extends React.Component<PMemberCard, {}> {

  public model: MemberCardModel;
  constructor(props: PMemberCard) {
    super(props);
    this.model = new MemberCardModel(this.props.userID);
  }

  public render() {
    return this.model.isReady ? (
      <div className="member-card" >
        <div className="card-photo" />
        <div className="card-info">
          <h5>{this.model.name}</h5>
          {this.props.isOwned && this.props.invite ?
            <button type="button" className="btn btn-xs btn-primary" onClick={this.props.invite}>Invite</button> : null}
          {this.props.isOwned && this.props.uninvite ?
            <button
              type="button"
              className="btn btn-xs btn-primary"
              onClick={this.props.uninvite}
            >
              Uninvite
            </button> : null}
          {this.props.isSelf ?
            <button type="button" className="btn btn-xs btn-primary" onClick={this.props.accept}>Accept</button> : null}
          {this.props.isSelf ?
            <button type="button" className="btn btn-xs btn-primary" onClick={this.props.reject}>Reject</button> : null}
        </div>
      </div>
    ) : null;
  }
}
