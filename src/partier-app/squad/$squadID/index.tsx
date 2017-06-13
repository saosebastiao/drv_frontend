import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";

@observer
export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

	private id: number = 2;
	private curItem: any = null;
	private list = [
		{
			id: 1,
			date: new Date('2017-05-24')
		},
		{
			id: 2,
			date: new Date('2017-05-25'),
			squad: {
				name: 'Daniel Toone',
				city: 'Washington',
				party_night: 'Today',
				music_type: 'Jazz',
				venue_type: 'Live',
				neighbor: 'Jack',
				members: [
					{
						name: 'David',
						home: 'New York',
						gender: 'Male',
						accepted: true
					},
					{
						name: 'Felicia',
						home: 'Washington',
						gender: 'Female',
						accepted: false
					}
				]
			}
		},
		{
			id: 3,
			date: new Date('2017-05-26')
		},
	];


	renderSquadInfo() {
		this.curItem = this.list.find((data: any) => data.id === this.id);
		if (this.curItem) {
			return (
				<div className="info-wrapper">
					<div className="info-title">Squad Information</div>
					<div className="info-row">
						<div className="info-label">Suqad Name</div>
						<div className="info-value">{this.curItem.squad.name}</div>
					</div>
					<div className="info-row">
						<div className="info-label">City</div>
						<div className="info-value">{this.curItem.squad.city}</div>
					</div>
					<div className="info-row">
						<div className="info-label">Party Night</div>
						<div className="info-value">{this.curItem.squad.party_night}</div>
					</div>
				</div>
			);
		}
		else
			return null;
	}

	renderSquadPref() {
		if (this.curItem) {
			return (
				<div className="info-wrapper">
					<div className="info-title">Preferences</div>
					<div className="info-row">
						<div className="info-label">Music Type</div>
						<div className="info-value">{this.curItem.squad.music_type}</div>
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
		else
			return null;
	}

	renderMemberCards() {
		if (this.curItem && this.curItem.squad.members) {
			return (
				<div className="member-wrapper">
					{
						this.curItem.squad.members.map((item: any) => {
							return (
								<div className="member-card" key={`member_card_${item.name}_${item.home}`}>
									<div className="card-photo"></div>
									<div className="card-info">
										<h5>{item.name}</h5>
										<h5>{item.home}</h5>
										<h5>{item.gender}</h5>
										<div className="checkbox">
											<label>
												{
													item.accepted ? (
														<input type="checkbox" disabled checked />
													) : (
															<input type="checkbox" disabled />
														)
												}
												Accepted squad
								    </label>
										</div>
									</div>
								</div>
							);
						})
					}
				</div>
			);
		}
		else
			return null;
	}

	render() {
		return <div className="squad-wrapper">
			<div className="squad-details-contents">
				<div className="squad-details-row">
					<div className="details-col">
						{this.renderSquadInfo()}
						{this.renderSquadPref()}
					</div>
					<div className="details-col has-border">
						{this.renderMemberCards()}
					</div>
				</div>
			</div>
		</div>;
	}

}