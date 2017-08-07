import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observable, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import { getPartierProfile, unlinkFriend } from "modules/DroverClient";
import '../styles.scss';


interface PAccepted {
	friendID: string;
	refresh: (friends?: IPartierFriends) => void;
}

@observer
export default class Accepted extends React.Component<PAccepted, {}>{
	@observable name: string;
	@observable gender: string;
	@observable photos: Array<string>;
	@computed get isReady() {
		return this.name != null;
	}
	async block() {
		try {
			let x = await unlinkFriend(this.props.friendID);
			this.props.refresh(x);
		} catch (e) {
			console.log(e);
		}
	}

	constructor(props: PAccepted) {
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
				<button className="btn btn-xs btn-danger" onClick={this.block.bind(this)}>Block Friend</button>
			</li>;
		} else return null;
	}
}