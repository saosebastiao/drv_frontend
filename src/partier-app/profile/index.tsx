import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NavTab from "shared/NavTab";
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
        <nav className="navbar" role="navigation" aria-label="partier navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="tabs is-boxed">
                <ul>
                  <NavTab exact to="/partier/profile">View Profile</NavTab>
                  <NavTab to="/partier/profile/edit">Edit Profile</NavTab>
                  <NavTab to="/partier/profile/photos">Photos</NavTab>
                  <NavTab to="/partier/profile/filters">Filters</NavTab>
                  <NavTab to="/partier/profile/friends">Friends</NavTab>
                  <NavTab to="/partier/profile/social">Social Media</NavTab>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <Switch>
            <Route exact path="/partier/profile" render={(p) =>
              <ShowProfile model={this.model} {...p} />} />} />
            <Route exact path="/partier/profile/edit" render={(p) =>
              <EditProfile model={this.model} {...p} />} />} />
            <Route exact path="/partier/profile/photos" render={(p) =>
              <EditPhotos model={this.model} {...p} />} />} />
            <Route exact path="/partier/profile/filters" render={(p) =>
              <EditFilters model={this.model} {...p} />} />} />
            <Route exact path="/partier/profile/friends" render={(p) =>
              <EditFriends model={this.model} {...p} />} />} />
            <Route exact path="/partier/profile/social" render={(p) =>
              <EditSocial model={this.model} {...p} />} />} />
          </Switch>
        </section>
      </div>
    );
  }
}
