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
					this.model.list.map((partyNight: IPromoterPartyNight) => {
						return (
							<div className="squad-row" key={`squad_item_${partyNight.partyNight}`}>
								<div className="date-col">{moment(partyNight.partyNight).format('YYYY-MM-DD')}</div>
								<div className="button-col">
									{partyNight.parties.map(party => {
										return <Link key={party.partyID} to={`/promoter/parties/${party.partyID}`}>
											<button className="btn btn-primary">
												View {party.partyName} at {party.venue.venueName}
											</button>
										</Link>
									})}
									<Link to={`/promoter/parties/create/${partyNight.partyNight}`}>
										<button className="btn btn-primary">Create a Party</button>
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