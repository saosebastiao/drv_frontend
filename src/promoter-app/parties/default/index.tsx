import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import SquadListModel from "./Model";

@observer
export default class SquadList extends React.Component<RouteComponentProps<any>, {}> {
	model = new SquadListModel;
	render() {

		return <div className="squad-wrapper">
			<div className="squad-contents">
				{
					this.model.list.map((partyNight: any) => {
						return (
							<div className="squad-row" key={`squad_item_${partyNight.partyNight}`}>
								<div className="date-col">{moment(partyNight.partyNight).format('YYYY-MM-DD')}</div>
								<div className="button-col">
									{partyNight.squadID ? (
										<Link to={`/partier/squad/${partyNight.squadID}`}><button className="btn btn-primary">View your squad</button></Link>) :
										<Link to={`/partier/squad/create/${partyNight.partyNight}`}><button className="btn btn-primary">Create a squad</button></Link>}
									{partyNight.invites > 0 ? (
										<Link to={`/partier/squad/invites/${partyNight.partyNight}`}><button className="btn btn-primary">View squad invites</button></Link>
									) : null}
								</div>
							</div>
						);
					})
				}
			</div>
		</div>;
	}
}