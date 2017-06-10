import * as React from "react";
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import ProfileModel from "./ProfileModel";
import ShowProfile from "./profile-show";
import EditProfile from "./profile-edit";
import './styles.scss';

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {
	profile = new ProfileModel;
	render() {
		return <Switch>
			<Route path="/partier/profile/edit" render={(props) => <EditProfile profile={this.profile}/>} />
			<Route render={(props) => <ShowProfile profile={this.profile}/>} />
		</Switch>;
	}
}
