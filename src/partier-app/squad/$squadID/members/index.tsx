import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartierCard from "shared/cards/PartierCard";
import EditMembersModel from "./Model";
import ViewSquadModel from "../Model";

interface PEditSquad extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class EditSquad extends React.Component<PEditSquad> {
  private model = new EditMembersModel(this.props.model.squadID, this.props.model.squadMembers);

  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col has-border">
              <div className="member-wrapper">
                {this.model.accepted.length > 0 ? <div>Accepted</div> : null}
                {this.model.accepted.map(x => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}>
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.invited.length > 0 ? <div>Invited</div> : null}
                {this.model.invited.map(x => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}>
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.rejected.length > 0 ? <div>Rejected</div> : null}
                {this.model.rejected.map(x => {
                  return (
                    <PartierCard key={x} userID={x}>
                      <button
                        type="button"
                        className="btn btn-xs btn-primary"
                        onClick={() => this.model.uninviteUser(x)}>
                        Uninvite
                      </button>
                    </PartierCard>
                  );
                })}
                {this.model.potential.length > 0 ? (
                  <div>
                    <div>Potential Invites</div>
                    {this.model.potential.map(x => {
                      return (
                        <PartierCard key={x} userID={x}>
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={() => this.model.inviteUser(x)}>
                            Invite
                          </button>
                        </PartierCard>
                      );
                    })};
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
