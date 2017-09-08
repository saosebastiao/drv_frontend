import * as React from "react";
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import EditProfile from "./edit";
import ShowProfile from "./default";
import './styles.scss';



@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <Switch>
			<Route exact path="/promoter/profile" component={ShowProfile} />
			<Route path="/promoter/profile/edit" component={EditProfile} />
		</Switch>;
	}
}
