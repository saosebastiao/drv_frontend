import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { partierLogin } from "modules/DroverClient";
import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import Footer from "shared/Footer";
import Header from "shared/Header";
import NavLink from "shared/NavLink";
import Auction from "./auction";
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
          <NavLink route="/partier/profile" label="Profile" />
          <NavLink route="/partier/squad" label="Squads" />
          <NavLink route="/partier/auction" label="Auction" />
        </Header>
        {this.loggedIn ?
          <Switch>
            <Route exact path="/partier" render={() => <Redirect to="/partier/profile" />} />
            <Route path="/partier/profile" component={Profile} />
            <Route path="/partier/squad" component={Squad} />
            <Route path="/partier/auction" component={Auction} />
            <Route path="/partier/stripe" component={Stripe} />
            <Route component={NoMatch} />
          </Switch>
          : <span>Logging In...</span>
        }
        <Footer />
      </div>);
  }
}
