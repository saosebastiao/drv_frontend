import * as React from "react";
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { getSquad, getPartierProfile } from "modules/DroverClient";

class SquadCardModel {
	@observable squadID: number;
	@observable ownerID: string;
	@observable owner: IPartierProfile;
	@observable auction: IAuction;
	@observable squadName: string;
	@observable squadMembers: Array<ISquadMember>;
	async refresh() {
		let squad = await getSquad(this.squadID);
		let owner = await getPartierProfile(squad.ownerID);
		runInAction(() => {
			Object.assign(this, squad);
			this.owner = owner;
		});
	}
	constructor(squadID: number) {
		this.squadID = squadID;
		this.refresh();
	}
}

interface PSquadCard {
	squadID: number;
}

@observer
export default class SquadCard extends React.Component<PSquadCard, {}> {
	model = new SquadCardModel(this.props.squadID);
	render() {
		return <div className="squad-row" key={this.model.squadID}>
			<div className="date-col">{this.model.squadName}</div>
			<div className="button-col">
				<Link to={`/partier/squad/${this.model.squadID}`}>
					<button className="btn btn-primary">View squad</button>
				</Link>
			</div>
		</div>
	}
}