import * as React from 'react';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getSquad } from "modules/DroverClient";

class SquadCardModel {
	constructor(public squadID: number) {
		this.refresh();
	}
	@observable squadName: string;
	@observable ownerID: string;
	@observable auction: IAuction;
	@observable filters?: ISquadFilters;
	@observable squadMembers?: Array<ISquadMember>;
	@computed get isReady() {
		return this.squadName != null;
	}
	async refresh() {
		const s = getSquad(this.squadID);
		runInAction(() => {
			Object.assign(this, s);
		})
	}
}

interface PSquadCard {
	squadID: number;
}

@observer
export default class SquadCard extends React.Component<PSquadCard, {}>{
	model = new SquadCardModel(this.props.squadID);
	render() {
		return this.model.isReady ? <div>
			<div>Squad Name: {this.model.squadName}</div>
			<div>Owner:</div>
			<div>Members:</div>
		</div> : null;
	}
}