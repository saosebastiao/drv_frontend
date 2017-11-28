import { logout } from "modules/DroverClient";
import * as React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component<{}, {}> {

  private logout = (e: any) => {
    e.preventDefault();
    logout().then(() => {
      window.location.replace("/");
    });
  }
  public render() {
    return (
      <nav className="navbar header" role="navigation" aria-label="main navigation">
        <div className="logo">
          <Link to="/">
            <img src="./shared/logo/svg/color_logo_transparent.svg" />
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="tabs is-boxed">
              <ul>
                {this.props.children}
              </ul>
            </div>
          </div>
          <div className="navbar-end logout">
            <button
              onClick={this.logout}>
              Logout
            </button>
          </div>
        </div>
      </nav >
    );
  }

}
