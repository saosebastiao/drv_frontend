import * as React from "react";
import { Route, Link } from "react-router-dom";
import * as classnames from "classnames";

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
      <Route exact path={to} children={({ match }) => {
        const c = classnames({
          "navbar-item": true,
          "is-active": match != null
        });
        return (
          <li className={c}>
            <Link to={to} {...rest} className={c} >
              {this.props.children}
            </Link>
          </li >
        );
      }} />
    );
  }
}
