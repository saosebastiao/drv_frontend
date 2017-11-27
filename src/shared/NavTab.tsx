import * as React from "react";
import { Route, Link } from "react-router-dom";

interface PNavTab {
  to: string;
  rest?: Array<any>;
}
export default class ListItemLink extends React.Component<PNavTab>{
  public render() {
    const to = this.props.to;
    const rest = this.props.rest;
    return (
      <Route path={to} children={({ match }) => (
        <li className={match ? "active" : ""}>
          <Link to={to} {...rest}>
            {this.props.children}
          </Link>
        </li>
      )} />
    );
  }
}
