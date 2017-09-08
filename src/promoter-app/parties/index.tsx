import * as React from "react";
import { Route, Switch, RouteComponentProps, Link } from 'react-router-dom';
import SquadList from "./default";
import SquadID from "./$squadID";
import CreateSquad from "./create";
import ViewInvites from "./invites";



import './styles.scss';

export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <div className="squad-wrapper">
			<Switch>
				<Route exact path="/partier/squad" component={SquadList} />
				<Route path="/partier/squad/create/:partyNight" component={CreateSquad} />
				<Route path="/partier/squad/invites/:partyNight" component={ViewInvites} />
				<Route path="/partier/squad/:squadID" component={SquadID} />
			</Switch>
		</div>;
	}

}