import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
import ProfileModel from "./Model";
import ShowProfile from "./default";
import EditProfile from "./edit";
import EditPayment from "./payment";

const NotImplemented = () => <div>Not Implemented</div>;

@observer
export default class Profile extends React.Component<{}> {
  private model = new ProfileModel;

  public render() {
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="partier navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="tabs is-boxed">
                <ul>
                  <NavTab exact to={`/promoter/profile`} >View Profile</NavTab>
                  <NavTab to={`/promoter/profile/edit`}>Edit Profile</NavTab>
                  <NavTab to={`/promoter/profile/payment`} >Edit Payment Methods</NavTab>
                  <NavTab to={`/promoter/profile/filters`} >Edit Filters</NavTab>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="box">
          <Switch>
            <Route exact path="/promoter/profile" render={(p) => <ShowProfile model={this.model} {...p} />} />
            <Route exact path="/promoter/profile/edit" render={(p) => <EditProfile model={this.model} {...p} />} />
            <Route exact path="/promoter/profile/payment" render={(p) => <EditPayment model={this.model} {...p} />} />
            <Route exact path="/promoter/profile/filters" render={() => <NotImplemented />} />
          </Switch>
        </div>
      </div>
    );
  }
}
