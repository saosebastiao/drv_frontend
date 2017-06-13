import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import Login from "./login";
import Profile from "./profile";
import Squad from "./squad";
import Auction from "./auction";
import Header from "shared/Header";
import Footer from "shared/Footer";
import NavLink from "shared/NavLink";

import DevTool from "mobx-react-devtools";

import "./styles.scss";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

export default class PartierHome extends React.Component<RouteComponentProps<{}>, {}> {
	render() {
		return (
			<div>
				<Header>
					<NavLink route="/partier/profile" label="Profile" />
					<NavLink route="/partier/squad" label="Squads" />
					<NavLink route="/partier/auction" label="Auction" />
				</Header>
				<Switch>
					<Route exact path="/partier" component={Login} />
					<Route path="/partier/profile" component={Profile} />
					<Route path="/partier/squad" component={Squad} />
					<Route path="/partier/auction" component={Auction} />
					<Route component={NoMatch} />
				</Switch>
				<Footer />
			</div>
		);
	}
};