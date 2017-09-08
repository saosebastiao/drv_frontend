import * as React from "react";
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import ProfileModel from "./Model";
import FriendsWidget from "./FriendsWidget"
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
			<div className="profile-contents">
				<div className="profile-top-contents">
					<div className="photo-container">
						<Link to={`/partier/profile/edit`}>
							<div className="main-photo"
								style={this.profile.profilePhoto} />
						</Link>
						<div className="other-photos-container">
							<div className="other-photos-row" key="other_photos_row_1">
								{
									_.range(4).map((col_index: number) => {
										return <div className="other-photos-col"
											style={this.profile.otherPhotos[col_index]}
											key={`other_photos_col_${col_index}`} />
									})
								}
							</div>
						</div>
					</div>
					<div className="profile-list">
						{this.profile.name}<br />
						{this.profile.defaultRegion}<br />
						{this.profile.gender}<br />
					</div>
				</div>
				<br />
				<FriendsWidget />
			</div>
		</div>;
	}
}
