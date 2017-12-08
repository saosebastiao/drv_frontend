import { observer } from "mobx-react";
import * as React from "react";
import EditSquadModel from "./Model";
import ViewSquadModel from "../Model";
import { RouteComponentProps } from "react-router";
import PartierCard from "shared/cards/PartierCard";
import * as moment from "moment";

interface PEditSquad extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditSquad extends React.Component<PEditSquad> {

  private model = new EditSquadModel(this.props.model.squadID, this.props.model.squadName);
  private changeSquadName = (e: any) => {
    this.model.squadName = e.target.value;
  }
  private updateSquad = async () => {
    await this.model.updateSquad();
    await this.props.model.refresh();
    this.props.history.push(`/partier/squad/${this.props.model.squadID}`);
  }
  private inviteUser = async (userID: string) => {
    await this.model.inviteUser(userID);
    await this.props.model.refresh();
  }
  private uninviteUser = async (userID: string) => {
    await this.model.uninviteUser(userID);
    await this.props.model.refresh();
  }

  public render() {
    if (this.props.model.isReady && this.model.isReady) {
      return (
        <div className="box">
          <div className="columns">
            <div className="column">
              <h4 className="title is-4">Squad Information</h4>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Squad Name</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input type="text" className="input"
                        value={this.model.squadName} onChange={this.changeSquadName} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Owner</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <PartierCard userID={this.props.model.ownerID} />
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="title is-4">Auction Information</h4>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">City</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input type="text" className="input is-static"
                        value={this.props.model.auction.regionID} readOnly />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Party Night</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input type="text" className="input is-static"
                        value={moment(this.props.model.auction.partyNight).format("ll")} readOnly />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Start Time</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input type="text"
                        className="input is-static"
                        value={moment(this.props.model.auction.startTime).format("llll")} readOnly />
                    </p>
                  </div>
                </div>
              </div>
              <button className="button is-primary" onClick={this.updateSquad}>Save</button>
            </div>
            <div className="column">
              <h4 className="title is-4">Members</h4>
              <div className="member-wrapper">
                {this.props.model.accepted.length > 0 ? <h2 className="subtitle">Accepted</h2> : null}
                {this.props.model.accepted.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button type="button" className="button is-danger"
                        onClick={() => this.uninviteUser(x)}>
                        Uninvite
                        </button>
                    </PartierCard>
                  );
                })}
                {this.props.model.invited.length > 0 ? <h2 className="subtitle">Invited</h2> : null}
                {this.props.model.invited.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button type="button" className="button is-danger"
                        onClick={() => this.uninviteUser(x)}>
                        Uninvite
                        </button>
                    </PartierCard>
                  );
                })}
                {this.props.model.rejected.length > 0 ? <h2 className="subtitle">Rejected</h2> : null}
                {this.props.model.rejected.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button type="button" className="button is-danger"
                        onClick={() => this.uninviteUser(x)}>
                        Uninvite
                        </button>
                    </PartierCard>
                  );
                })}
                {this.props.model.potential.length > 0 ? <h2 className="subtitle">Potential Invites</h2> : null}
                {this.props.model.potential.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button type="button" className="button is-primary"
                        onClick={() => this.inviteUser(x)}>
                        Invite
                      </button>
                    </PartierCard>
                  );
                })}
              </div>
            </div>
          </div >
        </div >
      );
    } else {
      return null;
    }
  }
}
