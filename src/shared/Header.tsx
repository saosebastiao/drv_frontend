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
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="./images/logo/png/color_logo_transparent@2x.png" />
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
            <div className="navbar-item">
              <button
                className="button is-outlined"
                onClick={this.logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav >
    );
  }

}
