import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";
import ViewSquadModel from "./Model"
import MemberCard from "./MemberCard";

@observer
export default class ViewSquad extends React.Component<RouteComponentProps<any>, {}> {

	model: ViewSquadModel;
	constructor(props: RouteComponentProps<any>) {
		super(props);
		const squadID = parseInt(props.match.params.squadID)
		this.model = new ViewSquadModel(squadID)
	}

	renderAuctionInfo() {
		return (
			<div className="info-wrapper">
				<div className="info-title">Auction Information</div>
				<div className="info-row">
					<div className="info-label">City</div>
					<div className="info-value">{this.model.auction.regionID}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Party Night</div>
					<div className="info-value">{this.model.auction.partyNight}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Auction Start Time</div>
					<div className="info-value">{this.model.auction.startTime}</div>
				</div>
				<Link to={`/partier/auction/${this.model.squadID}`}> Go To Auction Page</Link>
			</div>
		);
	}
	renderSquadPref() {
		return (
			<div className="info-wrapper">
				<div className="info-title">Squad Information</div>
				<div className="info-row">
					<div className="info-label">Name</div>
					<div className="info-value">{this.model.squadName}</div>
				</div>
				<div className="info-title">Preferences</div>
				<div className="info-row">
					<div className="info-label">Venue Type</div>
					<div className="info-value">{this.model.filters.venueType}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Music Type</div>
					<div className="info-value">{this.model.filters.musicType}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Neighborhood</div>
					<div className="info-value">{this.model.filters.neighborhood}</div>
				</div>
			</div>
		);
	}

	render() {
		return this.model.isReady ? (
			<div className="squad-wrapper">
				<div className="squad-details-contents">
					<div className="squad-details-row">
						<div className="details-col">
							{this.renderAuctionInfo()}
							{this.renderSquadPref()}
						</div>
						<div className="details-col has-border">
							<div className="member-wrapper">
								{this.model.myself && this.model.myself.invited && !this.model.myself.accepted ? (
									<MemberCard userID={this.model.myself.userID}
										isSelf
										accept={() => this.model.acceptInvite()}
										reject={() => this.model.rejectInvite()}
									/>)
									: null}
								{this.model.accepted.length > 0 ? <div>Accepted</div> : null}
								{this.model.accepted.map(x => {
									return <MemberCard key={x}
										userID={x}
										isOwned={this.model.isOwned}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.rejected.length > 0 ? <div>Rejected</div> : null}
								{this.model.rejected.map(x => {
									return <MemberCard key={x} userID={x}
										isOwned={this.model.isOwned}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.invited.length > 0 ? <div>Invited</div> : null}
								{this.model.invited.map(x => {
									return <MemberCard key={x} userID={x}
										isOwned={this.model.isOwned}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.isOwned && this.model.potential.length > 0 ?
									<div>
										<div>Potential Invites</div>
										{this.model.potential.map(x => {
											return <MemberCard key={x} userID={x}
												isOwned={this.model.isOwned}
												invite={() => this.model.inviteUser(x)}
											/>
										})}
									</div> : null
								}
							</div>
						</div>
					</div>
				</div>
			</div>) : null;
	}

}