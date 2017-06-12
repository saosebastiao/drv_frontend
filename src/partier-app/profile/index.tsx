import * as React from "react";
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import * as _ from 'lodash';
import EditProfile from "./edit";
import ShowProfile from "./default";
import './styles.scss';



@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

	renderOtherPhotos() {
		return (
			<div className="other-photos-container">
				{
					_.range(2).map((row_index: number) => (
						<div className="other-photos-row" key={`other_photos_row_${row_index}`}>
							{
								_.range(5).map((col_index: number) => (
									<div className="other-photos-col" key={`other_photos_col_${col_index}`}>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		);
	}

	clickPhoto() {

	}

	render() {
		return <Switch>
			<Route exact path="/partier/profile" component={ShowProfile} />
			<Route path="/partier/profile/edit" component={EditProfile} />
		</Switch>;
	}
}
