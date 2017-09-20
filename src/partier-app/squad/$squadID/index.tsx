import { observer } from "mobx-react";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import SquadFilters from "shared/widgets/SquadFilters";
import MemberCard from "./MemberCard";
import ViewSquadModel from "./Model";

interface PViewSquad {
  squadID: string;
}

@observer
export default class ViewSquad extends React.Component<RouteComponentProps<PViewSquad>, {}> {

  public model: ViewSquadModel;
  constructor(props: RouteComponentProps<PViewSquad>) {
    super(props);
    const squadID = parseInt(props.match.params.squadID, 10);
    this.model = new ViewSquadModel(squadID);
  }

  public renderAuctionInfo() {
    return (
      <div className="info-wrapper">
        <div className="info-title">Auction Information</div>
        <div className="info-row">
          <div className="info-label">City</div>
          <div className="info-value">{this.model.auction.regionID}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Party Night</div>
          <div className="info-value">{this.model.auction.partyNight}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Auction Start Time</div>
          <div className="info-value">{this.model.auction.startTime}</div>
        </div>
        <Link to={`/partier/auction/${this.model.squadID}`}> Go To Auction Page</Link>
      </div>
    );
  }
  public renderSquadPref() {
    return (
      <div className="info-wrapper">
        <div className="info-title">Squad Information</div>
        <div className="info-row">
          <div className="info-label">Name</div>
          <div className="info-value">{this.model.squadName}</div>
        </div>
        <SquadFilters isOwned={this.model.isOwned} filters={this.model.filters} />
      </div>
    );
  }

  public render() {
    return this.model.isReady ? (
      <div className="squad-wrapper">
        <div className="squad-details-contents">
          <div className="squad-details-row">
            <div className="details-col">
              {this.renderAuctionInfo()}
              {this.renderSquadPref()}
            </div>
            <div className="details-col has-border">
              <div className="member-wrapper">
                {this.model.myself && this.model.myself.invited && !this.model.myself.accepted ? (
                  <MemberCard
                    userID={this.model.myself.userID}
                    isSelf
                    accept={() => this.model.acceptInvite()}
                    reject={() => this.model.rejectInvite()}
                  />)
                  : null}
                {this.model.accepted.length > 0 ? <div>Accepted</div> : null}
                {this.model.accepted.map((x) => {
                  return <MemberCard
                    key={x}
                    userID={x}
                    isOwned={this.model.isOwned}
                    uninvite={() => this.model.uninviteUser(x)}
                  />;
                })}
                {this.model.rejected.length > 0 ? <div>Rejected</div> : null}
                {this.model.rejected.map((x) => {
                  return <MemberCard
                    key={x}
                    userID={x}
                    isOwned={this.model.isOwned}
                    uninvite={() => this.model.uninviteUser(x)}
                  />;
                })}
                {this.model.invited.length > 0 ? <div>Invited</div> : null}
                {this.model.invited.map((x) => {
                  return <MemberCard
                    key={x}
                    userID={x}
                    isOwned={this.model.isOwned}
                    uninvite={() => this.model.uninviteUser(x)}
                  />;
                })}
                {this.model.isOwned && this.model.potential.length > 0 ?
                  <div>
                    <div>Potential Invites</div>
                    {this.model.potential.map((x) => {
                      return <MemberCard
                        key={x}
                        userID={x}
                        isOwned={this.model.isOwned}
                        invite={() => this.model.inviteUser(x)}
                      />;
                    })}
                  </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>) : null;
  }

}
