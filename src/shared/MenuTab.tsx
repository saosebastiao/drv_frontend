import * as React from "react";
import { Route, Link } from "react-router-dom";

interface PMenuTab {
  to: string;
  exact?: boolean;
  className?: string;
}
export default class MenuTab extends React.Component<PMenuTab>{
  private rest: Array<any> = [];
  constructor(props: PMenuTab, ...rest: Array<any>) {
    super(props);
    this.rest = rest;
  }
  public render() {
    const to = this.props.to;
    const rest = this.rest || [];
    return (
      <Route path={to} children={({ match }) => {
        return (
          <li>
            <Link to={to} {...rest} className={match ? "is-active" : ""} >
              {this.props.children}
            </Link>
          </li >
        );
      }} />
    );
  }
}
