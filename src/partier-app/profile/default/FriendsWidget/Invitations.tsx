import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend, unlinkFriend } from "modules/DroverClient";


interface PInvitations {
	friendID: string;
	refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Invitations extends React.Component<PInvitations, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	async accept() {
		try {
			let x = await linkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}
	public async reject() {
		try {
			let x = await unlinkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}

	constructor(props: PInvitations) {
		super(props);
		getPartierProfile(this.props.friendID)
			.then((x) => {
				runInAction(() => {
					Object.assign(this, x);
				})
			}).catch(e => console.log(e));
	}

	render() {
		if (this.isReady) {
			return <li className="list-group-item">
				<span>{this.name}   </span>
				<button className="btn btn-xs btn-primary" onClick={this.accept.bind(this)}>Accept Invitation</button>
				<button className="btn btn-xs btn-danger" onClick={this.reject.bind(this)}>Reject Invitation</button>
			</li>;
		} else return null;
	}
}
