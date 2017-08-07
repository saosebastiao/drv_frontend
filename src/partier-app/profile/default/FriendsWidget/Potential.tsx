import * as React from "react";
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend } from "modules/DroverClient";
import '../styles.scss';


interface PPotential {
	friendID: string;
	refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Potential extends React.Component<PPotential, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	async invite() {
		try {
			let x = await linkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}

	constructor(props: PPotential) {
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