import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import './styles.scss';

const menus = [
	{
		linkTo: '/partier/profile',
		title: 'Profile'
	},
	{
		linkTo: '/partier/squad',
		title: 'Squads'
	},
	{
		linkTo: '/partier/auction',
		title: 'Auctions'
	}
]

@observer
export default class Header extends React.Component<{}, {}> {

	renderNavs() {
  	let pathname:string = (this.props as any)["pathname"];

		return (
			<ul className="nav nav-tabs">
			{
				menus.map((item: any) => (
					<li key={`header_${item.title}`} role="presentation" className={pathname.indexOf(item.linkTo) >= 0 ? "active" : ""}>
						<Link to={item.linkTo}>{item.title}</Link>
					</li>
				))
			}
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