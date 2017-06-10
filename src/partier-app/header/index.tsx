import * as React from "react";
import { observer } from "mobx-react";
import { Link, matchPath, RouteComponentProps } from "react-router-dom";

import './styles.scss';

interface RouteName {
	route: string;
	label: string
}
class NavLink extends React.Component<RouteName,{}>{
	render(){
		const curPath = window.location.pathname;
		const isActive = matchPath(curPath,{path:this.props.route});
		return <li role="presentation" className={ isActive ? "active" : ""}> 
			<Link to={this.props.route}>{this.props.label}</Link>
		</li>;
	}
}

export default class Header extends React.Component<{}, {}> {

	renderNavs() {
		return (
			<ul className="nav nav-tabs">
				<NavLink route="/partier/profile" label="Profile"/>
				<NavLink route="/partier/squad" label="Squads"/>
				<NavLink route="/partier/auction" label="Auction"/>
			</ul>
		)
	}

  render() {
    return <div className="header-wrapper">
    	<Link to={`/`}><div className="logo"></div></Link>
    	<div className="nav-wrapper">
    		{ this.renderNavs() }
			</div>
			<div className="welcome-text">
				<div className="vertical-center-wrapper">
					<div className="vertical-center-contents">
						Welcome to visit our site, Daniel!
					</div>
				</div>
			</div>
			<Link to={`/`}><button className="btn btn-default logout-button">Logout</button></Link>
    </div>;
  }
  
}