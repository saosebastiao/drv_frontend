import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import ProfileModel from "./Model";
import './styles.scss';


export interface IProfileModel {
	profile: ProfileModel;
}

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {
	profile = new ProfileModel;

	constructor(props: any) {
		super(props);
	}

	render() {
		return <div className="profile-wrapper">
			<Link to={'/promoter/profile/edit'}>
				<div className="profile-contents">
					<div className="profile-top-contents">
						<div className="profile-list">
							{this.profile.name}<br />
							{this.profile.email}<br />
						</div>
					</div>
				</div>
			</Link>
		</div>;
	}
}
