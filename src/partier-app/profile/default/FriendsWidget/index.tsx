import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getMyFriends } from "modules/DroverClient";
import Potential from "./Potential";
import Accepted from "./Accepted";
import Invited from "./Invited";
import Invitations from "./Invitations";
import Rejected from "./Rejected";
import '../styles.scss';

class FriendsModel {
	@computed get isReady() {
		return this.friends != null;
	}
	@observable friends: IPartierFriends;
	@computed get rejected() {
		return this.friends && this.friends.rejected || [];
	}
	@computed get invited() {
		return this.friends && this.friends.invited || [];
	}
	@computed get invitations() {
		return this.friends && this.friends.invitations || [];
	}
	@computed get accepted() {
		return this.friends && this.friends.accepted || [];
	}
	@computed get potential() {
		return this.friends && this.friends.potential || [];
	}
	refresh = async () => {
		let friends = await getMyFriends();
		runInAction(() => {
			this.friends = friends;
		})
	}
	constructor() {
		this.refresh();
	}
}

@observer
export default class FriendsWidget extends React.Component<{}, {}> {
	model = new FriendsModel;

	render() {
		return <div className="profile-wrapper">
			<div className="friend-list">
				<div><span>Potential Friends</span></div>
				<ul className="list-group">
					{this.model.potential.map(x => {
						return <Potential key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
				<div><span>Invited Friends</span></div>
				<ul className="list-group">
					{this.model.invited.map(x => {
						return <Invited key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
				<div><span>Invitations from Friends</span></div>
				<ul className="list-group">
					{this.model.invitations.map(x => {
						return <Invitations key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
				<div><span>Accepted Friends</span></div>
				<ul className="list-group">
					{this.model.accepted.map(x => {
						return <Accepted key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
				<div><span>Rejected Friends</span></div>
				<ul className="list-group">
					{this.model.rejected.map(x => {
						return <Rejected key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
			</div>
		</div>;
	}
}