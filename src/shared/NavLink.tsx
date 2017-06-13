import * as React from "react";
import { Link, matchPath, RouteComponentProps } from "react-router-dom";
interface RouteName {
	route: string;
	label: string
}
export default class NavLink extends React.Component<RouteName, {}>{
	render() {
		const curPath = window.location.pathname;
		const isActive = matchPath(curPath, { path: this.props.route });
		return <li role="presentation" className={isActive ? "active" : ""}>
			<Link to={this.props.route}>{this.props.label}</Link>
		</li>;
	}
}