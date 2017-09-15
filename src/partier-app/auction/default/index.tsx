import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import AuctionListModel from "./Model";


@observer
export default class AuctionList extends React.Component<RouteComponentProps<any>, {}> {
	model = new AuctionListModel;

	render() {
		return this.model.isReady ? <div className="auction-contents">
			{
				this.model.squads.map(squad => {
					return (
						<div className="auction-row" key={squad.squadID}>
							<div className="date-col">{moment(squad.auction.partyNight).format('YYYY-MM-DD')}</div>
							<div className="city-col">{squad.auction.regionID}</div>
							<div className="button-col">
								<Link to={`/partier/auction/${squad.squadID}`}><button className="btn btn-primary">View auction</button></Link>
							</div>
						</div>
					);
				})
			}
		</div> : null;
	}

}