import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowProfile from "./default";
import EditProfile from "./edit";
import EditFilters from "./filters";
import EditFriends from "./friends";
import EditPhotos from "./photos";
import EditSocial from "./social";

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/partier/profile" component={ShowProfile} />
        <Route path="/partier/profile/edit" component={EditProfile} />
        <Route path="/partier/profile/filters" component={EditFilters} />
        <Route path="/partier/profile/friends" component={EditFriends} />
        <Route path="/partier/profile/photos" component={EditPhotos} />
        <Route path="/partier/profile/social" component={EditSocial} />
      </Switch>
    );
  }
}
