import * as React from "react";
import { Route, Link } from "react-router-dom";
import * as classnames from "classnames";

interface PNavTab {
  to: string;
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
    const c = (match: any) => {
      return classnames({
        "navbar-item": true,
        "is-active": (match != null)
      });
    };
    return (
      <Route path={to} children={({ match }) => (
        <li className={c(match)}>
          <Link to={to} {...rest}>
            {this.props.children}
          </Link>
        </li>
      )} />
    );
  }
}
