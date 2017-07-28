import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getMyFriends } from "modules/DroverClient";
import PotentialFriends from "./Potential";
//import AcceptedFriends from "./Accepted";
//import PendingFriends from "./Pending";
import '../styles.scss';

class FriendsModel {
	@computed get isReady() {
		return this.friends != null;
	}
	@observable friends: IPartierFriends;
	@computed get pendingFriends() {
		return this.friends && this.friends.pending || [];
	}
	@computed get acceptedFriends() {
		return this.friends && this.friends.accepted || [];
	}
	@computed get potentialFriends() {
		return this.friends && this.friends.potential || [];
	}
	async refresh() {
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
					{this.model.potentialFriends.map(x => {
						return <PotentialFriends key={x} friendID={x} refresh={this.model.refresh.bind(this)} />
					})}
				</ul>
				<div><span>Pending Friends</span></div>
				<ul className="list-group">
					{this.model.pendingFriends.map(x => {
						//return <PendingFriends key={x} friendID={x} />
					})}
				</ul>
				<div><span>Accepted Friends</span></div>
				<ul className="list-group">
					{this.model.acceptedFriends.map(x => {
						//return <AcceptedFriends key={x} friendID={x} />
					})}
				</ul>
			</div>
		</div>;
	}
}