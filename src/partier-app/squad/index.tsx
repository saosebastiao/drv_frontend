import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import SquadID from "./$squadID";
import EditSquad from "./$squadID/edit";
import CreateSquad from "./create";
import SquadList from "./default";
import ViewInvites from "./invites";

export default class Squad extends React.Component<RouteComponentProps<any>, {}> {

  public render() {
    return (
      <div className="squad-wrapper">
        <Switch>
          <Route exact path="/partier/squad" component={SquadList} />
          <Route path="/partier/squad/create/:partyNight" component={CreateSquad} />
          <Route path="/partier/squad/invites/:partyNight" component={ViewInvites} />
          <Route path="/partier/squad/:squadID/edit" component={EditSquad} />
          <Route path="/partier/squad/:squadID" component={SquadID} />
        </Switch>
      </div>
    );
  }

}
