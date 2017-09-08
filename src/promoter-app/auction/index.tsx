import * as React from "react";
import { Route, Switch, RouteComponentProps, Link } from 'react-router-dom';
import AuctionList from "./default";
import PartyID from "./$partyID";
import './styles.scss';


export default class Auction extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <div className="auction-wrapper">
			<Switch>
				<Route exact path="/promoter/auction" component={AuctionList} />
				<Route path="/promoter/auction/:partyID" component={PartyID} />
			</Switch>
		</div>;
	}

}