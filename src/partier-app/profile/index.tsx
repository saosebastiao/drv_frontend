import * as React from "react";
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { observer } from "mobx-react";
import ShowProfile from "./profile-show";
import EditProfile from "./profile-edit";
import './styles.scss';

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {
	render() {
		return <Switch>
			<Route path="/partier/profile/edit" component={EditProfile} />
			<Route component={ShowProfile} />
		</Switch>;
	}
}
