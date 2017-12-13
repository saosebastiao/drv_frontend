
import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import ProfileModel from "../Model";
import PartierCard from "shared/cards/PartierCard";
import { linkFriend, unlinkFriend } from "modules/DroverClient";
import Logger from "modules/Logger";

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

  private invite = async (userID: string) => {
    try {
      const x = await linkFriend(userID);
      this.props.model.friends = x;
    } catch (e) {
      Logger.error(e);
    }
  }
  private block = async (userID: string) => {
    try {
      const x = await unlinkFriend(userID);
      this.props.model.friends = x;
    } catch (e) {
      Logger.error(e);
    }
  }
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
                return (
                  <li key={x}>
                    <PartierCard userID={x} >
                      <button
                        onClick={() => this.invite(x)}
                        className="button is-primary" >
                        Connect
                      </button>
                      <button
                        onClick={() => this.block(x)}
                        className="button is-info">
                        Block
                      </button>
                    </PartierCard>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Invited Friends</h2>
            <ul className="list-group">
              {this.profile.invited.map((x) => {
                return (
                  <li key={x}>
                    <PartierCard userID={x} >
                      <button
                        onClick={() => this.block(x)}
                        className="button is-info">
                        Block
                      </button>
                    </PartierCard>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Invitations From Friends</h2>
            <ul className="list-group">
              {this.profile.invitations.map((x) => {
                return (
                  <li key={x}>
                    <PartierCard userID={x} >
                      <button
                        onClick={() => this.invite(x)}
                        className="button is-primary" >
                        Accept
                      </button>
                      <button
                        onClick={() => this.block(x)}
                        className="button is-info">
                        Reject
                      </button>
                    </PartierCard>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Accepted Friends</h2>
            <ul className="list-group">
              {this.profile.accepted.map((x) => {
                return (
                  <li key={x}>
                    <PartierCard userID={x} >
                      <button
                        onClick={() => this.block(x)}
                        className="button is-info">
                        Block
                      </button>
                    </PartierCard>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Rejected Friends</h2>
            <ul className="list-group">
              {this.profile.rejected.map((x) => {
                return (
                  <li key={x}>
                    <PartierCard userID={x} >
                      <button
                        onClick={() => this.invite(x)}
                        className="button is-primary" >
                        Accept
                      </button>
                    </PartierCard>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div >
    );
  }
}
