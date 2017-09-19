import * as React from "react";
import { Route, Switch, RouteComponentProps, Link } from 'react-router-dom';
import PartyList from "./default";
import ViewParty from "./$partyID";
import EditParty from "./$partyID/edit";
import CreateParty from "./create";



export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <div className="squad-wrapper">
			<Switch>
				<Route exact path="/promoter/parties" component={PartyList} />
				<Route path="/promoter/parties/create/:partyNight" component={CreateParty} />
				<Route path="/promoter/parties/:partyID/edit" component={EditParty} />
				<Route path="/promoter/parties/:partyID" component={ViewParty} />
			</Switch>
		</div>;
	}

}
