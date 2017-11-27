import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
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
        <nav>
          <NavLink to={`/promoter/profile`} activeClassName="active">View Profile</NavLink>
          <NavLink to={`/promoter/profile/edit`} activeClassName="active">Edit Profile</NavLink>
          <NavLink to={`/promoter/profile/payment`} activeClassName="active">Edit Payment Methods</NavLink>
          <NavLink to={`/promoter/profile/filters`} activeClassName="active">Edit Filters</NavLink>
        </nav>
        <Switch>
          <Route exact path="/promoter/profile" render={(p) => <ShowProfile model={this.model} {...p} />} />
          <Route exact path="/promoter/profile/edit" render={(p) => <EditProfile model={this.model} {...p} />} />
          <Route exact path="/promoter/profile/payment" render={(p) => <EditPayment model={this.model} {...p} />} />
          <Route exact path="/promoter/profile/filters" render={() => <NotImplemented />} />
        </Switch>
      </div>
    );
  }
}
