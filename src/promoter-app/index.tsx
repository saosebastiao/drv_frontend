import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import { promoterLogin } from "modules/DroverClient";
import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
import Footer from "shared/Footer";
import Header from "shared/Header";
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
      <div className="app">
        <Header>
          <NavTab to="/promoter/profile">Profile</NavTab>
          <NavTab to="/promoter/venues">Venues</NavTab>
          <NavTab to="/promoter/parties">Parties</NavTab>
        </Header>
        <div>
          {this.loggedIn ?
            <Switch>
              <Route exact path="/promoter" render={() => <Redirect to="/promoter/profile" />} />
              <Route path="/promoter/profile" component={Profile} />
              <Route path="/promoter/venues" component={Venues} />
              <Route path="/promoter/parties" component={Parties} />
              <Route component={NoMatch} />
            </Switch>
            : <span>Logging In...</span>
          }
        </div>
        <Footer />
      </div>
    );
  }
}
