import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend } from "modules/DroverClient";


interface PRejected {
	friendID: string;
	refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Rejected extends React.Component<PRejected, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	public async unblock() {
		try {
			let x = await linkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}

	constructor(props: PRejected) {
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
				<button className="btn btn-xs btn-primary" onClick={this.unblock.bind(this)}>Unblock Friend</button>
			</li>;
		} else return null;
	}
}
