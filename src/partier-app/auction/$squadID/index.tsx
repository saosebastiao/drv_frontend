import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import * as _ from 'lodash';
import AuctionModel from "./Model";

interface PAuctionForSquad {
	squadID: string;
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PAuctionForSquad>, {}> {

	model = new AuctionModel(parseInt(this.props.match.params.squadID));

	renderPartiesCard() {
		return (
			<div className="parties-contents">
				{
					_.range(10).map((index: number) => (
						<div className="parties-card has-border" key={`auction_parties_card_${index}`}>Party Card {(index + 1)}</div>
					))
				}
			</div>
		);
	}

	renderSquadsCard() {
		return (
			<div className="squads-contents">
				{
					_.range(10).map((index: number) => (
						<div className="squads-card has-border" key={`auction_squads_card_${index}`}>Squad Card {(index + 1)}</div>
					))
				}
			</div>
		);
	}

	render() {
		if (this.model.isReady) {
			const mySquad = this.model.mySquad;
			const auctionInfo = mySquad.auction;
			return <div className="auction-details-contents">
				<div className="auction-details-row">
					<div className="details-col">
						<div className="parties-wrapper has-border">
							<div className="details-title">Parties</div>
							{this.renderPartiesCard()}
						</div>
					</div>
					<div className="details-col">
						<div className="squads-wrapper has-border">
							<div className="details-title">Squads</div>
							{this.renderSquadsCard()}
						</div>
					</div>
					<div className="details-col">
						<div className="auction-info-wrapper">
							<div className="details-title">Auction Info</div>
							<div>{auctionInfo.regionID}</div>
							<div>{auctionInfo.partyNight}</div>
							<div>{auctionInfo.startTime}</div>
							<div>{auctionInfo.endTime}</div>
							<div>{auctionInfo.entryFreeze}</div>
							<div>{auctionInfo.priceStart}</div>
							<div>{auctionInfo.priceDrop}</div>
							<div>{auctionInfo.dropInterval}</div>
						</div>
						<div className="squad-info-wrapper">
							<div className="details-title">Your Squad Info</div>
							<div>{mySquad.squadName}</div>
							<div>{JSON.stringify(mySquad.squadMembers)}</div>
							<div>{JSON.stringify(mySquad.filters)}</div>
						</div>
					</div>
				</div>
			</div>;
		} else return null;
	}

}