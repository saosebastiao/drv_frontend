import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import PartierCard from "shared/cards/PartierCard";
import EditSquadModel from "./Model";

interface PEditSquad {
  squadID: string;
}

@observer
export default class EditSquad extends React.Component<RouteComponentProps<PEditSquad>, {}> {

  private model = new EditSquadModel(parseInt(this.props.match.params.squadID, 10));
  private changeSquadName = (e: any) => {
    this.model.squadName = e.target.value;
  }

  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper" >
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col">
              <div className="info-wrapper">
                <div className="info-title">Squad Information</div>
                <div className="info-row">
                  <div className="info-label">Name</div>
                  <input
                    type="text"
                    defaultValue={this.model.squad.squadName}
                    onChange={this.changeSquadName}
                  />
                </div>
                <div className="info-row">
                  <div className="info-label">Owner</div>
                  <PartierCard userID={this.model.squad.ownerID} />
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <button
                      type="button"
                      className="btn btn-xs btn-primary"
                      onClick={this.model.updateSquad}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <Link to={`/partier/squad/${this.model.squadID}`}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                      >
                        Go To Squad Page
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-value">
                    <Link to={`/partier/auction/${this.model.squadID}`}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                      >
                        Go To Auction Page
                      </button>
                    </Link>
                  </div>
                </div>
              </div >
            </div>
            <div className="details-col has-border">
              <div className="member-wrapper">
                {this.model.accepted.length > 0 ? <div>Accepted</div> : null}
                {this.model.accepted.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}
                      >
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.invited.length > 0 ? <div>Invited</div> : null}
                {this.model.invited.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}
                      >
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.rejected.length > 0 ? <div>Rejected</div> : null}
                {this.model.rejected.map((x) => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}
                      >
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.potential.length > 0 ?
                  <div>
                    <div>Potential Invites</div>
                    {this.model.potential.map((x) => {
                      return (
                        <PartierCard key={x} userID={x}>
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={() => this.model.inviteUser(x)}
                          >
                            Invite
                          </button>
                        </PartierCard>
                      );
                    })}
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
