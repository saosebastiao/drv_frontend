import * as React from "react";
import { observer } from "mobx-react";
import { Link, matchPath, RouteComponentProps } from "react-router-dom";
import NavLink from "./NavLink"
import './styles.scss';


export default class Header extends React.Component<{}, {}> {

	render() {
		return <nav className="header-wrapper">
			<Link to={`/`}><div className="logo"></div></Link>
			<div className="nav-wrapper">
				<ul className="nav nav-tabs">
					{this.props.children}
				</ul>
			</div>
			<div className="welcome-text">
				<div className="vertical-center-wrapper">
					<div className="vertical-center-contents">
						Welcome, Daniel!
					</div>
				</div>
			</div>
			<Link to={`/`}><button className="btn btn-default logout-button">Logout</button></Link>
		</nav>;
	}

}