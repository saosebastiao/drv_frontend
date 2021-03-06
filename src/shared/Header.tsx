import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink"
import './styles.scss';
import { logout } from "modules/DroverClient";


export default class Header extends React.Component<{}, {}> {

	render() {
		return <nav className="header-wrapper">
			<Link to={`/`}><div className="logo"></div></Link>
			<div className="nav-wrapper">
				<ul className="nav nav-tabs">
					{this.props.children}
				</ul>
			</div>
			<div className="logout-button">
				<Link to={`/`}>
					<button
						className="btn btn-default logout-button"
						onClick={() => logout()}>
						Logout
					</button>
				</Link>
			</div>
		</nav>;
	}

}