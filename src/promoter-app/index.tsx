import * as React from 'react';
import { render } from 'react-dom';
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router-dom';
import Profile from "./profile";
import Parties from "./parties";
import Venues from "./venues";
import Auction from "./auction";
import Header from "shared/Header";
import Footer from "shared/Footer";
import NavLink from "shared/NavLink";
import { promoterLogin } from "modules/DroverClient";

import DevTool from "mobx-react-devtools";

import "./styles.scss";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

@observer
export default class PromoterHome extends React.Component<RouteComponentProps<{}>, {}> {
	@observable loggedIn: boolean = false;
	async login() {
		try {
			let x = await promoterLogin()
			runInAction(() => this.loggedIn = true);
		} catch (e) {
			runInAction(() => this.loggedIn = false);
		}
	}
	componentWillMount() {
		if (!this.loggedIn) {
			this.login();
		}
	}
	render() {
		return <div className="partier-wrapper">
			<Header>
				<NavLink route="/promoter/profile" label="Profile" />
				<NavLink route="/promoter/venues" label="Venues" />
				<NavLink route="/promoter/parties" label="Parties" />
				<NavLink route="/promoter/auction" label="Auctions" />
			</Header>
			{this.loggedIn ?
				<Switch>
					<Route exact path="/promoter" render={(m) => <Redirect to="/promoter/profile" />} />
					<Route path="/promoter/profile" component={Profile} />
					<Route path="/promoter/venues" component={Venues} />
					<Route path="/promoter/parties" component={Parties} />
					<Route path="/promoter/auction" component={Auction} />
					<Route component={NoMatch} />
				</Switch>
				: <span>Logging In...</span>
			}
			<Footer />
		</div>
	}
};