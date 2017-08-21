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

	renderSquadInfo() {
		return (
			<div className="info-wrapper">
				<div className="info-title">Squad Information</div>
				<div className="info-row">
					<div className="info-label">Squad Name</div>
					<div className="info-value">{this.model.squadName}</div>
				</div>
				<div className="info-row">
					<div className="info-label">City</div>
					<div className="info-value">{this.model.regionID}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Party Night</div>
					<div className="info-value">{this.model.partyNight}</div>
				</div>
				<div className="info-row">
					<div className="info-label">Auction</div>
					<div className="info-value">{this.model.auctionID}</div>
				</div>
			</div>
		);
	}
	/*
		renderSquadPref() {
			return (
				<div className="info-wrapper">
					<div className="info-title">Preferences</div>
					<div className="info-row">
						<div className="info-label">Music Type</div>
						<div className="info-value">{this.model..music_type}</div>
					</div>
					<div className="info-row">
						<div className="info-label">Venue Type</div>
						<div className="info-value">{this.curItem.squad.venue_type}</div>
					</div>
					<div className="info-row">
						<div className="info-label">Neighborhood</div>
						<div className="info-value">{this.curItem.squad.neighbor}</div>
					</div>
				</div>
			);
		}

		*/
	render() {
		return this.model.isReady ? (
			<div className="squad-wrapper">
				<div className="squad-details-contents">
					<div className="squad-details-row">
						<div className="details-col">
							{this.renderSquadInfo()}
							{/*this.renderSquadPref()*/}
						</div>
						<div className="details-col has-border">
							<div className="member-wrapper">
								{this.model.myself && this.model.myself.invited && !this.model.myself.accepted ? (
									<MemberCard userID={this.model.myself.userID}
										accept={() => this.model.acceptInvite()}
										reject={() => this.model.rejectInvite()}
									/>)
									: null}
								{this.model.accepted.length > 0 ? <div>Accepted</div> : null}
								{this.model.accepted.map(x => {
									return <MemberCard key={x} userID={x}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.rejected.length > 0 ? <div>Rejected</div> : null}
								{this.model.rejected.map(x => {
									return <MemberCard key={x} userID={x}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.invited.length > 0 ? <div>Invited</div> : null}
								{this.model.invited.map(x => {
									return <MemberCard key={x} userID={x}
										uninvite={() => this.model.uninviteUser(x)}
									/>
								})}
								{this.model.potential.length > 0 ? <div>Potential Invites</div> : null}
								{this.model.potential.map(x => {
									return <MemberCard key={x} userID={x}
										invite={() => this.model.inviteUser(x)}
									/>
								})}
							</div>
						</div>
					</div>
				</div>
			</div>) : null;
	}

}