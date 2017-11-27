import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { partierLogin } from "modules/DroverClient";
import * as React from "react";
import { NavLink, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import Footer from "shared/Footer";
import Header from "shared/Header";
import Profile from "./profile";
import Squad from "./squad";
import Stripe from "./redirects/StripeAccount";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

@observer
export default class PartierHome extends React.Component<RouteComponentProps<{}>, {}> {
  @observable public loggedIn: boolean = false;
  public async login() {
    try {
      await partierLogin();
      runInAction(() => this.loggedIn = true);
    } catch (e) {
      runInAction(() => this.loggedIn = false);
    }
  }
  public componentWillMount() {
    if (!this.loggedIn) {
      this.login();
    }
  }
  public render() {
    return (
      <div className="partier-wrapper">
        <Header>
          <NavLink to="/partier/profile" activeClassName="active">Profile</NavLink>
          <NavLink to="/partier/squads" activeClassName="active">Squads</NavLink>
        </Header>
        {this.loggedIn ?
          <Switch>
            <Route exact path="/partier" render={() => <Redirect to="/partier/profile" />} />
            <Route path="/partier/profile" component={Profile} />
            <Route path="/partier/squad" component={Squad} />
            <Route path="/partier/stripe" component={Stripe} />
            <Route component={NoMatch} />
          </Switch>
          : <span>Logging In...</span>
        }
        <Footer />
      </div>);
  }
}
