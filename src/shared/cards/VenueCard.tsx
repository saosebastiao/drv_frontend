import * as React from 'react';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getVenue } from "modules/DroverClient";

class VenueCardModel {
	constructor(public venueID: number) {
		this.refresh();
	}
	@observable venueName: string;
	@observable regionID: string;
	@observable address: string;
	@observable photos?: Array<string>;
	@observable location?: GeoJSON.Point;

	@computed get isReady() {
		return this.venueName != null;
	}
	async refresh() {
		const s = getVenue(this.venueID);
		runInAction(() => {
			Object.assign(this, s);
		})
	}
}

interface PVenueCard {
	venueID: number;
}

@observer
export default class SquadCard extends React.Component<PVenueCard, {}>{
	model = new VenueCardModel(this.props.venueID);
	render() {
		return this.model.isReady ? <div>
			<div>Venue Name: {this.model.venueName}</div>
			<div>Address: {this.model.address}</div>
			<div>Region: {this.model.regionID}</div>
			<div>Photos:</div>
		</div> : null;
	}
}
