
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";
import PartierCard from "shared/cards/PartierCard";

interface PProfile extends RouteComponentProps<{}> {
  model: ProfileModel;
}

@observer
export default class Profile extends React.Component<PProfile> {
  private profile: ProfileModel;
  /*
  private clickSave = async () => {
    await this.props.model.refresh();
    this.props.history.push("/partier/profile");
  }
  */

  constructor(props: RouteComponentProps<{}> & PProfile) {
    super(props);
    this.profile = this.props.model;
  }

  public render() {
    return (
      <div className="columns">
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Potential Friends</h2>
            <ul className="list-group">
              {this.profile.potential.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Invited Friends</h2>
            <ul className="list-group">
              {this.profile.invited.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Invitations From Friends</h2>
            <ul className="list-group">
              {this.profile.invitations.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Accepted Friends</h2>
            <ul className="list-group">
              {this.profile.accepted.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Rejected Friends</h2>
            <ul className="list-group">
              {this.profile.rejected.map((x) => {
                return (<PartierCard key={x} userID={x} />);
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
