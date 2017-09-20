import { logout } from "modules/DroverClient";
import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component<{}, {}> {

  public render() {
    return (
      <nav className="header-wrapper">
        <Link to={`/`}><div className="logo" /></Link>
        <div className="nav-wrapper">
          <ul className="nav nav-tabs">
            {this.props.children}
          </ul>
        </div>
        <div className="logout-button">
          <Link to={`/`}>
            <button
              className="btn btn-default logout-button"
              onClick={() => logout()}
            >
              Logout
            </button>
          </Link>
        </div>
      </nav>
    );
  }

}
