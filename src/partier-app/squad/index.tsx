import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as moment from "moment";

import './styles.scss';

@observer
export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

	private list: any = [];
	private id: number = 2;
	private curItem: any = null;

	constructor() {
		super();
		this.list = [
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
	}

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
		let path = this.props.location.pathname;
		let params = path.split('/');
		for (var i = 0; i < params.length; i++) {
			if (params[i] === 'squad') {
				if (params[i + 1] === '')
					this.id = null;
				else
					this.id = parseInt(params[i + 1]);
				break;
			}
		}

		return <div className="squad-wrapper">
			{this.id ? (
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
			) : (
					<div className="squad-contents">
						{
							this.list.map((item: any) => {
								return (
									<div className="squad-row" key={`squad_item_${item.date}`}>
										<div className="date-col">{moment(item.date).format('YYYY-MM-DD')}</div>
										{item.squad ? (
											<div className="button-col">
												<Link to={`/partier/squad/${item.id}`}><button className="btn btn-primary">View your squad</button></Link>
											</div>
										) : (
												<div className="button-col">
													<button className="btn btn-primary" data-toggle="modal" data-target="#createSquadModal">Create a squad</button>
													<button className="btn btn-primary" data-toggle="modal" data-target="#viewInviteModal">View invites</button>
												</div>
											)}
									</div>
								);
							})
						}
					</div>
				)
			}

			<div className="modal fade" id="createSquadModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalLabel">Create a squad</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
							Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
							Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
			      </div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="viewInviteModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalLabel">View invites</h4>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
							Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
							Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
			      </div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>

		</div>;
	}

}