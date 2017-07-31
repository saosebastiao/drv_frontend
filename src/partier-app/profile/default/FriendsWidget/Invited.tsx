import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend } from "modules/DroverClient";
import '../styles.scss';


interface PInvited {
	friendID: string;
	refresh: () => void;
}

@observer
export default class Invited extends React.Component<PInvited, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	async invite() {
		try {
			let x = await linkFriend(this.props.friendID);
		} catch (e) {
			console.log(e);
		}
		this.props.refresh();
	}

	constructor(props: PInvited) {
		super(props);
		getPartierProfile(this.props.friendID)
			.then(x => {
				runInAction(() => {
					Object.assign(this, x);
				})
			}).catch(e => console.log(e));
	}

	render() {
		if (this.isReady) {
			return <li className="list-group-item">
				<span>{this.name}   </span>
				<button className="btn btn-xs btn-primary" onClick={this.invite.bind(this)}>Invite Friend</button>
			</li>;
		} else return null;
	}
}