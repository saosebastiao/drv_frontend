import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartierCard from "shared/cards/PartierCard";
import ViewSquadModel from "../Model";

interface PViewSquad extends RouteComponentProps<{}> {
  model: ViewSquadModel;
}

@observer
export default class ViewSquad extends React.Component<PViewSquad> {
  public model: ViewSquadModel;
  constructor(props: PViewSquad) {
    super(props);
    this.model = this.props.model;
  }

  public render() {
    if (this.model.isReady) {
      return (
        <div className="squad-wrapper">
          <div className="squad-details-contents">
            <div className="squad-details-row">
              <div className="details-col">
                <div className="info-wrapper">
                  <div className="info-title">Squad Information</div>
                  <div className="info-row">
                    <div className="info-label">Name</div>
                    <div className="info-value">{this.model.squadName}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Owner</div>
                    <PartierCard userID={this.model.ownerID} />
                  </div>
                  {/*
                  */}
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
                </div>
              </div>
              <div className="details-col has-border">
                <div className="member-wrapper">
                  {this.model.accepted.length > 0 ? <div>Accepted</div> : null}
                  {this.model.accepted.map((x) => {
                    return (
                      <PartierCard key={x} userID={x}>
                        {this.model.isSelf(x) ? (
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={this.model.rejectInvite}>
                            Reject
                          </button>
                        ) : null}
                      </PartierCard>
                    );
                  })}
                  {this.model.invited.length > 0 ? <div>Invited</div> : null}
                  {this.model.invited.map((x) => {
                    return (
                      <PartierCard key={x} userID={x}>
                        {this.model.isSelf(x) ? (
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={this.model.acceptInvite}
                          >
                            Accept
                          </button>
                        ) : null}
                        {this.model.isSelf(x) ? (
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={this.model.rejectInvite}
                          >
                            Reject
                          </button>
                        ) : null}
                      </PartierCard>
                    );
                  })}
                  {this.model.rejected.length > 0 ? <div>Rejected</div> : null}
                  {this.model.rejected.map((x) => {
                    return (
                      <PartierCard key={x} userID={x}>
                        {this.model.isSelf(x) ? (
                          <button
                            type="button"
                            className="btn btn-xs btn-primary"
                            onClick={this.model.acceptInvite}
                          >
                            Accept
                          </button>
                        ) : null}
                      </PartierCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
