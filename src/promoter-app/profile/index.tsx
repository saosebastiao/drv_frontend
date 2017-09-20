import { observer } from "mobx-react";
import * as React from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowProfile from "./default";
import EditProfile from "./edit";

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/promoter/profile" component={ShowProfile} />
        <Route path="/promoter/profile/edit" component={EditProfile} />
      </Switch>
    );
  }
}
