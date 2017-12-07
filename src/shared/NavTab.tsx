import * as React from "react";
import { Route, Link } from "react-router-dom";

interface PNavTab {
  to: string;
  exact?: boolean;
  className?: string;
}
export default class NavTab extends React.Component<PNavTab>{
  private rest: Array<any> = [];
  constructor(props: PNavTab, ...rest: Array<any>) {
    super(props);
    this.rest = rest;
  }
  public render() {
    const to = this.props.to;
    const rest = this.rest || [];
    return (
      <Route path={to} children={({ match }) => {
        return (
          <li className={match ? "is-active" : ""}>
            <Link to={to} {...rest} className="navbar-item">
              {this.props.children}
            </Link>
          </li >
        );
      }} />
    );
  }
}
