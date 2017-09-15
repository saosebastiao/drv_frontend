import * as React from "react";
import { Route, Switch, RouteComponentProps, Link } from 'react-router-dom';
import AuctionList from "./default";
import AuctionID from "./$squadID";
import './styles.scss';


export default class Auction extends React.Component<RouteComponentProps<any>, {}> {

	render() {
		return <div className="auction-wrapper">
			<Switch>
				<Route exact path="/partier/auction" component={AuctionList} />
				<Route path="/partier/auction/:squadID" component={AuctionID} />
			</Switch>
		</div>;
	}

}