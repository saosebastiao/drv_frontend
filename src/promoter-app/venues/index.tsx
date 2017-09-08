import * as React from "react";
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react";
import EditVenue from "./edit";
import VenueList from "./default";
import ShowVenue from "./$venueID";
import './styles.scss';



@observer
export default class Venues extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <Switch>
			<Route exact path="/promoter/venues" component={ShowVenue} />
			<Route path="/promoter/venues/edit/:venueID" component={EditVenue} />
			<Route path="/promoter/venues/:venueID" component={ShowVenue} />
		</Switch>;
	}
}
