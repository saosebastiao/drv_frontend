import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import CreateModel from "./Model";



@observer
export default class CreateProfile extends React.Component<RouteComponentProps<any>, {}> {
	model: CreateModel;
	constructor(props: RouteComponentProps<any>) {
		super(props);
		const partyNight = this.props.match.params.partyNight;
		this.model = new CreateModel(partyNight);
	}
	submit = async () => {
		const squad = await this.model.create();
		this.props.history.push(`/partier/squad/${squad}`)
	}

	render() {
		return <div>
			<div >
				<div>
					<div>Create a Squad for {this.model.partyNight}<div />
						<div>
							<select value={this.model.regionID} onChange={(e: any) => this.model.regionID = e.target.value}>
								<option value="">Select a Region</option>
								{this.model.auctions.map(x => <option key={x.regionID} value={this.model.regionID}>{x.regionID}</option>)}
							</select>
						</div>
						<div>
							<label>Choose a name for your squad</label>
							<input value={this.model.squadName} onChange={(e: any) => this.model.squadName = e.target.value} />
						</div>
						<button type="button" onClick={() => this.submit()}>Create</button>
						<div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}
