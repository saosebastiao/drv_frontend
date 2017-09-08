import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import CreatePartyModel from "./Model";


interface PCreateParty {
	partyNight: string;
}

@observer
export default class CreateParty extends React.Component<RouteComponentProps<PCreateParty>, {}> {
	model = new CreatePartyModel(this.props.match.params.partyNight);
	submit = async () => {
		const partyID = await this.model.create();
		this.props.history.push(`/promoter/parties/${partyID}`);
	}
	updatePartyName = (e: any) => {
		this.model.partyName = e.target.value
	}
	updateVenue = (e: any) => {
		this.model.venueID = e.target.value
	}

	render() {
		return this.model.isReady ? <div>
			<div >
				<div>
					<div>Create a Party for {this.model.partyNight}<div />
						<div>
							<select value={this.model.venueID} onChange={this.updateVenue}>
								<option value="">Select a Venue</option>
								{this.model.venues.map(x => <option key={x.venueID} value={x.venueID}>{x.venueName}</option>)}
							</select>
						</div>
						<div>
							<label>Choose a name for your party</label>
							<input value={this.model.partyName} onChange={this.updatePartyName} />
						</div>
						<button type="button" onClick={() => this.submit()}>Create</button>
						<div>
						</div>
					</div>
				</div>
			</div>
		</div> : null;
	}
}
