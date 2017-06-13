import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import * as _ from 'lodash';

@observer
export default class AuctionID extends React.Component<RouteComponentProps<any>, {}> {

	private id: number = parseInt(this.props.match.params.auctionID);
	private curItem: any = null;

	renderPartiesCard() {
		return (
			<div className="parties-contents">
				{
					_.range(20).map((index: number) => (
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
					_.range(20).map((index: number) => (
						<div className="squads-card has-border" key={`auction_squads_card_${index}`}>Squad Card {(index + 1)}</div>
					))
				}
			</div>
		);
	}

	render() {
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
					</div>
					<div className="squad-info-wrapper">
						<div className="details-title">Your Squad Info</div>
					</div>
				</div>
			</div>
		</div>;
	}

}