import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowProfile from "./default";
import EditProfile from "./edit";

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/partier/profile" component={ShowProfile} />
        <Route path="/partier/profile/edit" component={EditProfile} />
      </Switch>
    );
  }
}
