import { observer } from "mobx-react";
import { observable } from "mobx";
import * as React from "react";
import PartyListModel from "../Model";
import { RouteComponentProps } from "react-router";

interface PCreateParty extends RouteComponentProps<{}> {
  model: PartyListModel;
}

@observer
export default class CreateParty extends React.Component<PCreateParty> {
  @observable private partyName = "";
  constructor(props: PCreateParty) {
    super(props);
  }
  private submit = async () => {
    const party = await this.props.model.createParty(this.partyName);
    this.props.history.push(`/promoter/parties/${party.partyID}`);
  }

  public render() {
    const venueName = this.props.model.venue && this.props.model.venue.venueName || "";
    return (
      <div>
        <div >
          <div>
            <div>Create a Party for {this.props.model.partyNight} {venueName ? `at ${venueName}` : ""} <div />
              <div>
                <label>Choose a name for your party </label>
                <input value={this.partyName} onChange={(e) => this.partyName = e.target.value} />
              </div>
              <button type="button" onClick={() => this.submit()}>Create</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
