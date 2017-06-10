import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, RouteComponentProps, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import Login from "./login";
import Profile from "./profile";
import Squad from "./squad";
import Auction from "./auction";
import Header from "./header";
import Footer from "./footer";

import DevTool from "mobx-react-devtools";


import "./styles.scss";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

export default class PartierHome extends React.Component<RouteComponentProps<{}>, {}> {
	render() {
		return (
			<div>
				<Header/>
				<Switch>
					<Route exact path="/partier" component={Login} />
					<Route path="/partier/profile" component={Profile} />
					<Route path="/partier/squad" component={Squad} />
					<Route path="/partier/auction" component={Auction} />
					<Route component={NoMatch}/>
				</Switch>
				<Footer/>
			</div>
		);
	}
};