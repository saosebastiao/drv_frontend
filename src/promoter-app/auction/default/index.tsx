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
				this.model.partyNights.map(partyNight => {
					return partyNight.parties.map(party => {
						return <div className="auction-row" key={party.partyID}>
							<div className="date-col">{moment(partyNight.partyNight).format('YYYY-MM-DD')}</div>
							<div className="party-col">{party.partyName} at {party.venue.venueName}</div>
							<div className="city-col">{party.auction.regionID}</div>
							<div className="button-col">
								<Link to={`/promoter/auction/${party.partyID}`}>
									<button className="btn btn-primary">View auction</button>
								</Link>
							</div>
						</div>
					})
				})
			}
		</div> : null;
	}

}