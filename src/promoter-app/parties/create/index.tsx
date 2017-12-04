import { observer } from "mobx-react";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import CreatePartyModel from "./Model";

interface PCreatePartyParams {
  partyNight: string;
  venueID: string;
}
interface PCreateParty extends RouteComponentProps<PCreatePartyParams> { }

@observer
export default class CreateParty extends React.Component<PCreateParty> {
  constructor(props: PCreateParty) {
    super(props);
    const params = this.props.match.params;
    const v = parseInt(params.venueID, 10);
    this.model = new CreatePartyModel(params.partyNight, v);
  }
  private model: CreatePartyModel;
  private submit = async () => {
    const partyID = await this.model.create();
    const partyNight = this.model.partyNight;
    this.props.history.push(`/promoter/parties/${partyNight}/${partyID}`);
  }
  private updatePartyName = (e: any) => {
    this.model.partyName = e.target.value;
  }
  private updateVenue = (e: any) => {
    this.model.venueID = e.target.value;
  }
  public componentWillReceiveProps(next: PCreateParty) {
    this.model.partyNight = next.match.params.partyNight;
  }

  public render() {
    return this.model.isReady ? (
      <div>
        <div >
          <div>
            <div>Create a Party for {this.model.partyNight}<div />
              <div>
                <select value={this.model.venueID} onChange={this.updateVenue}>
                  <option value="">Select a Venue</option>
                  {this.model.venues.map((x) => <option key={x.venueID} value={x.venueID}>{x.venueName}</option>)}
                </select>
              </div>
              <div>
                <label>Choose a name for your party</label>
                <input value={this.model.partyName} onChange={this.updatePartyName} />
              </div>
              <button type="button" onClick={() => this.submit()}>Create</button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
