import * as React from 'react';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getSquad } from "modules/DroverClient";

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
		const s = getSquad(this.partyID);
		runInAction(() => {
			Object.assign(this, s);
		})
	}
}

interface PPartyCard {
	squadID: number;
}

@observer
export default class PartyCard extends React.Component<PPartyCard, {}>{
	model = new PartyCardModel(this.props.squadID);
	render() {
		return this.model.isReady ? <div>
			<div>Party Name: {this.model.partyName}</div>
			<div>Venue: {this.model.venue.venueName}</div>
		</div> : null;
	}
}