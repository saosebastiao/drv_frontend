import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import InvitesListModel from "./Model";

@observer
export default class InvitesList extends React.Component<RouteComponentProps<any>, {}> {
	model = new InvitesListModel(this.props.match.params.partyNight);
	render() {
		return <div className="squad-wrapper">
			<div className="squad-contents">
				{
					this.model.squadList.map((squad: ISquad) => {
						return (
							<div className="squad-row" key={`squad_item_${squad.squadID}`}>
								<div className="date-col">{squad.squadName}</div>
								<div className="button-col">
									<Link to={`/partier/squad/${squad.squadID}`}>
										<button className="btn btn-primary">View squad</button>
									</Link>

								</div>
							</div>
						);
					})
				}
			</div>
		</div>;
	}
}