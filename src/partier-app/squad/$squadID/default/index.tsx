import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import PartierCard from "shared/cards/PartierCard";
import ViewSquadModel from "../Model";
import * as moment from "moment";

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
                      <input type="text" className="input is-static" value={this.model.squadName} readOnly />
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
                      <PartierCard userID={this.model.ownerID} />
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
                      <input type="text" className="input is-static" value={this.model.auction.regionID} readOnly />
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
                        value={moment(this.model.auction.partyNight).format("ll")} readOnly />
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
                        value={moment(this.model.auction.startTime).format("llll")} readOnly />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h4 className="title is-4">Members</h4>
              <div className="member-wrapper">
                {this.model.accepted.length > 0 ? <h2 className="subtitle">Accepted</h2> : null}
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
                {this.model.invited.length > 0 ? <h2 className="subtitle">Invited</h2> : null}
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
                {this.model.rejected.length > 0 ? <h2 className="subtitle">Rejected</h2> : null}
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
          </div >
        </div >
      );
    } else {
      return null;
    }
  }
}
