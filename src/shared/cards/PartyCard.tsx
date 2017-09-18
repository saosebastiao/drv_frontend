import * as React from 'react';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getParty } from "modules/DroverClient";
import VenueCard from "./VenueCard";

class PartyCardModel {
	constructor(public partyID: number) {
		this.refresh();
	}
	@observable partyName: string;
	@observable venue: IVenue;
	@observable auction: IAuction;
	@computed get isReady() {
		return this.partyName != null;
	}
	async refresh() {
		const s = await getParty(this.partyID);
		runInAction(() => {
			Object.assign(this, s);
		})
	}
}

interface PPartyCard {
	partyID: number;
}

@observer
export default class PartyCard extends React.Component<PPartyCard, {}>{
	model = new PartyCardModel(this.props.partyID);
	render() {
		return this.model.isReady ? <div>
			<div>Party Name: {this.model.partyName}</div>
			<div>Venue:
				<VenueCard venueID={this.model.venue.venueID} />
			</div>
		</div> : null;
	}
}