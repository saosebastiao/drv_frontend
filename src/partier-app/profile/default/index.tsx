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

	renderOtherPhotos() {
		return (
			<div className="other-photos-container">
				{
					_.range(2).map((row_index: number) => (
						<div className="other-photos-row" key={`other_photos_row_${row_index}`}>
							{
								_.range(5).map((col_index: number) => (
									<div
										className="other-photos-col"
										key={`other_photos_col_${col_index}`}
									>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		);
	}

	render() {
		return <div className="profile-wrapper">
			<div className="profile-contents">
				<div className="profile-top-contents">
					<div className="photo-container">
						<Link to={`/partier/profile/edit`}>
							<div className="main-photo"
								style={{ backgroundImage: `url(${this.profile.photos.slice(0)})` }} />
						</Link>
						{this.renderOtherPhotos()}
					</div>
					<div className="profile-list">
						{this.profile.name}<br />
						{this.profile.defaultRegion}<br />
						{this.profile.gender}<br />
					</div>
				</div>
				<br />
				<div className="friend-list">
					<ul className="list-group">
						<li className="list-group-item">Cras justo odio</li>
						<li className="list-group-item">Dapibus ac facilisis in</li>
						<li className="list-group-item">Morbi leo risus</li>
						<li className="list-group-item">Porta ac consectetur ac</li>
						<li className="list-group-item">Vestibulum at eros</li>
					</ul>
				</div>
			</div>
		</div>;
	}
}
