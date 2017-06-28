import * as React from 'react';
import { render } from 'react-dom';
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router-dom';
import Profile from "./profile";
import Squad from "./squad";
import Auction from "./auction";
import Header from "shared/Header";
import Footer from "shared/Footer";
import NavLink from "shared/NavLink";
//import { partierLogin } from "modules/DroverClient";

import DevTool from "mobx-react-devtools";

import "./styles.scss";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

@observer
export default class PartierHome extends React.Component<RouteComponentProps<{}>, {}> {
	@observable loggedIn: boolean = false;
	async login() {
		try {
			//let x = await partierLogin()
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
				<NavLink route="/partier/profile" label="Profile" />
				<NavLink route="/partier/squad" label="Squads" />
				<NavLink route="/partier/auction" label="Auction" />
			</Header>
			{this.loggedIn ?
				<Switch>
					<Route exact path="/partier" render={(m) => <Redirect to="/partier/profile" />} />
					<Route path="/partier/profile" component={Profile} />
					<Route path="/partier/squad" component={Squad} />
					<Route path="/partier/auction" component={Auction} />
					<Route component={NoMatch} />
				</Switch>
				: <span>Logging In...</span>
			}
			<Footer />
		</div>
	}
};