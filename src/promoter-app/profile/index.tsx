import { observer } from "mobx-react";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ShowProfile from "./default";
import EditProfile from "./edit";
import EditPayment from "./payment";

@observer
export default class Profile extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/promoter/profile" component={ShowProfile} />
        <Route path="/promoter/profile/edit" component={EditProfile} />
        <Route path="/promoter/profile/payment" component={EditPayment} />
      </Switch>
    );
  }
}
