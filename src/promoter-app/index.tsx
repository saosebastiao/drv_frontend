import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { promoterLogin } from "modules/DroverClient";
import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import Footer from "shared/Footer";
import Header from "shared/Header";
import NavLink from "shared/NavLink";
import Auction from "./auction";
import Parties from "./parties";
import Profile from "./profile";
import Venues from "./venues";

const NoMatch = () => <p>404 Page Does Not Exist</p>;

@observer
export default class PromoterHome extends React.Component<RouteComponentProps<{}>, {}> {
  @observable public loggedIn: boolean = false;
  public async login() {
    try {
      await promoterLogin();
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
          <NavLink route="/promoter/profile" label="Profile" />
          <NavLink route="/promoter/venues" label="Venues" />
          <NavLink route="/promoter/parties" label="Parties" />
          <NavLink route="/promoter/auction" label="Auctions" />
        </Header>
        {this.loggedIn ?
          <Switch>
            <Route exact path="/promoter" render={() => <Redirect to="/promoter/profile" />} />
            <Route path="/promoter/profile" component={Profile} />
            <Route path="/promoter/venues" component={Venues} />
            <Route path="/promoter/parties" component={Parties} />
            <Route path="/promoter/auction" component={Auction} />
            <Route component={NoMatch} />
          </Switch>
          : <span>Logging In...</span>
        }
        <Footer />
      </div>
    );
  }
}
