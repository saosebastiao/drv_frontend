import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import * as _ from 'lodash';
import AuctionModel from "./Model";
import SquadCard from "shared/cards/SquadCard";
import PartyCard from "shared/cards/PartyCard";

interface PAuctionForSquad {
	squadID: string;
}

@observer
export default class AuctionID extends React.Component<RouteComponentProps<PAuctionForSquad>, {}> {

	model = new AuctionModel(parseInt(this.props.match.params.squadID));

	componentWillUnmount() {
		this.model.quit();
	}
	renderPartiesCard() {
		return (
			<div className="parties-contents">
				{
					this.model.allParties.map((party: IPartyConfig, idx: number) => (
						<PartyCard key={idx} partyID={party.partyID} />
					))
				}
			</div>
		);
	}

	renderSquadsCard() {
		return (
			<div className="squads-contents">
				{
					this.model.allSquads.map((squad: ISquadConfig, idx: number) => (
						<SquadCard key={idx} squadID={squad.squadID} />
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
							<div>Auction starts at {auctionInfo.startTime}</div>
							<div>Auction ends at {auctionInfo.endTime}</div>
							<div>Auction Entries freeze at {auctionInfo.entryFreeze}</div>
							<div>Prices start at {auctionInfo.priceStart}{auctionInfo.currency}</div>
							<div>Prices drop by {auctionInfo.priceDrop}{auctionInfo.currency} every {auctionInfo.dropInterval} minutes</div>
							<button type="button" onClick={() => this.model.getState()}>Refresh</button>
						</div>
						<div className="squad-info-wrapper">
							<div className="details-title">Your Squad Info</div>
							<SquadCard squadID={mySquad.squadID} />
							<div>{JSON.stringify(mySquad.filters)}</div>
						</div>
					</div>
				</div>
			</div>;
		} else return null;
	}

}