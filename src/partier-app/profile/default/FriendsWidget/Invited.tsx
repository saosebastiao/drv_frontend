import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, linkFriend } from "modules/DroverClient";


interface PInvited {
	friendID: string;
	refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Invited extends React.Component<PInvited, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	public async invite() {
		try {
			let x = await linkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}

	constructor(props: PInvited) {
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
			</li>;
		} else return null;
	}
}
