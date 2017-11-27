import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import ShowProfile from "./default";
import EditProfile from "./edit";
import EditFilters from "./filters";
import EditFriends from "./friends";
import EditPhotos from "./photos";
import EditSocial from "./social";
import ProfileModel from "./Model";

@observer
export default class Profile extends React.Component<{}> {

  private model = new ProfileModel;
  public render() {
    return (
      <div>
        <nav>
          <NavLink to="/partier/profile" activeClassName="active">View Profile</NavLink>
          <NavLink to="/partier/profile/edit" activeClassName="active">Edit Profile</NavLink>
          <NavLink to="/partier/profile/photos" activeClassName="active">Photos</NavLink>
          <NavLink to="/partier/profile/filters" activeClassName="active">Filters</NavLink>
          <NavLink to="/partier/profile/friends" activeClassName="active">Friends</NavLink>
          <NavLink to="/partier/profile/social" activeClassName="active">Social Media</NavLink>
        </nav>
        <Switch>
          <Route exact path="/partier/profile" render={(p) => <ShowProfile model={this.model} {...p} />} />} />
          <Route exact path="/partier/profile/edit" render={(p) => <EditProfile model={this.model} {...p} />} />} />
          <Route exact path="/partier/profile/photos" render={(p) => <EditPhotos model={this.model} {...p} />} />} />
          <Route exact path="/partier/profile/filters" render={(p) => <EditFilters model={this.model} {...p} />} />} />
          <Route exact path="/partier/profile/friends" render={(p) => <EditFriends model={this.model} {...p} />} />} />
          <Route exact path="/partier/profile/social" render={(p) => <EditSocial model={this.model} {...p} />} />} />
      </Switch>
      </div>
    );
  }
}
