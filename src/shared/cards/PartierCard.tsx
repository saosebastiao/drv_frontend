import * as React from 'react';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile } from "modules/DroverClient";

class PartierCardModel {
	constructor(public userID: string) {
		this.refresh();
	}
	@observable name: string;
	@observable email: string;
	@observable defaultRegion: string;
	@observable gender: IAuction;
	@observable filters?: ISquadFilters;
	@observable photos?: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	async refresh() {
		const s = getPartierProfile(this.userID);
		runInAction(() => {
			Object.assign(this, s);
		})
	}
}

interface PPartierCard {
	userID: string;
}

@observer
export default class PartierCard extends React.Component<PPartierCard, {}>{
	model = new PartierCardModel(this.props.userID);
	render() {
		return this.model.isReady ? <div>
			<div>Name: {this.model.name}</div>
			<div>Email: {this.model.email}</div>
			<div>Gender: {this.model.gender}</div>
			<div>Photos:</div>
		</div> : null;
	}
}